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
import { ProductType, CollectionType } from "./productsColumn"; // Ensure these are imported or defined in this file
import Link from "next/link";
import Delete from "./customUi-delete";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData> {
  data: TData[];
  searchKey: string;
}

export function DataTable<TData extends ProductType>({
  data,
  searchKey,
}: DataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { width } = useWindowSize();
  const isSmallScreen = (width ?? 0) < 768; // Assuming 768px as the breakpoint for small screens

  const columns: ColumnDef<TData, unknown>[] = [
    {
      accessorKey: "title",
      header: () => "Title",
      cell: ({ row }: { row: Row<TData> }) => (
        <Link
          href={`/products/${row.original._id}`}
          className="hover:text-red-1"
        >
          {row.original.title}
        </Link>
      ),
    },
    isSmallScreen
      ? null
      : {
          accessorKey: "category",
          header: () => "Category",
        },
    isSmallScreen
      ? null
      : {
          accessorKey: "collections",
          header: () => "Collections",
          cell: ({ row }: { row: Row<TData> }) =>
            row.original.collections
              .map((collection: CollectionType) => collection.title)
              .join(", "),
        },
    {
      accessorKey: "Status",
      header: () => "Status",
      cell: ({ row }: { row: Row<TData> }) => <div>yes</div>,
    },
    isSmallScreen
      ? null
      : {
          accessorKey: "price",
          header: () => "Price ($)",
        },
    isSmallScreen
      ? null
      : {
          accessorKey: "expense",
          header: () => "Expense ($)",
        },
    {
      id: "actions",
      header: () => "Actions",
      cell: ({ row }: { row: Row<TData> }) => (
        <Delete item="product" id={row.original._id} />
      ),
    },
  ].filter(Boolean) as ColumnDef<TData, unknown>[]; // Ensure no null values and assert the correct type

  const table = useReactTable({
    data,
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
    <div className="py-5">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search..."
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
