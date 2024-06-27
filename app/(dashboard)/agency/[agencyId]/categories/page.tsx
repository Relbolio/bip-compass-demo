import { db } from "@/lib/db";
import React from "react";
import { Plus, PlusCircle } from "lucide-react";
import { currentUser } from "@/lib/auth";
import { columns } from "./_components/columns";
import DataTableGeneral from "@/components/data-table-general";
import PageHeader from "@/components/page-header";

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
    <PageHeader title="Categories">
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
    </PageHeader>
  );
};

export default CategoriesPage;
