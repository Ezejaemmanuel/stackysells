// // ... (previous imports)
// import { create } from "zustand";

// // ... (previous code)

// export type Section = {
//   title: string;
//   shortDescriptions: string[];
// };

// type JsonDetailsStore = {
//   sections: Section[];
//   addSection: () => void;
//   removeSection: (index: number) => void;
//   updateSectionTitle: (index: number, title: string) => void;
//   addShortDescription: (sectionIndex: number) => void;
//   removeShortDescription: (
//     sectionIndex: number,
//     descriptionIndex: number,
//   ) => void;
//   updateShortDescription: (
//     sectionIndex: number,
//     descriptionIndex: number,
//     description: string,
//   ) => void;
// };

// export const useJsonDetailsStore = create<JsonDetailsStore>((set) => ({
//   sections: [{ title: "", shortDescriptions: ["", ""] }],
//   addSection: () =>
//     set((state) => ({
//       sections: [...state.sections, { title: "", shortDescriptions: ["", ""] }],
//     })),
//   removeSection: (index) =>
//     set((state) => ({
//       sections: state.sections.filter((_, i) => i !== index),
//     })),
//   updateSectionTitle: (index, title) =>
//     set((state) => ({
//       sections: state.sections.map((section, i) =>
//         i === index ? { ...section, title } : section,
//       ),
//     })),
//   addShortDescription: (sectionIndex) =>
//     set((state) => ({
//       sections: state.sections.map((section, i) =>
//         i === sectionIndex
//           ? {
//               ...section,
//               shortDescriptions: [...section.shortDescriptions, ""],
//             }
//           : section,
//       ),
//     })),
//   removeShortDescription: (sectionIndex, descriptionIndex) =>
//     set((state) => ({
//       sections: state.sections.map((section, i) =>
//         i === sectionIndex
//           ? {
//               ...section,
//               shortDescriptions: section.shortDescriptions.filter(
//                 (_, j) => j !== descriptionIndex,
//               ),
//             }
//           : section,
//       ),
//     })),
//   updateShortDescription: (sectionIndex, descriptionIndex, description) =>
//     set((state) => ({
//       sections: state.sections.map((section, i) =>
//         i === sectionIndex
//           ? {
//               ...section,
//               shortDescriptions: section.shortDescriptions.map(
//                 (shortDescription, j) =>
//                   j === descriptionIndex ? description : shortDescription,
//               ),
//             }
//           : section,
//       ),
//     })),
// }));

import {
  ProductStatus,
  ProductCategory,
  ProductType,
  ProductOwner,
} from "@prisma/client";
import { create } from "zustand";

export type Section = {
  title: string;
  shortDescriptions: string[];
};

type JsonDetailsStore = {
  sections: Section[];
  setSections: (sections: Section[]) => void;
  addSection: () => void;
  removeSection: (index: number) => void;
  updateSectionTitle: (index: number, title: string) => void;
  addShortDescription: (sectionIndex: number) => void;
  removeShortDescription: (
    sectionIndex: number,
    descriptionIndex: number,
  ) => void;
  updateShortDescription: (
    sectionIndex: number,
    descriptionIndex: number,
    description: string,
  ) => void;
};

export const useJsonDetailsStore = create<JsonDetailsStore>((set) => ({
  sections: [],
  setSections: (sections) => set({ sections }),
  addSection: () =>
    set((state) => ({
      sections: [...state.sections, { title: "", shortDescriptions: ["", ""] }],
    })),
  removeSection: (index) =>
    set((state) => ({
      sections: state.sections.filter((_, i) => i !== index),
    })),
  updateSectionTitle: (index, title) =>
    set((state) => ({
      sections: state.sections.map((section, i) =>
        i === index ? { ...section, title } : section,
      ),
    })),
  addShortDescription: (sectionIndex) =>
    set((state) => ({
      sections: state.sections.map((section, i) =>
        i === sectionIndex
          ? {
              ...section,
              shortDescriptions: [...section.shortDescriptions, ""],
            }
          : section,
      ),
    })),
  removeShortDescription: (sectionIndex, descriptionIndex) =>
    set((state) => ({
      sections: state.sections.map((section, i) =>
        i === sectionIndex
          ? {
              ...section,
              shortDescriptions: section.shortDescriptions.filter(
                (_, j) => j !== descriptionIndex,
              ),
            }
          : section,
      ),
    })),
  updateShortDescription: (sectionIndex, descriptionIndex, description) =>
    set((state) => ({
      sections: state.sections.map((section, i) =>
        i === sectionIndex
          ? {
              ...section,
              shortDescriptions: section.shortDescriptions.map(
                (shortDescription, j) =>
                  j === descriptionIndex ? description : shortDescription,
              ),
            }
          : section,
      ),
    })),
}));

export interface DataTableState {
  search: string;
  setSearch: (search: string) => void;
  page: number;
  setPage: (page: number) => void;
  sort: string;
  setSort: (sort: string) => void;
  order: string;
  setOrder: (order: string) => void;
  statusFilter: ProductStatus | "";
  setStatusFilter: (statusFilter: ProductStatus | "") => void;
  categoryFilter: ProductCategory | "";
  setCategoryFilter: (categoryFilter: ProductCategory | "") => void;
  productTypeFilter: ProductType | "";
  setProductTypeFilter: (productTypeFilter: ProductType | "") => void;
  productOwnerFilter: ProductOwner | "";
  setProductOwnerFilter: (productOwnerFilter: ProductOwner | "") => void;
}

export const useDataTableStore = create<DataTableState>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
  page: 1,
  setPage: (page) => set({ page }),
  sort: "",
  setSort: (sort) => set({ sort }),
  order: "",
  setOrder: (order) => set({ order }),
  statusFilter: "",
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  categoryFilter: "",
  setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
  productTypeFilter: "",
  setProductTypeFilter: (productTypeFilter) => set({ productTypeFilter }),
  productOwnerFilter: "",
  setProductOwnerFilter: (productOwnerFilter) => set({ productOwnerFilter }),
}));
