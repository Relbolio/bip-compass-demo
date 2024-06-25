"use client";

import { Agency, SubAccount } from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ChevronsUpDown, Compass, Menu, PlusCircleIcon } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";
import { sidebarOptProps } from "./sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { usePathname } from "next/navigation";

type Props = {
  defaultOpen?: boolean;
  subAccounts: SubAccount[];
  sidebarOpt: sidebarOptProps;
  sidebarLogo: string;
  details: any;
  user: any;
  id: string;
  sidebarProductOpt: sidebarOptProps;
};

const MenuOptions = ({
  details,
  id,
  sidebarLogo,
  sidebarOpt,
  subAccounts,
  user,
  defaultOpen,
  sidebarProductOpt,
}: Props) => {
  // const { setOpen } = useModal()
  const { onOpen } = useModal();
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <Sheet modal={false} {...openState}>
      <SheetTrigger
        asChild
        className="absolute left-4 top-4 z-[100] md:!hidden flex"
      >
        <Button variant="outline" size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent
        showX={!defaultOpen}
        side={"left"}
        className={cn(
          "bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6",
          {
            "hidden md:inline-block z-0 w-[300px]": defaultOpen,
            "inline-block md:hidden z-[100] w-full": !defaultOpen,
          }
        )}
      >
        <div>
          <AspectRatio ratio={16 / 5}>
            <Image
              src={sidebarLogo}
              alt="Sidebar Logo"
              fill
              className="rounded-md object-contain"
            />
          </AspectRatio>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className=" cursor-pointer w-full my-4 flex items-center justify-between py-8 bg-muted hover:bg-background"
                variant="ghost"
              >
                {/* <div className="w-full flex justify-between items-center gap-4">
                  <div>
                    <ChevronsUpDown
                      size={16}
                      className="text-muted-foreground"
                    />
                  </div> */}
                <div className="flex items-center text-left gap-2">
                  <Compass />
                  <div className="flex flex-col">
                    {details.name}
                    <span className="text-muted-foreground">
                      {details.address}
                    </span>
                  </div>
                </div>
                <ChevronsUpDown size={16} className="text-muted-foreground" />
                {/* </div> */}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 h-80 mt-4 z-[200]">
              <Command className="rounded-lg">
                <CommandInput placeholder="Search Accounts..." />
                <CommandList className="pb-16">
                  <CommandEmpty> No results found</CommandEmpty>
                  {(user?.role === "AGENCY_OWNER" ||
                    user?.role === "AGENCY_ADMIN") &&
                    user?.Agency && (
                      <CommandGroup heading="Agency">
                        <CommandItem className="!bg-transparent my-2 text-primary border-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all">
                          {defaultOpen ? (
                            <Link
                              href={`/agency/${user?.Agency?.id}`}
                              className="flex gap-4 w-full h-full"
                            >
                              <div className="relative w-16">
                                <Image
                                  src={user?.Agency?.agencyLogo}
                                  alt="Agency Logo"
                                  fill
                                  className="rounded-md object-contain"
                                />
                              </div>
                              <div className="flex flex-col flex-1">
                                {user?.Agency?.name}
                                <span className="text-muted-foreground">
                                  {user?.Agency?.address}
                                </span>
                              </div>
                            </Link>
                          ) : (
                            <SheetClose asChild>
                              <Link
                                href={`/agency/${user?.Agency?.id}`}
                                className="flex gap-4 w-full h-full"
                              >
                                <div className="relative w-16">
                                  <Image
                                    src={user?.Agency?.agencyLogo}
                                    alt="Agency Logo"
                                    fill
                                    className="rounded-md object-contain"
                                  />
                                </div>
                                <div className="flex flex-col flex-1">
                                  {user?.Agency?.name}
                                  <span className="text-muted-foreground">
                                    {user?.Agency?.address}
                                  </span>
                                </div>
                              </Link>
                            </SheetClose>
                          )}
                        </CommandItem>
                      </CommandGroup>
                    )}
                  <CommandGroup heading="Accounts">
                    {!!subAccounts
                      ? subAccounts.map((subaccount) => (
                          <CommandItem key={subaccount.id}>
                            {defaultOpen ? (
                              <Link
                                href={`/subaccount/${subaccount.id}`}
                                className="flex gap-4 w-full h-full"
                              >
                                <div className="relative w-16">
                                  <Image
                                    src={subaccount.subAccountLogo}
                                    alt="subaccount Logo"
                                    fill
                                    className="rounded-md object-contain"
                                  />
                                </div>
                                <div className="flex flex-col flex-1">
                                  {subaccount.name}
                                  <span className="text-muted-foreground">
                                    {subaccount.address}
                                  </span>
                                </div>
                              </Link>
                            ) : (
                              <SheetClose asChild>
                                <Link
                                  href={`/subaccount/${subaccount.id}`}
                                  className="flex gap-4 w-full h-full"
                                >
                                  <div className="relative w-16">
                                    <Image
                                      src={subaccount.subAccountLogo}
                                      alt="subaccount Logo"
                                      fill
                                      className="rounded-md object-contain"
                                    />
                                  </div>
                                  <div className="flex flex-col flex-1">
                                    {subaccount.name}
                                    <span className="text-muted-foreground">
                                      {subaccount.address}
                                    </span>
                                  </div>
                                </Link>
                              </SheetClose>
                            )}
                          </CommandItem>
                        ))
                      : "No Accounts"}
                  </CommandGroup>
                </CommandList>
                {(user?.role === "AGENCY_OWNER" ||
                  user?.role === "AGENCY_ADMIN") && (
                  <SheetClose>
                    <Button
                      className="w-full flex gap-2"
                      onClick={() => {
                        onOpen("createSubaccount", {
                          agency: user?.agency,
                          userId: user?.userId,
                          userName: user?.userName,
                        });
                      }}
                    >
                      <PlusCircleIcon size={15} />
                      Create Sub Account
                    </Button>
                  </SheetClose>
                )}
              </Command>
            </PopoverContent>
          </Popover>
          <p className="text-muted-foreground text-xs mb-2">MENU LINKS</p>
          <Separator className="mb-4" />
          <nav className="relative">
            <Command className="rounded-lg overflow-visible bg-transparent">
              <CommandInput placeholder="Search..." />
              <CommandList className="py-4 overflow-visible">
                <CommandEmpty>No Results Found</CommandEmpty>
                <CommandGroup className="overflow-visible">
                  <p className="text-muted-foreground text-xs mb-2">
                    ACCOUNT SETTINGS
                  </p>

                  {sidebarOpt.map((sidebarOptions) => {
                    // let val;
                    // const result = icons.find(
                    //   (icon) => icon.value === sidebarOptions.icon
                    // );
                    // if (result) {
                    //   val = <result.path />;
                    // }

                    return sidebarOptions.subMenu ? (
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        key={sidebarOptions.name}
                      >
                        <AccordionItem
                          value={sidebarOptions.name}
                          className="border-none"
                        >
                          <AccordionTrigger className="flex text-base items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px] no-underline">
                            {sidebarOptions?.icon}
                            <span>{sidebarOptions.name}</span>
                          </AccordionTrigger>
                          <AccordionContent>
                            {sidebarOptions.subMenu.map((submenu) => {
                              return (
                                <div
                                  key={submenu?.name}
                                  className="md:w-[320px] w-full space-y-4"
                                >
                                  <Link
                                    href={submenu?.link}
                                    className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
                                  >
                                    <span>{submenu.name}</span>
                                  </Link>
                                </div>
                              );
                            })}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <CommandItem
                        key={sidebarOptions.name}
                        className={cn(
                          "w-full hover:bg-muted-foreground transition-all",
                          pathname.includes(sidebarOptions.name) && "bg-muted"
                        )}
                      >
                        {" "}
                        <Link
                          href={sidebarOptions.link}
                          className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
                        >
                          {sidebarOptions?.icon}
                          <span>{sidebarOptions.name}</span>
                        </Link>
                      </CommandItem>
                    );
                  })}

                  <p className="text-muted-foreground text-xs mb-2">
                    PRODUCTS SETTINGS
                  </p>
                  {sidebarProductOpt.map((sidebarOptions) => {
                    return sidebarOptions.subMenu ? (
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        key={sidebarOptions.name}
                      >
                        <AccordionItem
                          value={sidebarOptions.name}
                          className="border-none"
                        >
                          <AccordionTrigger className="flex text-base items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px] no-underline">
                            {sidebarOptions?.icon}
                            <span>{sidebarOptions.name}</span>
                          </AccordionTrigger>
                          <AccordionContent>
                            {sidebarOptions.subMenu.map((submenu) => {
                              return (
                                <div
                                  key={submenu?.name}
                                  className="md:w-[320px] w-full space-y-4"
                                >
                                  <Link
                                    href={submenu?.link}
                                    className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
                                  >
                                    <span>{submenu.name}</span>
                                  </Link>
                                </div>
                              );
                            })}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <CommandItem
                        key={sidebarOptions.name}
                        className={cn(
                          "w-full hover:bg-muted-foreground transition-all",
                          pathname.includes(sidebarOptions.name) && "bg-muted"
                        )}
                      >
                        {" "}
                        <Link
                          href={sidebarOptions.link}
                          className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
                        >
                          {sidebarOptions?.icon}
                          <span>{sidebarOptions.name}</span>
                        </Link>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuOptions;
