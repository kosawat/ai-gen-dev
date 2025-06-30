import { useUsage } from "@/context/usage";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignUpModal() {
  const { openModal, setOpenModal } = useUsage();

  const credits = parseInt(process.env.NEXT_PUBLIC_CREDITS_LIMIT || "0");

  return (
    <Dialog
      open={openModal}
      onOpenChange={() =>
        openModal ? setOpenModal(!openModal) : setOpenModal(openModal)
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>🚀 Unlock unlimited AI-Powered content!</DialogTitle>
          <br />
          <DialogDescription>
            <p>
              🎉 Congrats! You have generated {credits.toLocaleString()} words
              with our AI tool. That&apos;s amazing!{" "}
            </p>
            <p>
              🔒 Ready to take your content creation to the next level? Upgrade
              to a paid plan and enjoy!
            </p>
            <ul className="m-5">
              <li>✨ Unlimited word generation</li>
              <li>🧠 Advanced AI features</li>
              <li>⚡ Faster processing times</li>
              <li>🛠️ Priority customer support</li>
            </ul>
            <p>
              💡 Don&apos;t let your creativity hit a wall. Upgrade now and keep
              the ideas flowing!
            </p>

            <div className="m-5 text-center">
              <Link href="/membership">
                <Button>Join Membership</Button>
              </Link>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
