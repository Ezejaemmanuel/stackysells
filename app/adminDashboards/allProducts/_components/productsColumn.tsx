// Assuming this is in "productsColumn.tsx"
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Delete from "./customUi-delete";

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

export const columns: ColumnDef<ProductType, unknown>[] = [
  {
    accessorKey: "title",
    header: () => "Title",
    cell: ({ row }) => (
      <Link href={`/products/${row.original._id}`} className="hover:text-red-1">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: () => "Category",
  },
  {
    accessorKey: "collections",
    header: () => "Collections",
    cell: ({ row }) =>
      row.original.collections.map((collection) => collection.title).join(", "),
  },
  {
    accessorKey: "price",
    header: () => "Price ($)",
  },
  {
    accessorKey: "expense",
    header: () => "Expense ($)",
  },
  {
    id: "actions",
    header: () => "Actions",
    cell: ({ row }) => <Delete item="product" id={row.original._id} />,
  },
];
