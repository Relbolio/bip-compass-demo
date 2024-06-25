"use client";

import React, { FC } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getAuthUserDetails } from "@/lib/queries";
import { Agency, Prisma, SubAccount } from "@prisma/client";
import Image from "next/image";

import { useModal } from "@/hooks/use-modal-store";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface AllSubaccountsComponentProps {
  user: Prisma.PromiseReturnType<typeof getAuthUserDetails>;
}

const AllSubaccountsComponent: FC<AllSubaccountsComponentProps> = ({
  user,
}) => {
  const { onOpen } = useModal();

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col ">
          <Button
            className="w-[200px] self-end m-6 flex gap-2 cursor-pointer"
            onClick={() => {
              onOpen("createSubaccount", {
                agency: user?.Agency as Agency,
                userName: user?.name,
                userId: user?.id,
              });
            }}
          >
            <PlusCircleIcon size={15} />
            <span>Create Sub Account</span>
          </Button>
          <Command className="rounded-lg bg-transparent">
            <CommandInput placeholder="Search Account..." />
            <CommandList>
              <CommandEmpty>No Results Found.</CommandEmpty>
              <CommandGroup heading="Sub Accounts">
                {!!user?.Agency?.SubAccount.length ? (
                  user.Agency.SubAccount.map((subaccount: SubAccount) => (
                    <CommandItem
                      key={subaccount.id}
                      className="h-32 !bg-background my-2 text-primary border-[1px] border-border p-4 rounded-lg hover:!bg-background cursor-pointer transition-all"
                    >
                      <Link
                        href={`/subaccount/${subaccount.id}`}
                        className="flex gap-4 w-full h-full"
                      >
                        <div className="relative w-32">
                          <Image
                            src={subaccount.subAccountLogo}
                            alt="subaccount logo"
                            fill
                            className="rounded-md object-contain bg-muted/50 p-4"
                          />
                        </div>
                        <div className="flex flex-col justify-between">
                          <div className="flex flex-col">
                            {subaccount.name}
                            <span className="text-muted-foreground text-xs">
                              {subaccount.address}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <Button
                        size={"sm"}
                        variant={"destructive"}
                        className="w-20 hover:bg-red-600 hover:text-white !text-white"
                        onClick={() =>
                          onOpen("deleteSubaccount", {
                            subaccount: subaccount,
                          })
                        }
                      >
                        Delete
                      </Button>
                    </CommandItem>
                  ))
                ) : (
                  <div className="text-muted-foreground text-center p-4">
                    No Sub accounts
                  </div>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </CardContent>
    </Card>
  );
};

export default AllSubaccountsComponent;
