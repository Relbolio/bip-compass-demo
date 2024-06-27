import React from "react";
import {
  useFieldArray,
  UseFormReturn,
  FieldErrors,
  FieldValues,
} from "react-hook-form";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// interface CompositeFormProps {
//   control: UseFormReturn<FieldValues>["control"]; // Utilisation du type FieldValues défini pour le contrôle
//   register: UseFormReturn<FieldValues>["register"]; // Utilisation du type FieldValues défini pour l'enregistrement
//   errors: FieldErrors<FieldValues>; // Utilisation du type FieldValues pour les erreurs
// }

interface CompositeFormProps {
  control: any; // Utilisation du type FieldValues défini pour le contrôle
  register: any; // Utilisation du type FieldValues défini pour l'enregistrement
  errors: any; // Utilisation du type FieldValues pour les erreurs
}

export function CompositeForm({
  control,
  register,
  errors,
}: CompositeFormProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "components",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Components</CardTitle>
      </CardHeader>
      <CardContent>
        {fields.map((field, index) => (
          <div key={field.id} className="grid gap-6 mb-4">
            <div className="grid gap-3">
              <Label htmlFor={`components.${index}.productId`}>Product</Label>
              <Input
                id={`components.${index}.productId`}
                type="text"
                {...register(`components.${index}.productId`)}
              />
              {/* {errors.components && errors.components[index]?.productId && (
                <span>{errors.components[index]?.productId?.message}</span>
              )} */}
            </div>
            <div className="grid gap-3">
              <Label htmlFor={`components.${index}.quantity`}>Quantity</Label>
              <Input
                id={`components.${index}.quantity`}
                type="number"
                {...register(`components.${index}.quantity`)}
              />
              {/* {errors.components && errors.components[index]?.quantity && (
                <span>{errors.components[index]?.quantity?.message}</span>
              )} */}
            </div>
            <Button variant="destructive" onClick={() => remove(index)}>
              Remove Component
            </Button>
          </div>
        ))}
        <Button variant="secondary" onClick={() => append({})}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Component
        </Button>
      </CardContent>
    </Card>
  );
}
