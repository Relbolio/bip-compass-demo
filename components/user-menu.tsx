"use client";

import React, { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Briefcase, ChevronDown, LogOut, UserCogIcon } from "lucide-react";
// import placeholder from "@/public/images/placeholder.jpg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { logout } from "@/actions/auth/logout";

interface UserMenuProps {
  avatarUrl?: string;
}

const UserMenu: FC<UserMenuProps> = ({ avatarUrl }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  console.log("pathName", pathName);

  const handleLogout = () => {
    logout(pathName);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-between items-center space-x-2 ">
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                //  src={placeholder?.src}
                src={avatarUrl || "/placeholder.jpg"}
                alt="user"
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
          {/* <ChevronDown className="w-3 h-3 bg-white" /> */}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-4" align="end" forceMount>
        <DropdownMenuItem>
          <div
            className="flex items-center justify-start space-x-5 w-full"
            onClick={handleLogout}
          >
            <LogOut className=" h-6 w-6 text-muted-foreground" />
            <h3 className="text-sm">Log out</h3>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
