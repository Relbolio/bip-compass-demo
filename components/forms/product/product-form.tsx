"use client";

import React from "react";
import Image from "next/image";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft, PlusCircle, Trash, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter, useSearchParams } from "next/navigation";
import { VariantForm } from "./variant-form";
import { CompositeForm } from "./composite-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Agency,
  Category,
  Color,
  CompositeProduct,
  Product,
  ProductVariant,
  Size,
  SubAccount,
  Volume,
} from "@prisma/client";
import ProductOptionsSelect from "./product-options-select";
import FileUpload from "@/components/file-upload";

const formSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  sku: z.string().optional(),
  productType: z.enum(["SIMPLE", "VARIANT", "COMPOSITE"]),
  productStatus: z.enum(["ACTIVE", "ARCHIVED"]),
  productImage: z.string().min(1).optional(),
  categoryId: z.string(),
  // sizeId: z.string().optional(),
  // colorId: z.string().optional(),
  // volumeId: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  variants: z
    .array(
      z.object({
        sizeId: z.string().optional(),
        colorId: z.string().optional(),
        volumeId: z.string().optional(),
        sku: z.string().optional(),
      })
    )
    .optional(),
  components: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.coerce.number().min(1),
      })
    )
    .optional(),
});

interface ProductFormProps {
  agency?: {
    categories?: Category[];
    products?: Product[];
    sizes?: Size[];
    colors?: Color[];
    volumes?: Volume[];
    SubAccount?: SubAccount[];
  } & Agency;
  productData?:
    | ({
        productVariants: ProductVariant[];
        category: Category;
        compositeComponents: CompositeProduct[];
      } & Product)
    | null;
}

export function ProductForm({ agency, productData }: ProductFormProps) {
  const searchParams = useSearchParams();
  const productType = searchParams.get("type") as
    | "simple"
    | "variant"
    | "composite"
    | null;

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: productData?.productName || "",
      description: productData?.description || "",
      sku: productData?.sku || "",
      productType: productData?.productType || "SIMPLE",
      productStatus: productData?.productStatus || "ACTIVE",
      productImage: productData?.productImage || "",
      categoryId: productData?.categoryId || "",
      // sizeId: productData?.sizeId || "",
      // colorId: productData?.colorId || "",
      // volumeId: productData?.volumeId || "",
      price: undefined,
      quantity: undefined,
      variants: productData?.productVariants?.length
        ? productData?.productVariants.map((variant) => ({
            sku: variant?.sku || "",
            sizeId: variant?.sizeId || "",
            colorId: variant?.colorId || "",
            volumeId: variant?.volumeId || "",
          }))
        : [] || [],
      components: productData?.compositeComponents?.length
        ? productData?.compositeComponents.map((component) => ({
            productId: component?.componentProductId,
            quantity: component?.quantity,
          }))
        : [] || [],
    },
  });

  const isLoading = form.formState.isSubmitting;

  const variants = form.watch("variants") || [];
  const components = form.watch("components") || [];

  const AgencyCategories = agency?.categories || [];

  const AgencySizes = agency?.sizes || [];

  const AgencyColors = agency?.colors || [];

  const AgencyVolumes = agency?.volumes || [];

  const AgencyProducts = agency?.products || [];

  const handleAddVariants = () => {
    form.setValue("variants", [
      ...variants,
      {
        colorId: "",
        sizeId: "",
        volumeId: "",
      },
    ]);
  };

  const handleAddComponents = () => {
    form.setValue("components", [
      ...components,
      { quantity: 0, productId: "" },
    ]);
  };

  const handleDeleteVariant = (index: number) => {
    form.setValue(
      "variants",
      variants.filter((_, i) => i !== index)
    );
  };
  const handleDeleteComponent = (index: number) => {
    form.setValue(
      "components",
      components.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // Submit the form data to the server
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-center gap-4 mb-1">
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    className="h-7 w-7"
                    onClick={() => router.back()}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Button>
                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Product Form
                  </h1>
                  <Badge variant="outline" className="ml-auto sm:ml-0">
                    In stock
                  </Badge>
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    {/* <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.refresh()}
                      type="button"
                    >
                      Discard
                    </Button> */}
                    <Button size="sm" type="submit">
                      Save Product
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                      <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                        <CardDescription>
                          Add or update product information
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="productName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-semibold">
                                    Name
                                    <span className="text-red-500">*</span>
                                  </FormLabel>{" "}
                                  <FormControl>
                                    <Input
                                      disabled={isLoading}
                                      placeholder="Product Name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-semibold">
                                    Description
                                  </FormLabel>{" "}
                                  <FormControl>
                                    <Textarea
                                      disabled={isLoading}
                                      className="min-h-32"
                                      placeholder="Product Name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              disabled={isLoading}
                              control={form.control}
                              name="categoryId"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormLabel>Category</FormLabel>
                                  <ProductOptionsSelect
                                    onChange={field.onChange}
                                    value={field.value}
                                    data={AgencyCategories}
                                    type="category"
                                    agency={agency as Agency}
                                  />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {productType === "variant" && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Variants</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Size</TableHead>
                                <TableHead>Color</TableHead>
                                <TableHead>Volume</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {variants.map((field, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    <FormField
                                      disabled={isLoading}
                                      control={form.control}
                                      name={`variants.${index}.sizeId`}
                                      render={({ field }) => (
                                        <FormItem className="">
                                          <FormLabel>Size</FormLabel>
                                          <ProductOptionsSelect
                                            onChange={field.onChange}
                                            value={field.value || ""}
                                            data={AgencySizes}
                                            type="size"
                                            agency={agency as Agency}
                                          />
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <FormField
                                      disabled={isLoading}
                                      control={form.control}
                                      name={`variants.${index}.colorId`}
                                      render={({ field }) => (
                                        <FormItem className="">
                                          <FormLabel>Color</FormLabel>
                                          <ProductOptionsSelect
                                            onChange={field.onChange}
                                            value={field.value || ""}
                                            data={AgencyColors}
                                            type="color"
                                            agency={agency as Agency}
                                          />
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    {/* <FormField
                                      disabled={form.formState.isSubmitting}
                                      control={form.control}
                                      name={`variants.${index}.colorId`}
                                      render={({ field }) => (
                                        <FormItem className="">
                                          <FormLabel>Color</FormLabel>
                                          <Select
                                            onValueChange={(value) => {
                                              field.onChange(value);
                                            }}
                                            defaultValue={field.value}
                                          >
                                            <FormControl>
                                              <SelectTrigger>
                                                <SelectValue placeholder="color..." />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              <SelectItem value="red">
                                                Red
                                              </SelectItem>
                                              <SelectItem value="green">
                                                Green
                                              </SelectItem>
                                              <SelectItem value="blue">
                                                Blue
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </FormItem>
                                      )}
                                    /> */}
                                  </TableCell>

                                  <TableCell>
                                    <FormField
                                      disabled={isLoading}
                                      control={form.control}
                                      name={`variants.${index}.volumeId`}
                                      render={({ field }) => (
                                        <FormItem className="">
                                          <FormLabel>Volume</FormLabel>
                                          <ProductOptionsSelect
                                            onChange={field.onChange}
                                            value={field.value || ""}
                                            data={AgencyVolumes}
                                            type="volume"
                                            agency={agency as Agency}
                                          />
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </TableCell>
                                  <TableCell className="">
                                    <div className="mt-6">
                                      <Button
                                        variant="outline"
                                        type="button"
                                        size="sm"
                                        onClick={() =>
                                          handleDeleteVariant(index)
                                        }
                                        className=""
                                      >
                                        <Trash className="size-4 mr-2" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          <Button
                            variant="secondary"
                            onClick={handleAddVariants}
                            type="button"
                          >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Variant
                          </Button>
                        </CardContent>
                      </Card>
                    )}

                    {productType === "composite" && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Components</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {components.map((field, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    {/* <FormField
                                      disabled={form.formState.isSubmitting}
                                      control={form.control}
                                      name={`components.${index}.productId`}
                                      render={({ field }) => (
                                        <FormItem className="">
                                          <FormLabel>Product</FormLabel>
                                          <Select
                                            onValueChange={(value) => {
                                              field.onChange(value);
                                            }}
                                            defaultValue={field.value}
                                          >
                                            <FormControl>
                                              <SelectTrigger>
                                                <SelectValue placeholder="product.." />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              <SelectItem value="Biscuit">
                                                Biscuit
                                              </SelectItem>
                                              <SelectItem value="Bonbon">
                                                Bonbon
                                              </SelectItem>
                                              <SelectItem value="chocolat">
                                                Chocolat
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </FormItem>
                                      )}
                                    /> */}
                                    <FormField
                                      disabled={isLoading}
                                      control={form.control}
                                      name={`components.${index}.productId`}
                                      render={({ field }) => (
                                        <FormItem className="">
                                          <FormLabel>Product</FormLabel>
                                          <ProductOptionsSelect
                                            onChange={field.onChange}
                                            value={field.value || ""}
                                            data={AgencyProducts}
                                            type="product"
                                            agency={agency as Agency}
                                          />
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </TableCell>

                                  <TableCell>
                                    <FormField
                                      control={form.control}
                                      name={`components.${index}.quantity`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>
                                            Quantity
                                            <span className="text-red-500">
                                              *
                                            </span>
                                          </FormLabel>{" "}
                                          <FormControl>
                                            <Input
                                              disabled={isLoading}
                                              placeholder="Product Name"
                                              type="number"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </TableCell>

                                  <TableCell className="">
                                    <div className="mt-6">
                                      <Button
                                        variant="outline"
                                        type="button"
                                        size="sm"
                                        onClick={() =>
                                          handleDeleteComponent(index)
                                        }
                                        className=""
                                      >
                                        <Trash className="size-4 mr-2" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                                // </div>
                              ))}
                            </TableBody>
                          </Table>
                          <Button
                            variant="secondary"
                            onClick={handleAddComponents}
                            type="button"
                          >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Variant
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-3">
                      <CardHeader>
                        <CardTitle>Product Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              disabled={form.formState.isSubmitting}
                              control={form.control}
                              name="productStatus"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormLabel>Status</FormLabel>
                                  <Select
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                    }}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select product status..." />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="ACTIVE">
                                        Active
                                      </SelectItem>
                                      <SelectItem value="ARCHIVED">
                                        Archived
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card
                      className="overflow-hidden"
                      x-chunk="dashboard-07-chunk-4"
                    >
                      <CardHeader>
                        <CardTitle>Product Images</CardTitle>
                        <CardDescription>
                          Add a image to your product
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <FormField
                            disabled={isLoading}
                            control={form.control}
                            name="productImage"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Product Image</FormLabel>
                                <FormControl>
                                  <FileUpload
                                    onChange={field.onChange}
                                    value={field.value}
                                    label="Insert a logo"
                                    disabled={isLoading}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    {/* <Card x-chunk="dashboard-07-chunk-5">
                      <CardHeader>
                        <CardTitle>Archive Product</CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div></div>
                        <Button size="sm" variant="secondary">
                          Archive Product
                        </Button>
                      </CardContent>
                    </Card> */}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                  {/* <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => router.back()}
                  >
                    Discard
                  </Button> */}
                  <Button size="sm" type="submit">
                    Save Product
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
}
