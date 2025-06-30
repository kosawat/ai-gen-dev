"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "../ui/modeToggle";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import { useUsage } from "@/context/usage";

export default function TopNav() {
  const { isSignedIn, user } = useUser();
  const { subscribed } = useUsage();

  return (
    <nav className="flex justify-between items-center p-4 gap-4 h-16 border-b">
      <Toaster position="top-right" />
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image
            src={"/ai-gen-logo.png"}
            height={50}
            width={50}
            alt="AI Gen Logo"
          />
        </Link>
      </div>

      {!subscribed && (
        <Link href="/membership">🔥 Join free or $9.99/month</Link>
      )}

      <div className="flex items-center justify-end gap-4">
        {isSignedIn && (
          <Link href="/dashboard">{`${user.fullName}`}&apos;s Dashboard</Link>
        )}
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <div className="ml-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
