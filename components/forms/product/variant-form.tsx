import React from "react";
import {
  useFieldArray,
  Controller,
  UseFormReturn,
  FieldErrors,
  FieldValues,
} from "react-hook-form";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// interface VariantFormProps {
//   control: UseFormReturn<FieldValues>["control"]; // Utilisation du type FieldValues défini pour le contrôle
//   register: UseFormReturn<FieldValues>["register"]; // Utilisation du type FieldValues défini pour l'enregistrement
//   errors: FieldErrors<FieldValues>; // Utilisation du type FieldValues pour les erreurs
// }

interface VariantFormProps {
  control: any; // Utilisation du type FieldValues défini pour le contrôle
  register: any; // Utilisation du type FieldValues défini pour l'enregistrement
  errors: any; // Utilisation du type FieldValues pour les erreurs
}

export function VariantForm({ control, register, errors }: VariantFormProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Variants</CardTitle>
      </CardHeader>
      <CardContent>
        {fields.map((field, index) => (
          <div key={field.id} className="grid gap-6 mb-4">
            <div className="grid gap-3">
              <Label htmlFor={`variants.${index}.size`}>Size</Label>
              <Controller
                control={control}
                name={`variants.${index}.size`}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger id={`variants.${index}.size`}>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="S">Small</SelectItem>
                      <SelectItem value="M">Medium</SelectItem>
                      <SelectItem value="L">Large</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor={`variants.${index}.color`}>Color</Label>
              <Controller
                control={control}
                name={`variants.${index}.color`}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger id={`variants.${index}.color`}>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor={`variants.${index}.price`}>Price</Label>
              <Input
                id={`variants.${index}.price`}
                type="number"
                {...register(`variants.${index}.price`)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor={`variants.${index}.quantity`}>Quantity</Label>
              <Input
                id={`variants.${index}.quantity`}
                type="number"
                {...register(`variants.${index}.quantity`)}
              />
            </div>
            <Button variant="destructive" onClick={() => remove(index)}>
              Remove Variant
            </Button>
          </div>
        ))}
        <Button variant="secondary" onClick={() => append({})}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Variant
        </Button>
      </CardContent>
    </Card>
  );
}
