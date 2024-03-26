import { prisma } from "@/lib/db";
import { Product, ProductImage } from "@prisma/client";

export async function getProductById(
  id: string | null,
): Promise<(Product & { images: ProductImage[] }) | null> {
  if (!id) return null;
  return await prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
    },
  });
}
