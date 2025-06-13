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

export default function TopNav() {
  const { isSignedIn, user } = useUser();

  console.log("User:", user);
  console.log("isSignedIn:", isSignedIn);

  return (
    <nav className="flex justify-between items-center p-4 gap-4 h-16 border-b">
      <Toaster position="top-right" />
      <div className="flex items-center gap-4">
        <Link href="/">Home</Link>
      </div>
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
