import SideNav from "@/components/nav/side-nav";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <SideNav />
      </div>
      <div className="col-span-3">
        <div className="m-4">{children}</div>
      </div>
    </div>
  );
}
