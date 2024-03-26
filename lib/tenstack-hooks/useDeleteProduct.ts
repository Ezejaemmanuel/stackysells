import { useMutation } from "@tanstack/react-query";
import { addBaseURL } from "../addBaseUrl";

export const useDeleteProduct = (productId: string) => {
  return useMutation<void, Error>({
    mutationKey: ["deleteProduct", productId],
    mutationFn: async () => {
      const url = addBaseURL(`api/allProducts?id=${productId}`);
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        const res = await response.json();
        throw new Error(`failed to delete product ${res.error}`);
      }
    },
  });
};
