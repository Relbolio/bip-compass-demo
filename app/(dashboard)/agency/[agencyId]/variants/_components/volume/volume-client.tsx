import { db } from "@/lib/db";
import React from "react";
import { Plus, PlusCircle } from "lucide-react";
import { currentUser } from "@/lib/auth";
import DataTableGeneral from "@/components/data-table-general";
import { Volumecolumns } from "./volume-columns";

type Props = {
  params?: { agencyId: string };
};

const VolumeClient = async ({ params }: Props) => {
  const authUser = await currentUser();
  const volumes = await db.volume.findMany({
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
          Add a volume
        </>
      }
      filterValue="name"
      columns={Volumecolumns}
      data={volumes || []}
      agency={agencyDetails}
      modalType="createVariantTypes"
      modalData={{ agency: agencyDetails, variantType: "volume" }}
    ></DataTableGeneral>
  );
};

export default VolumeClient;
