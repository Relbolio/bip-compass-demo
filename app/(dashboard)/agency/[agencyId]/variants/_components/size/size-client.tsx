import { db } from "@/lib/db";
import React from "react";
import { Plus, PlusCircle } from "lucide-react";
import { currentUser } from "@/lib/auth";
import DataTableGeneral from "@/components/data-table-general";
import { Sizecolumns } from "./size-columns";

type Props = {
  params?: { agencyId: string };
};

const SizeClient = async ({ params }: Props) => {
  const authUser = await currentUser();
  const sizes = await db.size.findMany({
    where: {
      agencyId: params?.agencyId,
    },
    include: {
      agency: { include: { SubAccount: true } },
    },
  });

  if (!authUser) return null;
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params?.agencyId,
    },
    include: {
      SubAccount: true,
      categories: true,
    },
  });

  if (!agencyDetails) return;

  return (
    <DataTableGeneral
      actionButtonText={
        <>
          <PlusCircle size={15} />
          Add a size
        </>
      }
      filterValue="name"
      columns={Sizecolumns}
      data={sizes || []}
      agency={agencyDetails}
      modalType="createVariantTypes"
      modalData={{ agency: agencyDetails, variantType: "size" }}
    ></DataTableGeneral>
  );
};

export default SizeClient;
