import { faker } from "@faker-js/faker";
import { db } from "@/lib/db";
import {
  products,
  productImages,
  ProductCategory,
  ProductType,
  ProductStatus,
  ProductOwner,
  ProductOwnerEnum,
} from "@/lib/db/schema/all-schema";
import { createId } from "@paralleldrive/cuid2";

export async function createRandomProducts(userId: string) {
  const productCategories = Object.values(ProductCategory.enumValues);
  const productTypes = Object.values(ProductType.enumValues);
  const productStatuses = Object.values(ProductStatus.enumValues);

  for (let i = 0; i < 30; i++) {
    const productId = createId();

    const images = Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      () => ({
        id: createId(),
        url: faker.image.url(),
        productId,
      }),
    );

    const product = {
      id: productId,
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      videoUrl: JSON.stringify(
        Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () =>
          faker.internet.url(),
        ),
      ),
      category: faker.helpers.arrayElement(productCategories),
      categories: JSON.stringify(
        faker.helpers.arrayElements(productCategories, {
          min: 1,
          max: 3,
        }),
      ),
      tags: JSON.stringify(
        Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
          faker.lorem.word(),
        ),
      ),
      productOwner: ProductOwnerEnum.admin,
      price: parseFloat(faker.commerce.price()),
      discountPercentage: faker.number.int({ min: 0, max: 50 }),
      productType: faker.helpers.arrayElement(productTypes),
      jsonDetails: JSON.stringify(
        Array.from({ length: 5 }, () => ({
          title: faker.lorem.sentence(),
          shortDescriptions: Array.from(
            { length: faker.number.int({ min: 1, max: 5 }) },
            () => faker.lorem.sentence(),
          ),
        })),
      ),
      status: faker.helpers.arrayElement(productStatuses),
      userId,
    };

    await db.insert(products).values(product);
    await db.insert(productImages).values(images);

    console.log(`Created product with id: ${productId}`);
  }
}
