"use server";
import { prisma } from "../db";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function deleteProductImageAndFile(
  imageId: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const [deleteImageResult, deleteFileResult] = await Promise.all([
      prisma.productImage.delete({
        where: {
          id: imageId,
        },
      }),
      utapi.deleteFiles(imageId),
    ]);

    console.log("Product image and file deleted successfully");
    return {
      success: true,
      message: "Product image and file deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting product image or file:", error);
    return { success: false, message: "Error deleting product image or file" };
  }
}

interface ProductImageInput {
  url: string;
  id: string;
}

export async function addProductImage(
  imageInput: ProductImageInput,
  productId: string,
): Promise<void> {
  if (productId === "noId") {
    console.log("Product ID is 'noId'. Skipping image upsert.");
    return;
  }

  try {
    await prisma.productImage.upsert({
      where: {
        id: imageInput.id,
      },
      update: {
        url: imageInput.url,
        productId: productId,
      },
      create: {
        id: imageInput.id,
        url: imageInput.url,
        productId: productId,
      },
    });
    console.log("Product image upserted successfully.");
  } catch (error) {
    console.error("Error upserting product image:", error);
  }
}
