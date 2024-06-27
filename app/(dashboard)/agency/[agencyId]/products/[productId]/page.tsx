import { db } from "@/lib/db";
import React from "react";
import { currentUser } from "@/lib/auth";
import PageHeader from "@/components/page-header";
import { ProductForm } from "@/components/forms/product/product-form";

type Props = {
  params: { agencyId: string; productId: string };
};

const ProductIdPage = async ({ params }: Props) => {
  const authUser = await currentUser();

  if (!authUser) return null;
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include: {
      SubAccount: true,
      categories: true,
      colors: true,
      sizes: true,
      volumes: true,
      products: true,
    },
  });

  const productData = await db.product.findUnique({
    where: {
      id: params.productId,
      agencyId: params.agencyId,
    },
    include: {
      productVariants: true,
      category: true,
      compositeComponents: true,
    },
  });

  if (!agencyDetails) return;

  return <ProductForm agency={agencyDetails} productData={productData} />;
};

export default ProductIdPage;
