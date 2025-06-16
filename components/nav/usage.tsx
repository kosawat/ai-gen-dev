import React from "react";
import { useUsage } from "@/context/usage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Usage = () => {
  const { count } = useUsage();

  const credits = process.env.NEXT_PUBLIC_CREDITS_LIMIT || "10000"; // Default to 10000 if not set
  const percentageUsed = ((count / parseInt(credits, 10)) * 100).toFixed(2);

  return (
    <div className="m-2">
      <div className="rounded-lg shadow border p-2">
        <h2 className="font-medium">Credits</h2>

        <div className="h-2 bg-slate-500 w-full rounded-full mt-3">
          <div
            className="h-2 bg-slate-200 rounded-full"
            style={{ width: `${percentageUsed}%` }}
          ></div>
        </div>

        {/* <h2 className="text-sm my-2">
          {subscribed
            ? `Unlimited credits`
            : `${count} / ${credits} credit used`}
        </h2> */}
        <h2 className="text-sm my-2">{`${count} / ${credits} credit used`}</h2>
      </div>

      <Link href="/membership">
        <Button className="w-full my-3 cursor-pointer" variant="secondary">
          Upgrade
        </Button>
      </Link>
    </div>
  );
};

export default Usage;
