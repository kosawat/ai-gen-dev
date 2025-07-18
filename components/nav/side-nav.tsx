"use client";

import {
  LayoutDashboard,
  FileClock,
  WalletCards,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Usage from "./usage";
import SignUpModal from "../modal/sign-up-modal";

export default function SideNav() {
  const pathname = usePathname();

  console.log("Pathname:", pathname);

  const menu = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard />,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: <FileClock />,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: <WalletCards />,
      path: "/dashboard/billing",
    },
    {
      name: "Settings",
      icon: <Settings />,
      path: "/dashboard/settings",
    },
  ];
  return (
    <div className="flex flex-col h-screen p-5 shadow-sm border">
      <div className="flex-1 space-y-2">
        {menu.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className={`${
              pathname === item.path
                ? "bg-primary text-white dark:text-black"
                : "hover:bg-gray-100 hover:dark:bg-gray-700"
            } flex items-center justify-center md:justify-normal w-full gap-2 p-2 rounded-md cursor-pointer`}
          >
            {item.icon}
            <span className="hidden md:inline">{item.name}</span>
          </Link>
        ))}
      </div>
      <div className="pb-20 mt-auto">
        <Usage />
        <SignUpModal />
      </div>
    </div>
  );
}
