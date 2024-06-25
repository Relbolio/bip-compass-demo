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

const CategoriesPage = async ({ params }: Props) => {
  const authUser = await currentUser();
  const categories = await db.category.findMany({
    where: {
      agencyId: params.agencyId,
    },
    include: {
      agency: { include: { SubAccount: true } },
    },
  });

  if (!authUser) return null;
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include: {
      SubAccount: true,
      categories: true,
    },
  });

  if (!agencyDetails) return;

  return (
    <Card className="border-none drop-shadow-sm w-full">
      <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-2xl line-clamp-1 uppercase">
          Categories
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTableGeneral
          actionButtonText={
            <>
              <PlusCircle size={15} />
              Add a category
            </>
          }
          filterValue="name"
          columns={columns}
          data={categories}
          agency={agencyDetails}
          modalType="createCategory"
          modalData={{ agency: agencyDetails }}
        ></DataTableGeneral>
      </CardContent>
    </Card>
  );
};

export default CategoriesPage;
