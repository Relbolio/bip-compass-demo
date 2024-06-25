import { db } from "@/lib/db";
import React from "react";
import { Plus, PlusCircle } from "lucide-react";
import SendInvitation from "@/components/forms/send-invitation";
import { currentUser } from "@/lib/auth";
import { columns } from "./_components/columns";
import DataTableGeneral from "@/components/data-table-general";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="border-none drop-shadow-sm w-full">
      <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-2xl line-clamp-1 uppercase">Team</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default TeamPage;
