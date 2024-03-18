// Products.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { faker } from "@faker-js/faker";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/productsColumn";

interface CollectionType {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
}

interface ProductType {
  _id: string;
  title: string;
  description: string;
  media: string[];
  category: string;
  collections: CollectionType[];
  tags: string[];
  sizes: string[];
  colors: string[];
  price: number;
  expense: number;
  createdAt: Date;
  updatedAt: Date;
}
const colors = ["Red", "Blue", "Green", "Yellow", "Black", "White"];

function getRandomColors(): string[] {
  // Shuffle the array
  const shuffledColors = colors.sort(() => 0.5 - Math.random());

  // Return the first three elements from the shuffled array
  return shuffledColors.slice(0, 3);
}

// Example usage
const randomColors = getRandomColors();
console.log(randomColors);

const Products = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  const simulateLoading = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const generateFakeCollection = (): CollectionType => ({
    _id: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    image: faker.image.imageUrl(),
    products: [],
  });

  const generateFakeProduct = (): ProductType => ({
    _id: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    media: Array.from(
      { length: faker.datatype.number({ min: 1, max: 3 }) },
      () => faker.image.imageUrl()
    ),
    category: faker.commerce.department(),
    collections: Array.from(
      { length: faker.datatype.number({ min: 1, max: 3 }) },
      generateFakeCollection
    ),
    tags: Array.from(
      { length: faker.datatype.number({ min: 1, max: 5 }) },
      () => faker.commerce.productAdjective()
    ),
    sizes: ["S", "M", "L", "XL"],
    colors: getRandomColors(),
    price: parseFloat(faker.commerce.price()),
    expense: parseFloat(faker.commerce.price()),
    createdAt: new Date(faker.date.past()),
    updatedAt: new Date(faker.date.recent()),
  });

  const getProducts = async () => {
    try {
      await simulateLoading(4000); // Simulate loading for 2 seconds
      const fakeProducts = Array.from({ length: 100 }, generateFakeProduct); // Generate 10 fake products
      setProducts(fakeProducts);
      setLoading(false);
    } catch (err) {
      console.error("[products_GET]", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return loading ? (
    <div className="container">
      <Loader />
    </div>
  ) : (
    <div className="px-10 py-5 bg-black">
      <div className="flex items-center justify-between">
        <p className=" font-extrabold text-xl text-white">Products</p>
        <Button
          className="bg-blue-1 hover:bg-orange-500 text-white font-medium"
          onClick={() => router.push("/products/new")}
        >
          <Plus className="h-4 w-4 mr-2 text-white " />
          Create Product
        </Button>
      </div>
      <Separator className="bg-neutral-900 my-4" />
      <DataTable columns={columns} data={products} searchKey="title" />
    </div>
  );
};

export default Products;
