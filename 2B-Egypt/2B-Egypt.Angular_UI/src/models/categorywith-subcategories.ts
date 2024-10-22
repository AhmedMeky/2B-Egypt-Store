import { ICategory } from "./icategory";

export interface CategorywithSubcategories {
  id: string;  // Changed from number to string
  nameAr: string;
  nameEn: string;
  subcategories: ICategory[];
}
