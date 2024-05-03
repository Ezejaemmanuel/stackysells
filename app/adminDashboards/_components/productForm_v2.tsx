"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import ImageUpload from "./image-uploader";
// import MultiSelect from "./multi-select";
import MultiText from "./multi-text";
// import Delete from "./customUi-delete";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductWithImages } from "@/app/api/oneProduct/aside";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MultipleSelector from "@/components/ui/multipleSelector";
import { AutosizeTextarea } from "@/components/ui/autoResizeTextArea";
import { Section, useJsonDetailsStore } from "@/lib/zustandStore";
import { DeleteIcon } from "lucide-react";
import { useCreateProduct } from "@/lib/tenstack-hooks/useCreateProduct";
import { toast } from "sonner";
import { DrawerDialogLoader } from "@/components/custom-component/loading-drawer-alert";
import { deleteProductImageAndFile } from "@/lib/uploadthing-functions/functions";
import { cn } from "@/lib/utils";
import {
  Product,
  ProductCategoryEnum,
  ProductOwnerEnum,
  ProductStatusEnum,
  ProductTypeEnum,
} from "@/lib/db/schema/all-schema";
type Option = {
  label: string;
  value: string;
};

const MEDIA_STORAGE_KEY = "media";
type MediaUrl = string;

export interface ImageData {
  url: string;
  id: string;
}

const formSchema = z.object({
  title: z.string().min(2).max(80),
  description: z.string().min(2).max(500).trim(),
  images: z.array(z.object({ url: z.string(), id: z.string() })),
  category: z.nativeEnum( ProductCategoryEnum),
  categories: z.array(z.nativeEnum(ProductCategoryEnum)),
  tags: z.array(z.string()),
  price: z.coerce.number().min(0.1),
  discountPercentage: z.coerce.number().min(0).max(100),
  productType: z.nativeEnum(ProductTypeEnum),
  status: z.nativeEnum(ProductStatusEnum),
  jsonDetails: z.array(z.any()),
});
const initialDataJsonDetails: Section[] = [
  {
    title: "Product Features",
    shortDescriptions: [
      "Lightweight and durable",
      "Water-resistant",
      "Easy to clean",
    ],
  },
  {
    title: "Specifications",
    shortDescriptions: [
      "Material: Polyester",
      "Dimensions: 10 x 8 x 3 inches",
      "Weight: 1.5 pounds",
    ],
  },
];

interface ProductFormProps {
  initialData: ProductWithImages | null;
}
const productCategories = Object.values(ProductCategoryEnum);
const options: Option[] = productCategories.map((category) => ({
  label: category,
  value: category,
}));
const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();
  const {
    sections,
    addSection,
    removeSection,
    updateSectionTitle,
    addShortDescription,
    removeShortDescription,
    updateShortDescription,
  } = useJsonDetailsStore();
  console.log("sections..this is the sections", sections);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [reachedMaxLimit, setReachedMaxLimit] = useState(false);
  const createProductMutation = useCreateProduct();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "noId";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    //@ts-ignore
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          status: initialData.status,
          category: initialData.category,
          categories: initialData.categories as (typeof ProductCategoryEnum)[],
          tags: JSON.parse(initialData.tags as unknown as string),
          price: initialData.price,
          discountPercentage: initialData.discountPercentage,
          productType: initialData.productType,
          jsonDetails: initialData.jsonDetails as unknown as Section[],
          images: initialData.images,
          createdAt: initialData.createdAt,
          updatedAt: initialData.updatedAt,
          wishlistedById: initialData.wishlistedById,
        }
      : {
          title: "",
          description: "",
          status: ProductStatusEnum.created,
          category: ProductCategoryEnum.Clothing,
          categories: [],
          tags: [],
          price: 0.1,
          discountPercentage: 0,
          productType: ProductTypeEnum.goods,
          jsonDetails: [],
          images: [],
          productOwner: ProductOwnerEnum.admin,
          userId: "",
          createdAt: new Date(),
          updatedAt: new Date(),
          wishlistedById: null,
        },
  });
  const { setSections } = useJsonDetailsStore();

  useEffect(() => {
    if (initialData?.jsonDetails) {
      const parsedJsonDetails = initialData.jsonDetails as unknown as Section[];
      setSections(parsedJsonDetails);
    } else {
      // Use the example initialDataJsonDetails for testing purposes
      setSections(initialDataJsonDetails);
    }
  }, [initialData, setSections]);

  useEffect(() => {
    console.log("this is the form watch images", form.watch("images"));
  }, [form.watch("images")]);

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const jsonDetails = JSON.stringify(sections);
    const formValues = {
      ...values,
      jsonDetails,
      id: id,
    };
    console.log("Form values with JSON details:", formValues);
    console.log("this is the values from the form", values);

    try {
      await toast.promise(
        createProductMutation.mutateAsync(formValues, {
          onSuccess: (data) => {
            console.log("Product created successfully:", data);
            router.push("/products");
          },
          onError: (error) => {
            console.error("Failed to create product:", error);
            throw error; // Rethrow the error to be caught by toast.promise
          },
        }),
        {
          loading: "Creating product...",
          success: "Product created successfully!",
          error: (error) => `Failed to create product: ${error.message}`,
        },
      );
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };
  const calculateDiscountedPrice = (
    price: number,
    discountPercentage: number,
  ) => {
    if (price > 0 && discountPercentage > 0) {
      const discount = price * (discountPercentage / 100);
      const discounted = price - discount;
      setDiscountedPrice(discounted);
    } else {
      setDiscountedPrice(0);
    }
  };
  return (
    <div className="mb-10 bg-black md:p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Product</p>
          {/* <Delete id={initialData.id} item="product" /> */}
        </div>
      ) : (
        <p className="text-heading2-bold">Create Product</p>
      )}
      <Separator className="mb-7 mt-4 bg-neutral-400" />
      <DrawerDialogLoader open={createProductMutation.isPending} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-neutral-950 p-6 text-white"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <>
                    <Input
                      placeholder="Title"
                      {...field}
                      className="max-w-lg"
                      onKeyDown={handleKeyPress}
                    />
                    <div
                      className={cn(
                        "mt-1 max-w-[34rem] text-right text-sm",
                        field.value.length > 80
                          ? "text-red-500"
                          : "text-gray-300",
                      )}
                    >
                      {field.value.length}/80
                    </div>
                  </>
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <>
                    <AutosizeTextarea
                      className="max-w-xl"
                      {...field}
                      onKeyDown={handleKeyPress}
                      maxLength={500}
                    />
                    <div
                      className={cn(
                        "mt-1 max-w-[34rem] text-right text-sm",
                        field.value.length > 500
                          ? "text-red-500"
                          : "text-gray-300",
                      )}
                    >
                      {field.value.length}/500
                    </div>
                  </>
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  {/* <ImageUpload
                    value={field.value}
                    onChange={(imageData) =>
                      field.onChange([...field.value, imageData])
                    }
                    onRemove={(imageData) => {
                      const removeImage = async () => {
                        try {
                          const result = await deleteProductImageAndFile(
                            imageData.id,
                          );
                          return result;
                        } finally {
                          field.onChange([
                            ...field.value.filter(
                              (image) => image.id !== imageData.id,
                            ),
                          ]);
                          // removeImageFromStorage(imageData.id);
                        }
                      };

                      toast.promise(removeImage(), {
                        loading: "Removing image...",
                        success: (result) => result.message,
                        error: (result) => result.message,
                      });
                    }}
                    id={id}
                  /> */}
                  <ImageUpload
                    value={field.value}
                    onChange={(imageData) =>
                      field.onChange([...(field.value ?? []), imageData])
                    }
                    onRemove={(imageData) => {
                      const removeImage = async () => {
                        try {
                          const result = await deleteProductImageAndFile(
                            imageData.id,
                          );
                          return result;
                        } finally {
                          field.onChange([
                            ...(field.value ?? []).filter(
                              (image) => image.id !== imageData.id,
                            ),
                          ]);
                        }
                      };

                      toast.promise(removeImage(), {
                        loading: "Removing image...",
                        success: (result) => result.message,
                        error: (result) => result.message,
                      });
                    }}
                    id={id}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (N)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        calculateDiscountedPrice(
                          form.getValues("price"),
                          parseFloat(e.target.value),
                        );
                      }}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Percentage (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Discount Percentage"
                      {...field}
                      onKeyDown={handleKeyPress}
                      onChange={(e) => {
                        field.onChange(e);
                        calculateDiscountedPrice(
                          parseFloat(e.target.value),
                          form.getValues("discountPercentage"),
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(ProductCategoryEnum).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status for the product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(ProductStatusEnum).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Related categoriess</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={field.value.map((category) => ({
                        label: category,
                        value: category,
                      }))}
                      hidePlaceholderWhenSelected
                      maxSelected={3}
                      selectFirstItem={false}
                      triggerSearchOnFocus={true}
                      disabled={false}
                      onMaxSelected={(maxLimit) =>
                        //   console.log("you have reached your max limit", maxLimit)
                        () =>
                          setReachedMaxLimit(true)
                        }
                      onChange={(selectedOptions) =>
                        field.onChange(
                          selectedOptions.map((option) => option.value),
                        )
                      }
                      defaultOptions={options}
                      placeholder="select related categories"
                      emptyIndicator={
                        <p className="text-center text-lg leading-10">
                          no results found.
                        </p>
                      }
                    />
                  </FormControl>
                  {reachedMaxLimit && (
                    <p className="text-center text-lg leading-10 ">
                      no results found.
                    </p>
                  )}
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Tags"
                      value={field.value}
                      onChange={(tag) => field.onChange([...field.value, tag])}
                      onRemove={(tagToRemove) =>
                        field.onChange([
                          ...field.value.filter((tag) => tag !== tagToRemove),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Product Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {Object.values(ProductTypeEnum).map((type) => (
                        <FormItem
                          key={type}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={type} />
                          </FormControl>
                          <FormLabel className="font-normal">{type}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jsonDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>futher details</FormLabel>
                  <FormControl>
                    <div>
                      {sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-4">
                          <div className="flex items-center space-x-2">
                            <Input
                              placeholder="Section Title"
                              value={section.title}
                              size={10}
                              onChange={(e) =>
                                updateSectionTitle(sectionIndex, e.target.value)
                              }
                            />
                            <Button
                              type="button"
                              onClick={() => removeSection(sectionIndex)}
                              size={"icon"}
                              className="bg-red-600 text-white"
                            >
                              <DeleteIcon />
                            </Button>
                          </div>
                          {section.shortDescriptions.map(
                            (description, descriptionIndex) => (
                              <div
                                key={descriptionIndex}
                                className="mt-2 flex items-center space-x-2"
                              >
                                <Input
                                  placeholder="Short Description"
                                  size={10}
                                  value={description}
                                  onChange={(e) =>
                                    updateShortDescription(
                                      sectionIndex,
                                      descriptionIndex,
                                      e.target.value,
                                    )
                                  }
                                />
                                <Button
                                  type="button"
                                  onClick={() =>
                                    removeShortDescription(
                                      sectionIndex,
                                      descriptionIndex,
                                    )
                                  }
                                  size={"icon"}
                                  className="bg-red-600 text-white"
                                >
                                  <DeleteIcon />
                                </Button>
                              </div>
                            ),
                          )}
                          <Button
                            type="button"
                            onClick={() => addShortDescription(sectionIndex)}
                            variant={"ghost"}
                            size={"sm"}
                            className="mt-2 bg-blue-600 text-xs text-white"
                          >
                            Add Short Description
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        onClick={addSection}
                        variant={"outline"}
                        size={"sm"}
                        className="bg-blue-600 text-xs text-white"
                      >
                        Add description
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
          </div>
          {discountedPrice > 0 && (
            <div className="mx-auto max-w-md  rounded-md border border-orange-600  p-4 shadow-md">
              <p className="mb-2 text-lg font-semibold">Price Details</p>
              <div className="space-y-1">
                <p className="">
                  Original Price:{" "}
                  <span className="font-semibold">
                    ${form.getValues("price")}
                  </span>
                </p>
                <p className="">
                  Discount Percentage:{" "}
                  <span className="font-semibold">
                    {form.getValues("discountPercentage")}%
                  </span>
                </p>
                <p className="text-xl font-bold ">
                  Discounted Price:{" "}
                  <span className="text-green-600">
                    ${discountedPrice.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-10">
            <Button type="submit" className="bg-orange-400 text-white">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/products")}
              className="bg-red-600 text-white"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
