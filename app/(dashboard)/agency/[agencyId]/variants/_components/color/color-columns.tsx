"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useModal } from "@/hooks/use-modal-store";
import { Color } from "@prisma/client";

export const Colorcolumns: ColumnDef<Color>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.value }}
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;

      return <CellActions rowData={rowData} />;
    },
  },
];

interface CellActionsProps {
  rowData: Color;
}

const CellActions: React.FC<CellActionsProps> = ({ rowData }) => {
  const { data, onOpen } = useModal();

  const authUser = useCurrentUser();

  if (!rowData) return;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {authUser?.role === "AGENCY_OWNER" && (
          <DropdownMenuItem
            className="flex gap-2"
            onClick={() =>
              onOpen("deleteVariantTypes", {
                variantTypeId: rowData.id,
                variantType: "color",
              })
            }
          >
            <Trash size={15} /> Remove color
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
