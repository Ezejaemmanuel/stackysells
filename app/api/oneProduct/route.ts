import { getUserAuth } from "@/lib/auth/utils";
import { CreateProductInput } from "@/lib/tenstack-hooks/useCreateProduct";
import { Product, ProductOwner } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getProductById } from "./aside";

export async function POST(request: NextRequest) {
  const input = (await request.json()) as CreateProductInput;
  const { session } = await getUserAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("Received POST request to create/upsert product:", input);

  const {
    id,
    title,
    description,
    images,
    category,
    categories,
    tags,
    price,
    discountPercentage,
    productType,
    status,
    jsonDetails,
  } = input;

  const parsedJsonDetails = JSON.parse(jsonDetails);

  try {
    let product;

    if (id === "noId") {
      // Create a new product
      product = await prisma.product.create({
        data: {
          title,
          description,
          category,
          categories,
          tags,
          price,
          discountPercentage,
          productType,
          status,
          jsonDetails: parsedJsonDetails,
          userId: session.user.id,
          productOwner: ProductOwner.admin,
          images: {
            connectOrCreate: images.map((image) => ({
              where: { id: image.id },
              create: { id: image.id, url: image.url },
            })),
          },
        },
      });
    } else {
      // Upsert the product
      product = await prisma.product.upsert({
        where: { id },
        update: {
          title,
          description,
          category,
          categories,
          tags,
          price,
          discountPercentage,
          productType,
          status,
          jsonDetails: parsedJsonDetails,
          images: {
            connectOrCreate: images.map((image) => ({
              where: { id: image.id },
              create: { id: image.id, url: image.url },
            })),
          },
        },
        create: {
          id,
          title,
          description,
          category,
          categories,
          tags,
          price,
          discountPercentage,
          productType,
          status,
          jsonDetails: parsedJsonDetails,
          userId: session.user.id,
          productOwner: ProductOwner.admin,
          images: {
            connectOrCreate: images.map((image) => ({
              where: { id: image.id },
              create: { id: image.id, url: image.url },
            })),
          },
        },
      });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to create/update product:", error);
    return NextResponse.json(
      { error: "Failed to create/update product" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 },
    );
  }

  try {
    const product = await getProductById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}
