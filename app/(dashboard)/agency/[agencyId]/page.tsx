import { db } from "@/lib/db";
import React, { FC } from "react";

interface AgencyIdPageProps {
  params: {
    agencyId: string;
  };
}

const AgencyIdPage: FC<AgencyIdPageProps> = async ({ params }) => {
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
  });

  if (!agencyDetails) return;

  const subaccounts = await db.subAccount.findMany({
    where: {
      agencyId: params.agencyId,
    },
  });
  return <div className="text-center">AgencyId: {params.agencyId}</div>;
};

export default AgencyIdPage;
