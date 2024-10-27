import { IBrand } from "./ibrand";
import { IReview } from "./ireview";

export interface IProduct {
    id: string;            
    nameAr: string;        
    nameEn: string;       
    descriptionAr: string; 
    descriptionEn: string; 
    colorAr: string;       
    colorEn: string;       
    price: number;        
    unitInStock: number;   
    discount: number;      
    categoryId: string;  
    category: {
      nameEn: string;
      nameAr: string;
  }  
    brandId: string;    
    images: { imageUrl: string }[];
    inCart?: boolean;     
    quantity?: number; 
    // category?: ICategory;    
    brand?: IBrand;     
    Review?:IReview;     
    // images?: IProductImage[];   
    // facilities?: IFacility[];   
    // reviews?: IReview[];        
  }