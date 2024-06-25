import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Checkbox } from "./ui/checkbox";
import { countryOptions } from "@/lib/country-options";
import { cn } from "@/lib/utils";

interface CountrySelectProps {
  value: string;
  onChange: (value?: string) => void;
  labels?: { [key: string]: string }; //not required is only for the first country select component i had used
  disabled?: boolean;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  labels,
  disabled,
  ...rest
}) => {
  const [open, setOpen] = useState(false);

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
            <CommandGroup heading="Currency">
              {countryOptions.map((country) => (
                <CommandItem
                  key={country.value}
                  onSelect={() => handleSelected(country.value)}
                >
                  {country.label}
                  <Checkbox
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === country.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountrySelect;
