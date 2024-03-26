// import ProductForm from "../_components/ProductForm";

import { getProductById } from "@/app/api/oneProduct/aside";
import ProductForm from "../_components/productForm_v2";

const CreateProduct = async ({
  searchParams,
}: {
  searchParams: { id: string | null };
}) => {
  console.log("this is hte product id from create product", searchParams.id);

  const product = await getProductById(searchParams.id);
  console.log("this is the product from create product", product);
  return <ProductForm initialData={product} />;
};

export default CreateProduct;

// import { getProductById } from "@/app/api/oneProduct/aside";
// import ProductForm from "../_components/productForm_v2";
// import { Suspense } from "react";

// const CreateProduct = async (props: {
//   searchParams: { [key: string]: string | string[] | undefined };
// }) => {
//   const { id } = props.searchParams;

//   let product = null;
//   if (id && id !== "noId") {
//     product = await getProductById(Array.isArray(id) ? id[0] : id);
//   }

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <ProductForm initialData={product} />
//     </Suspense>
//   );
// };

// export default CreateProduct;
