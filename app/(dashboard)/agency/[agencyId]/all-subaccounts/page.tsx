import { getAuthUserDetails } from "@/lib/queries";

import React from "react";
import AllSubaccountsComponent from "./_components/all-subaccount-components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  params: { agencyId: string };
};

const AllSubaccountsPage = async ({ params }: Props) => {
  const user = await getAuthUserDetails();
  if (!user) return;

  return (
    <Card className="border-none drop-shadow-sm w-full">
      <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-2xl line-clamp-1 uppercase">
          Sub Accounts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AllSubaccountsComponent user={user} />
      </CardContent>
    </Card>
  );
};

export default AllSubaccountsPage;
