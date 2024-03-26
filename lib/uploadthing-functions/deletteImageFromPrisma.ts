// import { prisma } from "../db";
// export async function deleteProductImage(imageId: string): Promise<void | null> {
//   try {
//     // Delete the product image
//     await prisma.productImage.delete({
//       where: {
//         id: imageId,
//       },
//     });

//     console.log("Product image deleted successfully");
//   } catch (error) {
//     console.error("Error deleting product image:", error);
//     return null;
//   } finally {
//     await prisma.$disconnect();
//   }
// }
