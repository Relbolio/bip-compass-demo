import { db } from "@/lib/db";
import React from "react";
import { Plus, PlusCircle } from "lucide-react";
import { currentUser } from "@/lib/auth";
import DataTableGeneral from "@/components/data-table-general";
import { Colorcolumns } from "./color-columns";

type Props = {
  params?: { agencyId: string };
};

const ColorClient = async ({ params }: Props) => {
  const authUser = await currentUser();
  const colors = await db.color.findMany({
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
          Add a color
        </>
      }
      filterValue="name"
      columns={Colorcolumns}
      data={colors || []}
      agency={agencyDetails}
      modalType="createVariantTypes"
      modalData={{ agency: agencyDetails, variantType: "color" }}
    ></DataTableGeneral>
  );
};

export default ColorClient;
