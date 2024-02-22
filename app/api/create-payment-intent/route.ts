import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);
  const price: any = Math.floor(totalPrice);
  return price;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const { items, payment_intent_id } = body;
  const total = calculateOrderAmount(items) * 100;

  try {
    let orderData;

    if (payment_intent_id) {
      // Update existing payment intent with new amount
      const current_intent = await stripe.paymentIntents.retrieve(
        payment_intent_id
      );

      if (current_intent) {
        const updated_intent = await stripe.paymentIntents.update(
          payment_intent_id,
          { amount: total }
        );

        // Update order if it exists
        const existing_order = await prisma.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        });

        if (!existing_order) {
          return NextResponse.json(
            { error: "Invalid Payment Intent" },
            { status: 400 }
          );
        }

        orderData = {
          amount: total,
          products: items,
        };

        await prisma.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: orderData,
        });

        return NextResponse.json({ paymentIntent: updated_intent });
      }
    } else {
      // Create new payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        description: "Order description goes here",
        currency: "inr",
        automatic_payment_methods: { enabled: true },
      });

      orderData = {
        user: { connect: { id: currentUser.id } },
        amount: total,
        currency: "inr",
        description: "Order description goes here",
        status: "pending",
        deliveryStatus: "pending",
        paymentIntentId: paymentIntent.id,
        products: items,
      };

      await prisma.order.create({
        data: orderData,
      });

      return NextResponse.json({ paymentIntent });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
