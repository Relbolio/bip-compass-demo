import { db } from "@/lib/db";
import React from "react";
import { Plus, PlusCircle } from "lucide-react";
import { currentUser } from "@/lib/auth";
import DataTableGeneral from "@/components/data-table-general";
import { AllProductColumn, Allcolumns } from "./all-columns";
import { DataTable } from "@/components/ui/data-table";

type Props = {
  params?: { agencyId: string };
};

const AllClient = async ({ params }: Props) => {
  const authUser = await currentUser();

  if (!authUser) return null;

  const products = await db.product.findMany({
    where: {
      agencyId: params?.agencyId,
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
    // price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    // size: item.size.name,
    // color: item.color.value,
    // volume: item.volume.value,
    createdAt: item.createdAt,
  }));

  return (
    <DataTable
      columns={Allcolumns}
      data={formattedProducts}
      filterValue="name"
    />
  );
};

export default AllClient;
