"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import UserMenu from "../user-menu";
import { ModeToggle } from "../mode-toggle";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const LandingNavbar = () => {
  const currentUser = useCurrentUser();

  return (
    <nav className="p-4  flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image fill alt="Logo" src="/bip-logo.png" />
        </div>
        <h1 className={cn("text-2xl font-bold text-white", font.className)}>
          Compass
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={currentUser ? "/agency" : "/auth/login"}>
          <Button variant="outline" className="rounded-full">
            {currentUser ? "Get Started" : "Login"}
          </Button>
        </Link>
        {currentUser && <UserMenu />}
      </div>
    </nav>
  );
};
