import React, { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface PageHeaderProps {
  title: string;
  children: React.ReactNode;
}

const PageHeader: FC<PageHeaderProps> = ({ title, children }) => {
  return (
    <Card className="border-none drop-shadow-sm w-full">
      <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-2xl line-clamp-1 uppercase">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default PageHeader;
