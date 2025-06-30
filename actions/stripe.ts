"use server";

import Transaction from "@/models/transaction";
import db from "@/utils/db";
import stripe from "@/utils/stripe";
import { currentUser } from "@clerk/nextjs/server";

interface CheckoutSessionResponse {
  url?: string;
  error?: string;
}

export async function createCheckoutSession(): Promise<CheckoutSessionResponse> {
  const user = await currentUser();
  const customerEmail = user?.emailAddresses[0].emailAddress;

  if (!customerEmail) {
    return { error: "User not found." };
  }

  try {
    await db();

    // Find the Stripe customer id from database
    const existingTransaction = await Transaction.findOne({ customerEmail });

    if (existingTransaction) {
      // retrieve the customer subscription from Stripe
      const subscriptions = await stripe.subscriptions.list({
        customer: existingTransaction.customerId,
        status: "all",
        limit: 1,
      });

      // Check if any subscription is active
      const currentSubscription = subscriptions.data.find(
        (sub) => sub.status === "active"
      );

      if (currentSubscription) {
        return { error: "You already have an active subscription." };
      }
    }

    // Create a new Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_MONTHLY_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer_email: customerEmail,
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}`,
    });
    return { url: session.url ?? undefined };
  } catch (error) {
    console.error("Error creating Stripe Checkout Session", error);
    return { error: "Creating Stripe Checkout Session failed." };
  }
}

export async function checkSubscription(): Promise<{
  error?: string;
  ok?: boolean;
}> {
  const user = await currentUser();
  const customerEmail = user?.emailAddresses[0].emailAddress;

  if (!customerEmail) {
    return { error: "User not found." };
  }

  try {
    const transaction = await Transaction.findOne({
      customerEmail,
      status: "complete",
    });

    if (transaction && transaction.subscriptionId) {
      // Retrieve the subscription details from Stripe
      const subscription = await stripe.subscriptions.retrieve(
        transaction.subscriptionId
      );

      console.log("Subscription details:", subscription);

      if (subscription.status === "active") {
        return {
          ok: true,
        };
      }
    }
    return {
      ok: false,
    };
  } catch (error) {
    console.error("Error checking subscription", error);
    return { error: "Checking subscription failed." };
  }
}
