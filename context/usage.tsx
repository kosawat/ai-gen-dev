"use client";

import { UsageContextType } from "@/utils/types";
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { usageCount } from "@/actions/ai";

const UsageContext = createContext<UsageContextType | null>(null);

export const UsageProvider = ({ children }: { children: React.ReactNode }) => {
  // state
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  // hooks
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress || "N/A";

  const credits = parseInt(process.env.NEXT_PUBLIC_CREDITS_LIMIT || "10000"); // Default to 10000 if not set

  const fetchUsageCount = async (email: string) => {
    try {
      const usageData = await usageCount(email);
      setCount(usageData.count || 0);
    } catch (error) {
      console.error("Error fetching usage count:", error);
      setCount(0);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchUsageCount(userEmail);
    }
  }, [userEmail]);

  useEffect(() => {
    if (count > credits) {
      setOpenModal(true);
    }
  }, [count]);

  return (
    <UsageContext.Provider
      value={{ count, fetchUsageCount, openModal, setOpenModal }}
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
