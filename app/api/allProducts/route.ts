import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  Prisma,
  ProductCategory,
  ProductStatus,
  ProductType,
  ProductOwner,
} from "@prisma/client";
import { SortOption } from "./types";
import { CreateProductInput } from "@/lib/tenstack-hooks/useCreateProduct";
import { getUserAuth } from "@/lib/auth/utils";

export async function GET(req: NextRequest) {
  console.log("Received GET request for products API");
  const { searchParams } = req.nextUrl;
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const sort =
    (searchParams.get("sort") as SortOption) || SortOption.CreatedAtDesc;
  // const order = searchParams.get("order") || "desc";
  const search = searchParams.get("search") || "";
  const statusFilter = searchParams.get("statusFilter") || "";
  const categoryFilter = searchParams.get("categoryFilter") || "";
  const productTypeFilter = searchParams.get("productTypeFilter") || "";
  const productOwnerFilter = searchParams.get("productOwnerFilter") || "";

  // console.log(
  //   `Query parameters: page=${page}, limit=${limit}, sort=${sort}, order=${order}, search=${search}`,
  // );

  try {
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);
    const skip = (pageNumber - 1) * pageSize;

    console.log(
      `Calculated pagination: pageNumber=${pageNumber}, pageSize=${pageSize}, skip=${skip}`,
    );

    let statusWhereCondition: ProductStatus | undefined;
    if (statusFilter) {
      statusWhereCondition = statusFilter as ProductStatus;
    }

    let categoryWhereCondition: ProductCategory | undefined;
    if (categoryFilter) {
      categoryWhereCondition = categoryFilter as ProductCategory;
    }

    let productTypeWhereCondition: ProductType | undefined;
    if (productTypeFilter) {
      productTypeWhereCondition = productTypeFilter as ProductType;
    }

    let productOwnerWhereCondition: ProductOwner | undefined;
    if (productOwnerFilter) {
      productOwnerWhereCondition = productOwnerFilter as ProductOwner;
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput;
    // console.log("Sorting by:", sort, order);
    switch (sort) {
      case SortOption.TitleAsc:
        orderBy = { title: "asc" };
        break;
      case SortOption.TitleDesc:
        orderBy = { title: "desc" };
        break;
      case SortOption.PriceAsc:
        orderBy = { price: "asc" };
        break;
      case SortOption.PriceDesc:
        orderBy = { price: "desc" };
        break;
      case SortOption.CreatedAtAsc:
        orderBy = { updatedAt: "asc" };
        break;
      case SortOption.CreatedAtDesc:
        orderBy = { updatedAt: "desc" };
        break;
      default:
        orderBy = { updatedAt: "desc" }; // Default sort option
    }

    console.log("Fetching products from database...");
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          // Add other searchable fields if needed
        ],

        status: statusWhereCondition,
        category: categoryWhereCondition,
        productType: productTypeWhereCondition,
        productOwner: productOwnerWhereCondition,
      },
      take: pageSize,
      skip: skip,
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        tags: true,
        price: true,
        createdAt: true,
        updatedAt: true,
        images: true,
        userId: true,
        videoUrl: true,
        categories: true,
        discountPercentage: true,
        jsonDetails: true,
        productOwner: true,
        productType: true,
        status: true,
        wishlistedById: true,
      },
    });

    console.log("Products fetched:", products);

    console.log("Counting total products for pagination...");
    const totalProducts = await prisma.product.count({
      where: {
        OR: [{ title: { contains: search, mode: "insensitive" } }],
        status: statusWhereCondition,
        category: categoryWhereCondition,
        productType: productTypeWhereCondition,
        productOwner: productOwnerWhereCondition,
      },
    });
    // console.log("Total products:", totalProducts);

    const totalPages = Math.ceil(totalProducts / pageSize);
    // console.log("Total pages:", totalPages);

    // console.log("Sending response with products and total pages...");
    return NextResponse.json({ products, totalPages });
  } catch (error) {
    console.error("Error occurred while fetching products:", error);
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }
    console.log("Sending error response...");
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// app/api/products/route.ts

export async function DELETE(nextRequest: NextRequest) {
  const { searchParams } = new URL(nextRequest.url);
  const productId = searchParams.get("id");
  console.log("Received DELETE request for product with ID:", productId);
  if (!productId) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 },
    );
  }

  try {
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}

// interface CreateProductInput {
//   id: string;
//   title: string;
//   description: string;
//   imagesUrl: string[];
//   category: ProductCategory;
//   categories: ProductCategory[];
//   tags: string[];
//   price: number;
//   discountPercentage: number;
//   productType: ProductType;
//   status: ProductStatus;
//   jsonDetails: string;
// }
