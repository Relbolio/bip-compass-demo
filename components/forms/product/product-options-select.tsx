"use client";

import React, { useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, PlusCircleIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";
import { Agency } from "@prisma/client";

interface ProductOptionsSelectProps {
  value: string;
  onChange: (value?: string) => void;
  labels?: { [key: string]: string }; //not required is only for the first country select component i had used
  disabled?: boolean;
  data: {
    id: string;
    agencyId: string;
    name?: string;
    productName?: string;
    description?: string | null;
    sku?: string | null;
    productType?: string;
    productStatus?: string;
    createdAt: Date;
    updatedAt: Date;
    categoryId?: string;
  }[];
  type: "category" | "product" | "size" | "color" | "volume";
  agency: Agency;
}

const ProductOptionsSelect: React.FC<ProductOptionsSelectProps> = ({
  value,
  onChange,
  labels,
  disabled,
  data,
  type,
  agency,
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  const { onOpen } = useModal();

  const modalType = useMemo(() => {
    if (type == "size" || type == "volume" || type == "color") {
      return "createVariantTypes";
    }
    if (type == "category") {
      return "createCategory";
    }
    return "createProduct";
  }, []);

  const handleSelected = (value: string) => {
    onChange(value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label=""
          className={cn("w-full justify-between")}
          disabled={disabled}
        >
          {value}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <CommandInput />
            <CommandEmpty>No result</CommandEmpty>
            <CommandGroup heading={type}>
              {data.map((dataValue) => (
                <CommandItem
                  key={dataValue.id}
                  onSelect={() => handleSelected(dataValue.id)}
                >
                  {dataValue?.name || dataValue?.productName}
                  <Checkbox
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === dataValue.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <Button
            className="w-full flex gap-2"
            onClick={() => {
              onOpen(modalType, {
                variantType:
                  type !== "category" && type !== "product" ? type : undefined,
                agency: agency,
              });
            }}
          >
            <PlusCircleIcon size={15} />
            Create {type}
          </Button>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProductOptionsSelect;
