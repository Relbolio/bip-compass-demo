import { db } from "@/lib/db";
import React from "react";
import { Plus, PlusCircle } from "lucide-react";
import { currentUser } from "@/lib/auth";
import DataTableGeneral from "@/components/data-table-general";
import { Compositecolumns } from "./composite-columns";
import { DataTable } from "@/components/ui/data-table";
import { AllProductColumn } from "../all/all-columns";

type Props = {
  params?: { agencyId: string };
};

const CompositeClient = async ({ params }: Props) => {
  const authUser = await currentUser();

  if (!authUser) return null;

  const products = await db.product.findMany({
    where: {
      agencyId: params?.agencyId,
      productType: "COMPOSITE",
    },
    include: {
      category: true,
      compositeComponents: {
        include: {
          componentProduct: true,
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

  //   id = 1, parentProductId = 1, componentProductId = 2, quantity = 1 (PC has 1 CPU)
  // id = 2, parentProductId = 1, componentProductId = 3, quantity = 2 (PC has 2 RAMs)
  // id = 3, parentProductId = 1, componentProductId = 4, quantity = 1 (PC has 1 Motherboard)

  const formattedProducts: AllProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.productName,
    components: product.compositeComponents.map((component) => ({
      id: component.componentProduct.id,
      name: component.componentProduct.productName,
      quantity: component.quantity,
    })),
    category: product.category.name,
    createdAt: product.createdAt,
  }));

  return (
    <DataTable
      columns={Compositecolumns}
      data={formattedProducts}
      filterValue="name"
      actionButtonText={
        <>
          <PlusCircle size={15} />
          Add a composite product
        </>
      }
      href={`agency/${params?.agencyId}/products/add?type=composite`}
    />
  );
};

export default CompositeClient;
