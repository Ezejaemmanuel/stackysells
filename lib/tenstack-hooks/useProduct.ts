import { Product } from "@prisma/client";
import { QueryKey, useSuspenseQuery } from "@tanstack/react-query";
import { addBaseURL } from "../addBaseUrl";

const fetchProduct = async ({
  queryKey,
}: {
  queryKey: QueryKey;
}): Promise<Product> => {
  const [_key, id] = queryKey;
  const url = addBaseURL(`api/products/${id}`);

  const response = await fetch(url);
  if (!response.ok) {
    const dataError = await response.json();
    console.log("Error in useProduct:", dataError);
    throw new Error(dataError.error);
  }
  const data: Product = await response.json();
  // console.log("Data returned by useProduct:", data);
  return data;
};

export function useProduct(id: string) {
  return useSuspenseQuery({
    queryKey: ["product", id],
    queryFn: fetchProduct,
    staleTime: 60 * 60 * 1000 * 10, // 10 hours
    // You can add more options here, such as `retry`, `onSuccess`, etc.
  });
}
