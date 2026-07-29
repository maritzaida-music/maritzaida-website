import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.maritzaida.com";

const products: Record<string, { name: string; price: number; image: string }> = {
  "boleros-vol-1": {
    name: "Boleros Clásicos Volumen I",
    price: 1500,
    image: `${BASE_URL}/albums/boleros-clasicos-vol-1.jpg`,
  },
  "boleros-vol-2": {
    name: "Boleros Clásicos Volumen II",
    price: 1500,
    image: `${BASE_URL}/albums/boleros-clasicos-vol-2.jpg`,
  },
  "alma-adentro": {
    name: "Alma Adentro: La Música de Sylvia Rexach y Tutti Umpierre",
    price: 1500,
    image: `${BASE_URL}/albums/alma-adentro-front.jpg`,
  },
  "sentimientos-en-vivo": {
    name: "Sentimientos En Vivo",
    price: 1500,
    image: `${BASE_URL}/albums/sentimientos-en-vivo-front.jpg`,
  },
  "radio-bohemia-vol-1": {
    name: "Radio Bohemia Volumen I",
    price: 1500,
    image: `${BASE_URL}/albums/radio-bohemia-vol-1.png`,
  },
};

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const { productId } = await req.json();
    const product = products[productId];

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              images: [product.image],
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 500, currency: "usd" },
            display_name: "Standard Shipping (US & Puerto Rico)",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 10 },
            },
          },
        },
      ],
      success_url: `${BASE_URL}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/store`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
