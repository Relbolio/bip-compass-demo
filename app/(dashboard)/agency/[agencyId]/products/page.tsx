import React, { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/page-header";
import dynamic from "next/dynamic";
import { currentUser } from "@/lib/auth";

const CompositeClient = dynamic(
  () => import("./_components/composite/composite-client"),
  {
    ssr: false,
  }
);
const SimpleClient = dynamic(
  () => import("./_components/simple/simple-client"),
  {
    ssr: false,
  }
);
const VariantClient = dynamic(
  () => import("./_components/variant/variant-client"),
  {
    ssr: false,
  }
);
const AllClient = dynamic(() => import("./_components/all/all-client"), {
  ssr: false,
});

interface ProductPageProps {
  params: { agencyId: string };
}

const ProductPage: FC<ProductPageProps> = async ({ params }) => {
  const authUser = await currentUser();

  if (!authUser) return null;
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <PageHeader title="Products">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="simple">Simple</TabsTrigger>
              <TabsTrigger value="variant">Variant</TabsTrigger>
              <TabsTrigger value="composite" className="">
                Composite
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all">
            <AllClient params={params} />
          </TabsContent>
          <TabsContent value="simple">
            <SimpleClient params={params} />
          </TabsContent>
          <TabsContent value="variant">
            <VariantClient params={params} />
          </TabsContent>
          <TabsContent value="composite">
            <CompositeClient params={params} />
          </TabsContent>
          <TabsContent value="active">
            <div className="text-center">Nothing now</div>
          </TabsContent>
        </Tabs>
      </PageHeader>
    </main>
  );
};

export default ProductPage;
