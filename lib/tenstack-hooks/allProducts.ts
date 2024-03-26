import { ProductsResponse } from "@/app/api/allProducts/types";
import { QueryKey, useSuspenseQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { addBaseURL } from "../addBaseUrl";
import {
  ProductCategory,
  ProductStatus,
  ProductType,
  ProductOwner,
} from "@prisma/client";
import { useEffect } from "react";
import { useDataTableStore } from "../zustandStore";

const fetchProducts = async ({
  queryKey,
}: {
  queryKey: QueryKey;
}): Promise<ProductsResponse> => {
  const [
    _key,
    page,
    sort,
    order,
    search,
    statusFilter,
    categoryFilter,
    productTypeFilter,
    productOwnerFilter,
  ] = queryKey;
  const url = addBaseURL(
    `api/allProducts?page=${page}&sort=${sort}&order=${order}&search=${search}&statusFilter=${statusFilter}&categoryFilter=${categoryFilter}&productTypeFilter=${productTypeFilter}&productOwnerFilter=${productOwnerFilter}`,
  );

  console.log("this is the url", url);
  const response = await fetch(url);
  if (!response.ok) {
    const dataError = await response.json();
    console.log("this is the error in the use product", dataError);
    throw new Error(dataError.error);
  }
  const data: ProductsResponse = await response.json();
  // console.log("this is the data that is returned by the useProducts", data);
  return data;
};

export function useProducts(
  page: number,
  sort: string,
  order: string,
  search: string,
  statusFilter: ProductStatus | "",
  categoryFilter: ProductCategory | "",
  productTypeFilter: ProductType | "",
  productOwnerFilter: ProductOwner | "",
) {
  const debouncedSearch = useDebounce(search, 100);
  const { setPage } = useDataTableStore();
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);
  return useSuspenseQuery<ProductsResponse, Error>({
    queryKey: [
      "products",
      page,
      sort,
      order,
      debouncedSearch,
      statusFilter,
      categoryFilter,
      productTypeFilter,
      productOwnerFilter,
    ],
    queryFn: fetchProducts,
    staleTime: 60 * 60 * 1000 * 10,
    // 1 hour
    // keepPreviousData: true, // Uncomment if you want to keep the previous data while new data is being fetched
    // You can add more options here, such as `retry`, `onSuccess`, etc.
  });
}
