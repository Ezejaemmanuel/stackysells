"use client";
import { useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  ColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  Row,
} from "@tanstack/react-table";
import { ProductResponse } from "@/app/api/allProducts/types";
import Link from "next/link";
// import Delete from "../_components/customUi-delete";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  ProductCategory,
  ProductOwner,
  ProductStatus,
  ProductType,
} from "@prisma/client";
import { useProducts } from "@/lib/tenstack-hooks/allProducts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteIcon, MoreHorizontalIcon, Plus } from "lucide-react";
import { useDataTableStore } from "@/lib/zustandStore";
import { AlertDialogDrawer } from "@/components/custom-component/drawer-or-alert";
import DeleteProduct from "@/components/custom-component/deleteProduct";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MdDelete } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";

interface DataTableProps {
  searchKey: string;
  page: number;
  sort: string;
  order: string;
  statusFilter: ProductStatus | "";
  categoryFilter: ProductCategory | "";
  productTypeFilter: ProductType | "";
  productOwnerFilter: ProductOwner | "";
}

export function DataTable() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { width } = useWindowSize();
  const isSmallScreen = (width ?? 0) < 768; // Assuming 768px as the breakpoint for small screens
  const {
    search,
    setSearch,
    page,
    setPage,
    sort,
    setSort,
    order,
    setOrder,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    productTypeFilter,
    setProductTypeFilter,
    productOwnerFilter,
    setProductOwnerFilter,
  } = useDataTableStore();
  const { data, isLoading, isError, error } = useProducts(
    page,
    sort,
    order,
    search,
    statusFilter,
    categoryFilter,
    productTypeFilter,
    productOwnerFilter,
  );
  const { products } = data;
  const columns: ColumnDef<ProductResponse, unknown>[] = [
    {
      id: "serialNumber",
      header: () => (
        <span className="md:text-md text-xs font-semibold">S/N</span>
      ),
      cell: ({ row }: { row: Row<ProductResponse> }) => (
        <span className="md:text-md text-xs">{row.index + 1}</span>
      ),
    },
    {
      accessorKey: "title",
      header: () => (
        <span className="md:text-md text-xs font-semibold">Title</span>
      ),
      cell: ({ row }: { row: Row<ProductResponse> }) => (
        <Link
          href={`/products/${row.original.id}`}
          className="md:text-md text-xs hover:text-blue-500"
        >
          {row.original.title}
        </Link>
      ),
    },
    {
      accessorKey: "category",
      header: () => (
        <span className="md:text-md text-xs font-semibold">Category</span>
      ),
      cell: ({ row }: { row: Row<ProductResponse> }) => (
        <span className="md:text-md text-xs">{row.original.category}</span>
      ),
    },
    {
      accessorKey: "price",
      header: () => (
        <span className="md:text-md text-xs font-semibold">Price</span>
      ),
      cell: ({ row }: { row: Row<ProductResponse> }) => (
        <span className="md:text-md text-xs">
          ${row.original.price.toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: "discount",
      header: () => <span className="text-xs font-semibold">Discount</span>,
      cell: ({ row }: { row: Row<ProductResponse> }) => (
        <span className="md:text-md text-xs">
          {row.original.discountPercentage}%
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: () => (
        <span className="md:text-md text-xs font-semibold">Status</span>
      ),
      cell: ({ row }: { row: Row<ProductResponse> }) => {
        const status = row.original.status;
        const badgeClasses = cn("md:text-md text-xxs", {
          "bg-gray-100 text-green-500": status === ProductStatus.created,
          "bg-blue-100 text-blue-500 animate-pulse":
            status === ProductStatus.onSale,
          "bg-green-100 text-red-500 animate-pulse":
            status === ProductStatus.shouldBeDeleted,
          "bg-yellow-100 text-red-500 animate-pulse":
            status === ProductStatus.soldOut,
          "bg-orange-100 text-red-800":
            status === ProductStatus.suspendedByAdmin,
          "bg-red-100 text-red-800": status === ProductStatus.suspendedBySeller,
        });

        return <Badge className={badgeClasses}>{status}</Badge>;
      },
    },

    isSmallScreen
      ? null
      : {
          accessorKey: "productOwner",
          header: () => (
            <span className="md:text-md text-xs font-semibold">
              Product Owner
            </span>
          ),
          cell: ({ row }: { row: Row<ProductResponse> }) => (
            <span className="md:text-md text-xs">
              {row.original.productOwner}
            </span>
          ),
        },
    isSmallScreen
      ? null
      : {
          accessorKey: "productType",
          header: () => (
            <span className="md:text-md text-xs font-semibold">
              Product Type
            </span>
          ),
          cell: ({ row }: { row: Row<ProductResponse> }) => (
            <span className="md:text-md text-xs">
              {row.original.productType}
            </span>
          ),
        },
    isSmallScreen
      ? null
      : {
          accessorKey: "createdAt",
          header: () => (
            <span className="md:text-md text-xs font-semibold">Created At</span>
          ),
          cell: ({ row }: { row: Row<ProductResponse> }) => (
            <span className="md:text-md text-xs">
              {formatDistanceToNow(new Date(row.original.createdAt), {
                addSuffix: true,
              })}
            </span>
          ),
        },
    isSmallScreen
      ? null
      : {
          accessorKey: "updatedAt",
          header: () => (
            <span className="md:text-md text-xs font-semibold">Updated At</span>
          ),
          cell: ({ row }: { row: Row<ProductResponse> }) => (
            <span className="md:text-md text-xs">
              {formatDistanceToNow(new Date(row.original.updatedAt), {
                addSuffix: true,
              })}
            </span>
          ),
        },

    {
      id: "actions",
      header: () => (
        <span className="md:text-md text-xs font-semibold">Actions</span>
      ),
      cell: ({ row }: { row: Row<ProductResponse> }) => (
        <div className="flex flex-row items-center justify-between">
          <Link href={`/adminDashboards/newProduct?id=${row.original.id}`}>
            <span className="text-xxs md:text-xs">Edit</span>
          </Link>

          <AlertDialogDrawer component={DeleteProduct} id={row.original.id}>
            <MdDelete
              className={` cursor-pointer text-lg text-red-600  md:text-lg `}
            />
          </AlertDialogDrawer>
        </div>
      ),
    },
  ].filter(Boolean) as ColumnDef<ProductResponse, unknown>[]; // Ensure no null values and assert the correct type

  const table = useReactTable({
    data: data?.products || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex flex-col items-center justify-between">
        <div className="w-full overflow-x-auto">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="md:text-md text-xs">
            Page {page} of {data?.totalPages || 1}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newPage = Math.max(page - 1, 1);
                setPage(newPage); // Update the page state
              }}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newPage = Math.min(page + 1, data?.totalPages || 1);
                setPage(newPage); // Update the page state
              }}
              disabled={page === (data?.totalPages || 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
