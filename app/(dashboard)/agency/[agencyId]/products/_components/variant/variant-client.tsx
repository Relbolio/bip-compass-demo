import { db } from "@/lib/db";
import React from "react";
import { Plus, PlusCircle } from "lucide-react";
import { currentUser } from "@/lib/auth";
import DataTableGeneral from "@/components/data-table-general";
import { Variantcolumns } from "./variant-columns";
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
      productType: "VARIANT",
    },
    include: {
      category: true,
      productVariants: {
        include: {
          color: true,
          size: true,
          volume: true,
        },
      },
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

  const formattedProducts: AllProductColumn[] = products.flatMap((item) =>
    item.productVariants.map((variant) => ({
      id: item.id,
      name: item.productName,
      category: item.category.name,
      createdAt: variant?.createdAt,
      size: variant?.size?.name,
      color: variant?.color?.value,
      volume: variant?.volume?.name,
    }))
  );

  return (
    <DataTable
      columns={Variantcolumns}
      data={formattedProducts}
      filterValue="name"
      actionButtonText={
        <>
          <PlusCircle size={15} />
          Add a variant product
        </>
      }
      href={`/agency/${params?.agencyId}/products/add?type=variant`}
    />
  );
};

export default VariantClient;
