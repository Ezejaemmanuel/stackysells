DO $$ BEGIN
 CREATE TYPE "ProductCategory" AS ENUM('Clothing', 'Housing', 'Electronics', 'BeautyHealth', 'Sports', 'Toys', 'Books', 'Cleaning', 'Tutoring', 'Repair', 'PersonalTraining', 'Photography', 'Catering', 'EventPlanning');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "ProductOwner" AS ENUM('admin', 'permanentSellers');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "ProductStatus" AS ENUM('created', 'onSale', 'soldOut', 'suspendedByAdmin', 'suspendedBySeller', 'shouldBeDeleted');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "ProductType" AS ENUM('goods', 'services');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "UserRole" AS ENUM('Buyer', 'OneTimeSeller', 'ContinuousSeller', 'Admin', 'SuperAdmin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "OrderItem" (
	"id" text PRIMARY KEY DEFAULT 'nurrg17jkz4oshicbufipx3v' NOT NULL,
	"productId" text NOT NULL,
	"color" text NOT NULL,
	"size" text NOT NULL,
	"quantity" integer NOT NULL,
	"orderId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Order" (
	"id" text PRIMARY KEY DEFAULT 'k0d23qxlm7pj3hd12mzgs06d' NOT NULL,
	"shippingAddress" jsonb NOT NULL,
	"userId" text NOT NULL,
	"shippingRate" text NOT NULL,
	"totalAmount" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ProductImage" (
	"id" text PRIMARY KEY DEFAULT 'hwbtecf711u8w1lexw5auccq' NOT NULL,
	"url" text NOT NULL,
	"productId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Product" (
	"id" text PRIMARY KEY DEFAULT 'xmsf4tezra1ayihtudpwrt1k' NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"category" "ProductCategory" NOT NULL,
	"tags" jsonb NOT NULL,
	"price" double precision NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL,
	"videoUrl" jsonb NOT NULL,
	"categories" jsonb NOT NULL,
	"discountPercentage" double precision NOT NULL,
	"jsonDetails" jsonb NOT NULL,
	"productOwner" "ProductOwner" NOT NULL,
	"productType" "ProductType" NOT NULL,
	"status" "ProductStatus" NOT NULL,
	"wishlistedById" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" text PRIMARY KEY DEFAULT 'kie895ev68wco0afbcmk3k93' NOT NULL,
	"role" "UserRole" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"email" text NOT NULL,
	"firstName" text,
	"userName" text,
	"fullName" text,
	"imageUrl" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User" ("email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_Product_id_fk" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_Order_id_fk" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_Product_id_fk" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Product" ADD CONSTRAINT "Product_wishlistedById_User_id_fk" FOREIGN KEY ("wishlistedById") REFERENCES "User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
