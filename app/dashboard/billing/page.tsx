"use client";

import { createCustomerPortalSession } from "@/actions/stripe";
import { Button } from "@/components/ui/button";
import React from "react";
import toast from "react-hot-toast";

export default function BillingPage() {
  const handleClick = async () => {
    const response = await createCustomerPortalSession();

    console.log("Customer portal session response:", response);

    if (!response) {
      toast.error(
        "Failed to create customer portal session. Please try again later.",
        { position: "top-center" }
      );
      return;
    }
    window.location.href = response as string;
  };

  return (
    <div>
      <div className="p-10 my-5 mx-5 mb-5 rounded-lg bg-slate-200 dark:bg-slate-800 flex flex-col justify-center items-center">
        <h1 className="text-xl">Billing</h1>
        <p>Manage your subscription plan</p>
      </div>

      <div className="p-5">
        <Button onClick={handleClick}>Access Stripe Customer Portal</Button>
      </div>
    </div>
  );
}
