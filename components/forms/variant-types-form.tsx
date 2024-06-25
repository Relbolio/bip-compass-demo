"use client";
import React from "react";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  createCategory,
  createColor,
  createSize,
  createVolume,
  saveActivityLogsNotification,
} from "@/lib/queries";
import { useToast } from "../ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface VariantTypesFormProps {
  agencyId: string;
  onClose?: () => void;
  type: "size" | "volume" | "color";
}

const VariantTypesForm: React.FC<VariantTypesFormProps> = ({
  agencyId,
  onClose,
  type,
}) => {
  const { toast } = useToast();

  const router = useRouter();
  const userDataSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
  });

  const form = useForm<z.infer<typeof userDataSchema>>({
    resolver: zodResolver(userDataSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userDataSchema>) => {
    try {
      let res;
      if (type === "size") {
        res = await createSize({
          id: uuidv4(),
          name: values.name,
          value: values.value,
          agencyId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      if (type === "color") {
        res = await createColor({
          id: uuidv4(),
          name: values.name,
          value: values.value,
          agencyId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      if (type === "volume") {
        res = await createVolume({
          id: uuidv4(),
          name: values.name,
          value: values.value,
          agencyId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      await saveActivityLogsNotification({
        agencyId: agencyId,
        description: `Created ${type} variant name: ${res?.name} value: ${res?.value}`,
        subaccountId: undefined,
      });
      toast({
        title: "Success",
        description: "Created a VariantTypes",
      });
      if (onClose) onClose();
      return router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Oppse!",
        description: "Could not create a variant",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{type?.toUpperCase()} Variant</CardTitle>
        <CardDescription>Add a {type}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              disabled={form.formState.isSubmitting}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      placeholder="Name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div
                      className={cn(
                        type === "color" && "flex items-center gap-x-4"
                      )}
                    >
                      <Input
                        disabled={form.formState.isSubmitting}
                        placeholder={`${type} value`}
                        {...field}
                      />
                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              isLoading={form.formState.isSubmitting}
            >
              Save {type}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VariantTypesForm;
