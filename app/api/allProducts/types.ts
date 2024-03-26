import {
  Prisma,
  ProductCategory,
  ProductStatus,
  ProductType,
  ProductOwner,
} from "@prisma/client";

export enum SortOption {
  TitleAsc = "titleAsc",
  TitleDesc = "titleDesc",
  PriceAsc = "priceAsc",
  PriceDesc = "priceDesc",
  CreatedAtAsc = "createdAtAsc",
  CreatedAtDesc = "createdAtDesc",
}

export interface ProductResponse {
  id: string;
  title: string;
  description: string;
  category: ProductCategory[];
  tags: string[];
  price: number;
  createdAt: Date;
  updatedAt: Date;
  imagesUrl: string[];
  userId: string;
  videoUrl: string[];
  categories: ProductCategory[];
  discountPercentage: number;
  jsonDetails: any[];
  productOwner: ProductOwner;
  productType: ProductType;
  status: ProductStatus;
  wishlistedById: string | null;
}

export interface ProductsResponse {
  products: ProductResponse[];
  totalPages: number;
}
