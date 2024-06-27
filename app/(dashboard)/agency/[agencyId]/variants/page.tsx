import { db } from "@/lib/db";
import React from "react";
import { currentUser } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import PageHeader from "@/components/page-header";

const SizeClient = dynamic(() => import("./_components/size/size-client"), {
  ssr: false,
});
const ColorClient = dynamic(() => import("./_components/color/color-client"), {
  ssr: false,
});
const VolumeClient = dynamic(
  () => import("./_components/volume/volume-client"),
  { ssr: false }
);

type Props = {
  params: { agencyId: string };
};

const VariantsPage = async ({ params }: Props) => {
  const authUser = await currentUser();

  if (!authUser) return null;

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <PageHeader title="Variants">
        <Tabs defaultValue="color">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="color">Color</TabsTrigger>
              <TabsTrigger value="size">Size</TabsTrigger>
              <TabsTrigger value="volume">Volume</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="color">
            <ColorClient params={params} />
          </TabsContent>
          <TabsContent value="size">
            <SizeClient params={params} />
          </TabsContent>
          <TabsContent value="volume">
            <VolumeClient params={params} />
          </TabsContent>
        </Tabs>
      </PageHeader>
    </main>
  );
};

export default VariantsPage;
