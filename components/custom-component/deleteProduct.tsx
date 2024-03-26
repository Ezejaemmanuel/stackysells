import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { useDeleteProduct } from "@/lib/tenstack-hooks/useDeleteProduct";
import { MdDangerous } from "react-icons/md";

interface DeleteProductProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  id: string;
  className?: string;
}

export const DeleteProduct: React.FC<DeleteProductProps> = ({
  id,
  setIsOpen,
}) => {
  const mutation = useDeleteProduct(id);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      await toast.promise(
        mutation.mutateAsync(undefined, {
          onSuccess: () => {
            setIsOpen(false);
            queryClient.invalidateQueries({ queryKey: ["products"] });
          },
        }),
        {
          loading: "Deleting product...",
          success: "Product deleted successfully",
          error: (error) => `Error deleting product: ${error.message}`,
        },
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 rounded-lg  p-4 shadow-lg">
      <MdDangerous size={35} className="text-red-500" />
      <p className="text-lg font-medium text-red-500">
        Are you sure you want to delete this product?
      </p>
      <p className="text-red-200">
        This action cannot be undone. The product will be permanently deleted.
      </p>
      <div className="flex justify-end space-x-2">
        <LoadingButton
          onClick={async () => await handleDelete()}
          variant={"destructive"}
          loading={mutation.isPending}
          className="bg-red-600 text-white hover:bg-red-700"
        >
          {mutation.isPending ? "Deleting..." : "Delete"}
        </LoadingButton>
        <Button
          onClick={() => setIsOpen(false)}
          className="bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteProduct;
