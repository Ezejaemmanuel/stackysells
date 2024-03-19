// "use client";

// import React from "react";
// import { ProductCategory } from "@prisma/client";
// import MultipleSelector from "@/components/ui/multipleSelector";

// type Option = {
//   label: string;
//   value: string;
// };

// interface SpecialMultiSelectProps {
//   placeholder: string;
//   value?: ProductCategory[];
//   onChange: (value: ProductCategory[]) => void;
// }

// const SpecialMultiSelect: React.FC<SpecialMultiSelectProps> = ({
//   placeholder,
//   onChange,
// }) => {
//   const productCategories = Object.values(ProductCategory);
//   const options: Option[] = productCategories.map((category) => ({
//     label: category,
//     value: category,
//   }));
// const [value, setValue] = React.useState<Option[]>([]);
//   console.log("SpecialMultiSelect component rendered");
//   console.log("Placeholder:", placeholder);
//   console.log("Value:", value);
//   console.log("Options:", options);

//   return (
//     <div className="flex w-full flex-col gap-5">
//       <MultipleSelector
//         // value={value?.map((category) => ({ label: category, value: category }))}
//         value={value}
//         onChange={setValue}

//         defaultOptions={options}
//         placeholder={placeholder}
//         emptyIndicator={
//           <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
//             no results found.
//           </p>
//         }
//       />
//     </div>
//   );
// };

// export default SpecialMultiSelect;
