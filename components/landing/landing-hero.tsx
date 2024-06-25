"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

export const LandingHero = () => {
  const currentUser = useCurrentUser();

  return (
    <div className="text-white font-bold py-20 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best Platform for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
          <TypewriterComponent
            options={{
              strings: [
                "Inventory management.",
                "Human resources.",
                "Accounting.",
                "And much more.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      {/* <div className="text-sm md:text-xl font-light text-zinc-400">
        Create content using AI 10x faster.
      </div>
      <div>
        <Link href={currentUser ? "/agency" : "/auth/register"}>
          <Button
            variant="default"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Start Generating For Free
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required.
      </div> */}
    </div>
  );
};
