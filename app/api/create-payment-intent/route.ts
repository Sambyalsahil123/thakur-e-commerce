import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

// Helper function to calculate order amount with precision for currency
const calculateOrderAmount = (items: CartProductType[]): number => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);
  // Return the total price in dollars for internal consistency
  return totalPrice;
};
export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    // Validate items and payment_intent_id exist and are correctly formatted
    if (!body.items || !Array.isArray(body.items)) {
      return NextResponse.json(
        { error: "Invalid items array" },
        { status: 400 }
      );
    }

    const { items, payment_intent_id } = body;
    const totalInDollars = calculateOrderAmount(items);
    const totalInCents = Math.round(totalInDollars * 100);
    // Initialize orderData outside of conditions to ensure it's available for both branches
    let orderData = {
      user: { connect: { id: currentUser.id } },
      amount: totalInDollars,
      currency: "usd",
      status: "pending",
      deliveryStatus: "pending",
      paymentIntentId: payment_intent_id,
      products: items,
    };

    if (payment_intent_id) {
      // Retrieve and update the payment intent
      const current_intent = await stripe.paymentIntents.retrieve(
        payment_intent_id
      );
      if (!current_intent) {
        return NextResponse.json(
          { error: "Invalid Payment Intent" },
          { status: 400 }
        );
      }

      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: totalInCents,
        }
      );

      // Check if the order exists and update it
      const existing_order = await prisma.order.findFirst({
        where: { paymentIntentId: payment_intent_id },
      });
      if (!existing_order) {
        return NextResponse.json(
          { error: "Order does not exist for given Payment Intent" },
          { status: 404 }
        );
      }

      await prisma.order.update({
        where: { paymentIntentId: payment_intent_id },
        data: orderData,
      });

      return NextResponse.json({ paymentIntent: updated_intent });
    } else {
      // Create a new payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalInCents,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });

      // Update orderData with new paymentIntentId
      orderData.paymentIntentId = paymentIntent.id;
      // Create the order
      await prisma.order.create({ data: orderData });
      return NextResponse.json({ paymentIntent });
    }
  } catch (error) {
    console.error("Payment processing error:", error);
    return NextResponse.json(
      { error: "Failed to process payment" },
      { status: 500 }
    );
  }
}
