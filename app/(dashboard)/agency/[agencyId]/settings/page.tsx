import AgencyForm from "@/components/forms/agency-form";
import UserForm from "@/components/forms/user-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

type Props = {
  params: { agencyId: string };
};

const SettingsPage = async ({ params }: Props) => {
  const authUser = await currentUser();
  if (!authUser) return null;

  const userDetails = await db.user.findUnique({
    where: {
      email: authUser.email,
    },
  });

  if (!userDetails) return null;
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include: {
      SubAccount: true,
    },
  });

  if (!agencyDetails) return null;

  const subAccounts = agencyDetails.SubAccount;

  return (
    <>
      <Card className="border-none drop-shadow-sm w-full mb-2">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-2xl line-clamp-1 uppercase">
            Settings
          </CardTitle>
        </CardHeader>
      </Card>
      <div className="flex lg:!flex-row flex-col gap-4">
        <AgencyForm data={agencyDetails} />
        <UserForm
          type="agency"
          id={params.agencyId}
          subAccounts={subAccounts}
          userData={userDetails}
        />
      </div>
    </>
  );
};

export default SettingsPage;
