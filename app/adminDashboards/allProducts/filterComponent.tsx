// FilterForm.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ProductCategory,
  ProductOwner,
  ProductStatus,
  ProductType,
} from "@prisma/client";
import { useDataTableStore } from "@/lib/zustandStore";

interface FilterFormProps {
  setIsOpen: (open: boolean) => void;
  className?: string;
}

const productStatusOptions = Object.values(ProductStatus);
const productCategoryOptions = Object.values(ProductCategory);
const productTypeOptions = Object.values(ProductType);
const productOwnerOptions = Object.values(ProductOwner);

export function FilterForm({ setIsOpen, className }: FilterFormProps) {
  const {
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    productTypeFilter,
    setProductTypeFilter,
    productOwnerFilter,
    setProductOwnerFilter,
  } = useDataTableStore();

  const [selectedStatusFilter, setSelectedStatusFilter] =
    useState(statusFilter);
  const [selectedCategoryFilter, setSelectedCategoryFilter] =
    useState(categoryFilter);
  const [selectedProductTypeFilter, setSelectedProductTypeFilter] =
    useState(productTypeFilter);
  const [selectedProductOwnerFilter, setSelectedProductOwnerFilter] =
    useState(productOwnerFilter);

  const handleFilter = () => {
    setStatusFilter(selectedStatusFilter);
    setCategoryFilter(selectedCategoryFilter);
    setProductTypeFilter(selectedProductTypeFilter);
    setProductOwnerFilter(selectedProductOwnerFilter);
    setIsOpen(false);
  };

  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            defaultValue={selectedStatusFilter}
            onValueChange={(value) => {
              if (value === "all") {
                setSelectedStatusFilter("");
              } else {
                setSelectedStatusFilter(value as ProductStatus);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {productStatusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            defaultValue={selectedCategoryFilter}
            onValueChange={(value) => {
              if (value === "all") {
                setSelectedCategoryFilter("");
              } else {
                setSelectedCategoryFilter(value as ProductCategory);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {productCategoryOptions.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="productType">Product Type</Label>
          <Select
            defaultValue={selectedProductTypeFilter}
            onValueChange={(value) => {
              if (value === "all") {
                setSelectedProductTypeFilter("");
              } else {
                setSelectedProductTypeFilter(value as ProductType);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select product type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {productTypeOptions.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="productOwner">Product Owner</Label>
          <Select
            defaultValue={selectedProductOwnerFilter}
            onValueChange={(value) => {
              if (value === "all") {
                setSelectedProductOwnerFilter("");
              } else {
                setSelectedProductOwnerFilter(value as ProductOwner);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select product owner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {productOwnerOptions.map((owner) => (
                <SelectItem key={owner} value={owner}>
                  {owner}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button onClick={handleFilter}>Filter</Button>
      </div>
    </div>
  );
}
