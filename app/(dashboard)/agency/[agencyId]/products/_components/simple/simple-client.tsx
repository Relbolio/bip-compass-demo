import { db } from "@/lib/db";
import React from "react";
import { Plus, PlusCircle } from "lucide-react";
import { currentUser } from "@/lib/auth";
import DataTableGeneral from "@/components/data-table-general";
import { Simplecolumns } from "./simple-columns";
import { DataTable } from "@/components/ui/data-table";
import { AllProductColumn } from "../all/all-columns";

type Props = {
  params?: { agencyId: string };
};

const VariantClient = async ({ params }: Props) => {
  const authUser = await currentUser();

  if (!authUser) return null;

  const products = await db.product.findMany({
    where: {
      agencyId: params?.agencyId,
      productType: "SIMPLE",
    },
    include: {
      category: true,
    },
  });

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

  const formattedProducts: AllProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.productName,
    productType: item.productType,
    category: item.category.name,
    createdAt: item.createdAt,
  }));

  return (
    <DataTable
      columns={Simplecolumns}
      data={formattedProducts}
      filterValue="name"
      actionButtonText={
        <>
          <PlusCircle size={15} />
          Add a simple product
        </>
      }
      href={`/agency/${params?.agencyId}/products/add?type=simple`}
    />
  );
};

export default VariantClient;
