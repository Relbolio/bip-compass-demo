import { db } from "@/lib/db";
import React from "react";
import { Plus, PlusCircle } from "lucide-react";
import SendInvitation from "@/components/forms/send-invitation";
import { currentUser } from "@/lib/auth";
import { columns } from "./_components/columns";
import DataTableGeneral from "@/components/data-table-general";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/page-header";

type Props = {
  params: { agencyId: string };
};

const TeamPage = async ({ params }: Props) => {
  const authUser = await currentUser();
  const teamMembers = await db.user.findMany({
    where: {
      Agency: {
        id: params.agencyId,
      },
    },
    include: {
      Agency: { include: { SubAccount: true } },
      Permissions: { include: { SubAccount: true } },
    },
  });

  if (!authUser) return null;
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include: {
      SubAccount: true,
    },
  });

  if (!agencyDetails) return;

  return (
    <PageHeader title="Team">
      <DataTableGeneral
        actionButtonText={
          <>
            <PlusCircle size={15} />
            Add a member
          </>
        }
        filterValue="name"
        columns={columns}
        data={teamMembers}
        agency={agencyDetails}
        modalType="createTeamMember"
        modalData={{ agency: agencyDetails }}
      ></DataTableGeneral>
    </PageHeader>
  );
};

export default TeamPage;
