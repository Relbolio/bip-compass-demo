"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Variant = {
  sku: string;
  stock: number;
  price: number;
};

type Component = {
  id: string;
  quantity: number;
};

export function ProductTest() {
  const [productType, setProductType] = useState("SIMPLE");
  const [variants, setVariants] = useState([{ sku: "", stock: 0, price: 0 }]);
  const [components, setComponents] = useState([{ id: "", quantity: 0 }]);

  // const handleVariantChange = (index, field, value) => {
  //   const newVariants = [...variants];
  //   newVariants[index][field] = value;
  //   setVariants(newVariants);
  // };

  const handleVariantChange = (
    index: number,
    field: keyof Variant,
    value: string | number
  ) => {
    setVariants((prevVariants) => {
      const newVariants = [...prevVariants];
      newVariants[index] = {
        ...newVariants[index],
        [field]: value,
      };
      return newVariants;
    });
  };
  const handleComponentChange = (
    index: number,
    field: keyof Component,
    value: string | number
  ) => {
    setComponents((prevComponents) => {
      const newComponents = [...prevComponents];
      newComponents[index] = {
        ...newComponents[index],
        [field]: value,
      };
      return newComponents;
    });
  };
  // const handleComponentChange = (index, field, value) => {
  //   const newComponents = [...components];
  //   newComponents[index][field] = value;
  //   setComponents(newComponents);
  // };

  const addVariant = () => {
    setVariants([...variants, { sku: "", stock: 0, price: 0 }]);
  };

  const addComponent = () => {
    setComponents([...components, { id: "", quantity: 0 }]);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Pro Controller
              </h1>
              <Badge variant="outline" className="ml-auto sm:ml-0">
                In stock
              </Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button size="sm">Save Product</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      Fill in the product details below
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" className="w-full" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" className="min-h-32" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="productType">Product Type</Label>
                        <Select onValueChange={setProductType}>
                          <SelectTrigger id="productType">
                            <SelectValue placeholder="Select product type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SIMPLE">Simple</SelectItem>
                            <SelectItem value="VARIANT">Variant</SelectItem>
                            <SelectItem value="COMPOSITE">Composite</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {productType === "VARIANT" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Variants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>SKU</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {variants.map((variant, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Input
                                  value={variant.sku}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      index,
                                      "sku",
                                      e.target.value
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={variant.stock}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      index,
                                      "stock",
                                      e.target.value
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={variant.price}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      index,
                                      "price",
                                      e.target.value
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    setVariants(
                                      variants.filter((_, i) => i !== index)
                                    )
                                  }
                                >
                                  Remove
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <CardFooter className="justify-center border-t p-4">
                        <Button size="sm" variant="ghost" onClick={addVariant}>
                          <PlusCircle className="h-3.5 w-3.5" />
                          Add Variant
                        </Button>
                      </CardFooter>
                    </CardContent>
                  </Card>
                )}

                {productType === "COMPOSITE" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Components</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Component ID</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {components.map((component, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Input
                                  value={component.id}
                                  onChange={(e) =>
                                    handleComponentChange(
                                      index,
                                      "id",
                                      e.target.value
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={component.quantity}
                                  onChange={(e) =>
                                    handleComponentChange(
                                      index,
                                      "quantity",
                                      e.target.value
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    setComponents(
                                      components.filter((_, i) => i !== index)
                                    )
                                  }
                                >
                                  Remove
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <CardFooter className="justify-center border-t p-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={addComponent}
                        >
                          <PlusCircle className="h-3.5 w-3.5" />
                          Add Component
                        </Button>
                      </CardFooter>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <Button variant="outline" size="sm" className="w-full">
                Discard
              </Button>
              <Button size="sm" className="w-full">
                Save Product
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
