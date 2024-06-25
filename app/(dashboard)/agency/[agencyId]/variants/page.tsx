import { db } from "@/lib/db";
import React from "react";
import { currentUser } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Agency } from "@prisma/client";
import dynamic from "next/dynamic";

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
      <Card className="border-none drop-shadow-sm w-full">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-2xl line-clamp-1 uppercase">
            Variants
          </CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </main>
  );
};

export default VariantsPage;
