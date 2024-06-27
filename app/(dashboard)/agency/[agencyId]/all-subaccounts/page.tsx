import { getAuthUserDetails } from "@/lib/queries";

import React from "react";
import AllSubaccountsComponent from "./_components/all-subaccount-components";
import PageHeader from "@/components/page-header";

type Props = {
  params: { agencyId: string };
};

const AllSubaccountsPage = async ({ params }: Props) => {
  const user = await getAuthUserDetails();
  if (!user) return;

  return (
    <PageHeader title="Sub Accounts">
      <AllSubaccountsComponent user={user} />
    </PageHeader>
  );
};

export default AllSubaccountsPage;
