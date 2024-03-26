// useCreateProduct.ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProductCategory, ProductStatus, ProductType } from "@prisma/client";
import { addBaseURL } from "../addBaseUrl";
import { ImageData } from "@/app/adminDashboards/_components/productForm_v2";
export interface CreateProductInput {
  id: string;
  title: string;
  description: string;
  images: ImageData[];
  category: ProductCategory;
  categories: ProductCategory[];
  tags: string[];
  price: number;
  discountPercentage: number;
  productType: ProductType;
  status: ProductStatus;
  jsonDetails: string;
}

const createProduct = async (input: CreateProductInput) => {
  const url = addBaseURL("/api/oneProduct");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return response.json();
};

export const useCreateProduct = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: createProduct,
    mutationKey: ["createProduct"],
  });
};
