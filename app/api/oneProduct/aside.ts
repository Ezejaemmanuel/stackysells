import { eq } from "drizzle-orm/expressions";
import { products, productImages } from "@/lib/db/schema/all-schema";
import { db } from "@/lib/db/index";
import {
  Product,
  ProductImage,
  ProductCategory,
  ProductOwner,
  ProductType,
  ProductStatus,
} from "@/lib/db/schema/all-schema";

export type ProductWithImages = Product & {
  images:  ProductImage[];
};

export async function getProductById(
  id: string | null,
): Promise<ProductWithImages | null> {
  if (!id) return null;

  const result = await db
    .select({
      id: products.id,
      title: products.title,
      description: products.description,
      category: products.category,
      tags: products.tags,
      price: products.price,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
      userId: products.userId,
      videoUrl: products.videoUrl,
      categories: products.categories,
      discountPercentage: products.discountPercentage,
      jsonDetails: products.jsonDetails,
      productOwner: products.productOwner,
      productType: products.productType,
      status: products.status,
      wishlistedById: products.wishlistedById,
      images: productImages,
    })
    .from(products)
    .leftJoin(productImages, eq(products.id, productImages.productId))
    .where(eq(products.id, id));

  if (result.length === 0) {
    return null; // Product not found
  }

  const product = result[0] as Product & { images: ProductImage[] | null };
  return {
    ...product,
    images: product.images || [],
  };
}
