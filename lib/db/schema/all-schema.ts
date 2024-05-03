import {
  pgTable,
  text,
  doublePrecision,
  timestamp,
  uniqueIndex,
  jsonb,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

export const UserRole = pgEnum("UserRole", [
  "Buyer",
  "OneTimeSeller",
  "ContinuousSeller",
  "Admin",
  "SuperAdmin",
]);
export const UserRoleEnum = z.enum(UserRole.enumValues).Enum;

export const ProductCategory = pgEnum("ProductCategory", [
  "Clothing",
  "Housing",
  "Electronics",
  "BeautyHealth",
  "Sports",
  "Toys",
  "Books",
  "Cleaning",
  "Tutoring",
  "Repair",
  "PersonalTraining",
  "Photography",
  "Catering",
  "EventPlanning",
]);
export const ProductCategoryEnum = z.enum(ProductCategory.enumValues).enum;

export const ProductStatus = pgEnum("ProductStatus", [
  "created",
  "onSale",
  "soldOut",
  "suspendedByAdmin",
  "suspendedBySeller",
  "shouldBeDeleted",
]);
export const ProductStatusEnum = z.enum(ProductStatus.enumValues).enum;

export const ProductType = pgEnum("ProductType", ["goods", "services"]);
export const ProductTypeEnum = z.enum(ProductType.enumValues).enum;


export const ProductOwner = pgEnum("ProductOwner", [
  "admin",
  "permanentSellers",
]);
export const ProductOwnerEnum = z.enum(ProductOwner.enumValues).Enum;

export const users = pgTable(
  "User",
  {
    id: text("id").primaryKey().default(createId()),
    role: UserRole("role").notNull(),
    createdAt: timestamp("createdAt")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updatedAt")
      .notNull()
      .default(sql`now()`),
    email: text("email").notNull(),
    firstName: text("firstName"),
    userName: text("userName"),
    fullName: text("fullName"),
    imageUrl: text("imageUrl"),
  },
  (users) => ({
    emailIndex: uniqueIndex("User_email_key").on(users.email),
  }),
);

export const products = pgTable("Product", {
  id: text("id").primaryKey().default(createId()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: ProductCategory("category").notNull(),
  tags: jsonb("tags").notNull(),
  price: doublePrecision("price").notNull(),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`now()`),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  videoUrl: jsonb("videoUrl").notNull(),
  categories: jsonb("categories").notNull(),
  discountPercentage: doublePrecision("discountPercentage").notNull(),
  jsonDetails: jsonb("jsonDetails").notNull(),
  productOwner: ProductOwner("productOwner").notNull(),
  productType: ProductType("productType").notNull(),
  status: ProductStatus("status").notNull(),
  wishlistedById: text("wishlistedById").references(() => users.id),
});

export const productImages = pgTable("ProductImage", {
  id: text("id").primaryKey().default(createId()),
  url: text("url").notNull(),
  productId: text("productId")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
});

export const orders = pgTable("Order", {
  id: text("id").primaryKey().default(createId()),
  shippingAddress: jsonb("shippingAddress").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  shippingRate: text("shippingRate").notNull(),
  totalAmount: doublePrecision("totalAmount").notNull(),
});

export const orderItems = pgTable("OrderItem", {
  id: text("id").primaryKey().default(createId()),
  productId: text("productId")
    .notNull()
    .references(() => products.id),
  color: text("color").notNull(),
  size: text("size").notNull(),
  quantity: integer("quantity").notNull(),
  orderId: text("orderId").references(() => orders.id),
});

// Generate TypeScript types using Zod
export const userSchema = createSelectSchema(users);
export type User = z.infer<typeof userSchema>;

export const productSchema = createSelectSchema(products);
export type Product = z.infer<typeof productSchema>;

export const productImageSchema = createSelectSchema(productImages);
export type ProductImage = z.infer<typeof productImageSchema>;

export const orderSchema = createSelectSchema(orders);
export type Order = z.infer<typeof orderSchema>;

export const orderItemSchema = createSelectSchema(orderItems);
export type OrderItem = z.infer<typeof orderItemSchema>;
