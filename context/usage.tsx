"use client";

import { UsageContextType } from "@/utils/types";
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { usageCount } from "@/actions/ai";
import { checkSubscription } from "@/actions/stripe";

const UsageContext = createContext<UsageContextType | null>(null);

export const UsageProvider = ({ children }: { children: React.ReactNode }) => {
  // state
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // hooks
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress || "N/A";

  const credits = parseInt(process.env.NEXT_PUBLIC_CREDITS_LIMIT || "0");

  const fetchUsageCount = async (email: string) => {
    try {
      const usageData = await usageCount(email);
      setCount(usageData.count || 0);
    } catch (error) {
      console.error("Error fetching usage count:", error);
      setCount(0);
    }
  };

  const fetchUserSubscription = async () => {
    const response = await checkSubscription();
    console.log("Checking user subscription response:", response);

    setSubscribed(response?.ok || false);
  };

  useEffect(() => {
    if (userEmail) {
      fetchUsageCount(userEmail);
      fetchUserSubscription();
    }
  }, [userEmail]);

  useEffect(() => {
    if (!subscribed && count > credits) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [count, subscribed]);

  return (
    <UsageContext.Provider
      value={{ count, fetchUsageCount, openModal, setOpenModal, subscribed }}
    >
      {children}
    </UsageContext.Provider>
  );
};

export const useUsage = () => {
  const context = useContext(UsageContext);
  if (context === null) {
    throw new Error("useUsage must be used within a UsageProvider");
  }
  return context;
};
