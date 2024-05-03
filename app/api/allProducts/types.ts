
// import {
//   Prisma,
//   ProductCategory,
//   ProductStatus,
//   ProductType,
//   ProductOwner,
// } from "@prisma/client";
import {
  ProductStatusEnum,
  ProductCategoryEnum,
  ProductTypeEnum,
  ProductOwnerEnum,
} from "@/lib/db/schema/all-schema";

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
  category: typeof ProductCategoryEnum[];
  tags: string[];
  price: number;
  createdAt: Date;
  updatedAt: Date;
  imagesUrl: string[];
  userId: string;
  videoUrl: string[];
  categories:typeof ProductCategoryEnum[];
  discountPercentage: number;
  jsonDetails: any[];
  productOwner:typeof ProductOwnerEnum;
  productType:typeof ProductTypeEnum;
  status:typeof ProductStatusEnum;
  wishlistedById: string | null;
}

export interface ProductsResponse {
  products: ProductResponse[];
  totalPages: number;
}
