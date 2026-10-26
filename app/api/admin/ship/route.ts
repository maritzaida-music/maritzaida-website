import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

function authorized(req: NextRequest) {
  return req.headers.get("x-admin-secret") === process.env.ADMIN_SECRET;
}

function shippingEmailHtml(opts: {
  customerName: string;
  product: string;
  trackingNumber: string | null;
  address: string;
}) {
  const tracking = opts.trackingNumber
    ? `<p style="margin:0 0 8px"><strong style="color:#c9a04a">Tracking:</strong> ${opts.trackingNumber}</p>`
    : "";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f9f5ee;font-family:Georgia,serif">
  <div style="max-width:560px;margin:40px auto;background:#0d0b09;color:#e8dcc8;padding:48px 40px;border-radius:2px">
    <p style="margin:0 0 4px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#c9a04a;font-family:Arial,sans-serif">Maritzaida</p>
    <h1 style="margin:0 0 32px;font-size:26px;font-weight:400;color:#f0e4c4">Your order is on its way.</h1>
    <div style="border-left:2px solid #c9a04a;padding-left:20px;margin-bottom:32px">
      <p style="margin:0 0 8px"><strong style="color:#c9a04a">Order:</strong> ${opts.product}</p>
      ${tracking}
      <p style="margin:0"><strong style="color:#c9a04a">Shipping to:</strong><br>${opts.address}</p>
    </div>
    <p style="margin:0 0 8px;color:#a09080;font-size:14px">Thank you for your support, ${opts.customerName.split(" ")[0]}. It means everything.</p>
    <p style="margin:0;color:#a09080;font-size:14px">— Maritzaida &amp; AJ</p>
    <hr style="border:none;border-top:1px solid #2a2520;margin:32px 0">
    <p style="margin:0;font-size:11px;color:#5a504a;font-family:Arial,sans-serif">Questions? Reply to this email or write to <a href="mailto:amador.weibe@gmail.com" style="color:#c9a04a">amador.weibe@gmail.com</a></p>
  </div>
</body>
</html>`;
}

function formatAddress(addr: Stripe.Address | null): string {
  if (!addr) return "";
  return [addr.line1, addr.line2, addr.city, addr.state, addr.postal_code, addr.country]
    .filter(Boolean)
    .join(", ");
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sessionId, trackingNumber } = await req.json();
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId required" }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "payment_intent"],
  });

  if (session.payment_status !== "paid") {
    return NextResponse.json({ error: "Session not paid" }, { status: 400 });
  }

  const pi = session.payment_intent as Stripe.PaymentIntent;
  if (!pi?.id) {
    return NextResponse.json({ error: "No payment intent found" }, { status: 400 });
  }

  if (pi.metadata?.shipped === "true") {
    return NextResponse.json({ error: "Already marked as shipped" }, { status: 409 });
  }

  // Mark shipped in Stripe metadata
  await stripe.paymentIntents.update(pi.id, {
    metadata: {
      shipped: "true",
      shipped_at: new Date().toISOString(),
      ...(trackingNumber ? { tracking_number: trackingNumber } : {}),
    },
  });

  // Send shipping email
  const email = session.customer_details?.email;
  const customerName = session.customer_details?.name ?? "friend";
  const product = session.line_items?.data[0]?.description ?? "your order";
  const address = formatAddress(
    session.shipping_details?.address ?? session.customer_details?.address ?? null
  );

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (RESEND_API_KEY && email) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Maritzaida <noreply@maritzaida.com>",
        to: [email],
        subject: "Your order has shipped — Maritzaida",
        html: shippingEmailHtml({ customerName, product, trackingNumber: trackingNumber || null, address }),
        text: [
          `Hi ${customerName.split(" ")[0]},`,
          "",
          "Your order is on its way!",
          "",
          `Order: ${product}`,
          trackingNumber ? `Tracking: ${trackingNumber}` : "",
          address ? `Shipping to: ${address}` : "",
          "",
          "Thank you for your support. It means everything.",
          "— Maritzaida & AJ",
          "",
          "Questions? Write to amador.weibe@gmail.com",
        ]
          .filter((l) => l !== undefined)
          .join("\n"),
      }),
    });

    if (!res.ok) {
      console.error("Resend error:", await res.text());
      return NextResponse.json({ error: "Email failed to send" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
