import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

function authorized(req: NextRequest) {
  return req.headers.get("x-admin-secret") === process.env.ADMIN_SECRET;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const allSessions: Stripe.Checkout.Session[] = [];

  let hasMore = true;
  let startingAfter: string | undefined;

  while (hasMore) {
    const page = await stripe.checkout.sessions.list({
      limit: 100,
      expand: ["data.line_items", "data.payment_intent"],
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });

    allSessions.push(...page.data);
    hasMore = page.has_more;
    if (page.data.length > 0) {
      startingAfter = page.data[page.data.length - 1].id;
    } else {
      hasMore = false;
    }
  }

  const orders = allSessions
    .filter((s) => s.payment_status === "paid")
    .map((s) => {
      const pi = s.payment_intent as Stripe.PaymentIntent | null;
      const item = s.line_items?.data[0];
      return {
        id: s.id,
        paymentIntentId: typeof pi === "string" ? pi : pi?.id,
        created: s.created,
        customerName: s.customer_details?.name ?? "",
        email: s.customer_details?.email ?? "",
        product: item?.description ?? "Unknown product",
        amountTotal: s.amount_total ?? 0,
        shippingAddress: s.collected_information?.shipping_details?.address ?? s.customer_details?.address ?? null,
        shippingName: s.collected_information?.shipping_details?.name ?? s.customer_details?.name ?? "",
        shipped: (typeof pi !== "string" && pi?.metadata?.shipped) === "true",
        shippedAt: (typeof pi !== "string" && pi?.metadata?.shipped_at) || null,
        trackingNumber: (typeof pi !== "string" && pi?.metadata?.tracking_number) || null,
      };
    })
    .sort((a, b) => b.created - a.created);

  return NextResponse.json({ orders });
}
