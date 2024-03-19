import { faker } from "@faker-js/faker";
import {
  PrismaClient,
  ProductCategory,
  ProductType,
  ProductStatus,
  Prisma,
} from "@prisma/client";
import { prisma } from "@/lib/db";

export async function createRandomProducts(userId: string) {
  const productCategories = Object.values(ProductCategory);
  const productTypes = Object.values(ProductType);
  const productStatuses = Object.values(ProductStatus);

  for (let i = 0; i < 20; i++) {
    const product = await prisma.product.create({
      data: {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        imagesUrl: Array.from(
          { length: faker.number.int({ min: 1, max: 5 }) },
          () => faker.image.url(),
        ),
        videoUrl: Array.from(
          { length: faker.number.int({ min: 0, max: 2 }) },
          () => faker.internet.url(),
        ),
        category: faker.helpers.arrayElement(productCategories),
        categories: faker.helpers.arrayElements(productCategories, {
          min: 1,
          max: 3,
        }),
        tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
          faker.lorem.word(),
        ),
        price: parseFloat(faker.commerce.price()),
        discountPercentage: faker.number.int({ min: 0, max: 50 }),
        productType: faker.helpers.arrayElement(productTypes),
        jsonDetails: Array.from({ length: 5 }, () => ({
          title: faker.lorem.sentence(),
          shortDescriptions: Array.from(
            { length: faker.number.int({ min: 1, max: 5 }) },
            () => faker.lorem.sentence(),
          ),
        })),
        status: faker.helpers.arrayElement(productStatuses),
        userId,
      },
    });

    console.log(`Created product with id: ${product.id}`);
  }
}
