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
import { createCategory, saveActivityLogsNotification } from "@/lib/queries";
import { useToast } from "../ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

interface CategoryFormProps {
  agencyId: string;
  onClose?: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ agencyId, onClose }) => {
  const { toast } = useToast();

  const router = useRouter();
  const userDataSchema = z.object({
    name: z.string().min(2),
  });

  const form = useForm<z.infer<typeof userDataSchema>>({
    resolver: zodResolver(userDataSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userDataSchema>) => {
    try {
      const res = await createCategory({
        id: uuidv4(),
        name: values.name,
        agencyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await saveActivityLogsNotification({
        agencyId: agencyId,
        description: `Created category ${res?.name}`,
        subaccountId: undefined,
      });
      toast({
        title: "Success",
        description: "Created a Category",
      });
      if (onClose) onClose();
      return router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Oppse!",
        description: "Could not create a category",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category</CardTitle>
        <CardDescription>
          Add Category. This category is neccessary to create and categorize the
          products.
        </CardDescription>
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
                    <Input placeholder="Name..." {...field} />
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
              Save Category
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
