import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ICategory } from '../../../../models/icategory';
import { HttpClientModule } from '@angular/common/http';
import { CategorywithSubcategories } from '../../../../models/categorywith-subcategories';
import { LanguageServiceService } from '../../../services/language-service.service';
import { IProduct } from '../../../../models/IProduct';
import { CartItem } from '../../../ShoppingCart/Models/CartItem';
import { CartService } from '../../../ShoppingCart/Services/CartService';
import { ProductDetailsComponent } from '../../product-details/product-details.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule,ProductDetailsComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  ParentCategories: ICategory[] = [] as ICategory[];
  Categories: ICategory[] = [] as ICategory[];
  filteredSubcategories: ICategory[] = [] as ICategory[];

  categorywithSubCategories: CategorywithSubcategories[] = [] ;
  
  lang: string = 'English'; // Default language
  // @Input() counter: number = 0;
    constructor(private categoryService: CategoryService,  private router: Router, private _LanguageService: LanguageServiceService
    ,private _cartService:CartService ) {}

  ngOnInit(): void {
    this._LanguageService.getlanguage().subscribe({
      next: (lang) => {
        this.lang = lang;
      },
    });
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.Categories = res; 
        this.categorywithSubCategories =this.transformCategories(this.Categories) ;
        // console.log(this.transformCategories(this.Categories)); 
        console.log(this.categorywithSubCategories);
        
      },
      error: (error) => {
        console.error('Error up fetching Categories:', error);
      },
    });
    this.categoryService.getParentCategories().subscribe({
      next: (res) => {
        this.ParentCategories = res;
      },
      error: (error) => {
        console.error('Error up fetching  Parent Categories:', error);
      },
    });
  }
  ShowSubCategories(id:string):void{  
    console.log(this.Categories.filter(sub=>sub.parentCategoryId ==id)); 
      this.filteredSubcategories=this.Categories.filter(sub=>sub.parentCategoryId ==id) ; 
      console.log(this.filteredSubcategories)
     
  }

  transformCategories(categories: ICategory[]): CategorywithSubcategories[] {
    const groupedMap: { [key: string]: ICategory[] } = {};

    for (const cat of categories) {
      if (cat.parentCategoryId == null) {
        if (!groupedMap[cat.id]) {
          groupedMap[cat.id] = [];
        }

        groupedMap[cat.id].push(cat);
      } else {
        if (!groupedMap[cat.parentCategoryId]) {
          groupedMap[cat.parentCategoryId] = [];
        }
        groupedMap[cat.parentCategoryId].push(cat);
      }
    }

    const groupedCategories: CategorywithSubcategories[] = Object.keys(
      groupedMap
    ).map((parentId) => {
      const subcategories = groupedMap[parentId];
      const representativeCategory = subcategories[0];

      if (!representativeCategory) {
        return {
          id: parentId,
          nameAr: '',
          nameEn: '',
          subcategories: subcategories,
        };
      }

      return {
        id: representativeCategory.id,
        nameAr: representativeCategory.nameAr,
        nameEn: representativeCategory.nameEn,
        subcategories: subcategories,
      };
    });

    return groupedCategories;
  }

  print(): void {
    console.log(this.filteredSubcategories);
  } 
  reset(){
    this.filteredSubcategories=[] as ICategory[] ;
  }
  SelectedProductId(id:string)
  {
    this.router.navigateByUrl(`/products-by-category/${id}`);

  }
  changelang(event: Event) {
    const selectElement = event.target as HTMLSelectElement | null; 
    if (selectElement) { 
        const value = selectElement.value; 
        this._LanguageService.cahngelanguage(value);
    }

}

// addToCart(product: IProduct) {
//   const cartItem: CartItem = {
//     productId: Number(product.id),
//     productName: product.nameAr,
//     price: product.price,
//     quantity: product?.unitInStock || 0,
//     totalPrice: product.price,
//     // image: product.images.find(i => i.imageUrl === product.image)?.imageUrl || ''
//     image: product.images[0].imageUrl
//   };

//   console.log(cartItem);
//   this._cartService.addToCart(cartItem);
  
//   this.router.navigateByUrl('cart');
// }
get counter(): number {
  return this._cartService.getCounter(); 
}
}
