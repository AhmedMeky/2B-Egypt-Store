import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  NgModule,
  OnInit,
  Output,
  Input,
} from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ICategory } from '../../../../models/icategory';
import { HttpClientModule } from '@angular/common/http';
import { CategorywithSubcategories } from '../../../../models/categorywith-subcategories';
import { LanguageServiceService } from '../../../services/language-service.service';
import { IProduct } from '../../../../models/IProduct';
import { ProductService } from '../../../services/product.service';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { CartItem } from '../../../ShoppingCart/Models/CartItem';
import { CartService } from '../../../ShoppingCart/Services/CartService';
import { ProductDetailsComponent } from '../../product-details/product-details.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    TranslateModule,
    // ProductDetailsComponent,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  ParentCategories: ICategory[] = [] as ICategory[];
  Categories: ICategory[] = [] as ICategory[];
  filteredSubcategories: ICategory[] = [] as ICategory[];
  selectedProductName = '';

  categorywithSubCategories: CategorywithSubcategories[] = [];
  lang: string = 'en';
  @Output() filterChange = new EventEmitter<IProduct[]>();
  // @Input() counter: number = 0;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private _LanguageService: LanguageServiceService,
    private productService: ProductService,
    private translate: TranslationService,
    private _cartService: CartService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
  switchLanguage(event: Event): void {
    const selectElement = event.target as HTMLSelectElement | null;
    if (selectElement) {
      const language = selectElement.value || 'en';
      this.translate.use(language);
    }
  }
  ngOnInit(): void {
    this._LanguageService.getlanguage().subscribe({
      next: (lang) => {
        this.lang = lang;
        document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
        this.translate.use(lang);
        this.loadCategories();
      },
    });
    this.translate.setDefaultLang('en');

    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.Categories = res;
        this.categorywithSubCategories = this.transformCategories(
          this.Categories
        );
        console.log(this.categorywithSubCategories);
      },
      error: (error) => {
        console.error('Error fetching Categories:', error);
      },
    });

    this.categoryService.getParentCategories().subscribe({
      next: (res) => {
        this.ParentCategories = res;
      },
      error: (error) => {
        console.error('Error fetching Parent Categories:', error);
      },
    });
  }
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.Categories = res.map((category) => ({
          ...category,
          name: this.lang === 'ar' ? category.nameAr : category.nameEn,
        }));
      },
      error: (error) => {
        console.error('Error fetching Categories:', error);
      },
    });
    this.categoryService.getParentCategories().subscribe({
      next: (res) => {
        this.ParentCategories = res.map((category) => ({
          ...category,
          name: this.lang === 'ar' ? category.nameAr : category.nameEn,
        }));
      },
      error: (error) => {
        console.error('Error fetching Parent Categories:', error);
      },
    });
  }
  changelang(event: Event): void {
    const selectElement = event.target as HTMLSelectElement | null;
    if (selectElement) {
      const value = selectElement.value;
      this._LanguageService.cahngelanguage(value);
    }
  }

  ShowSubCategories(id: string): void {
    this.filteredSubcategories = this.Categories.filter(
      (sub) => sub.parentCategoryId === id
    );
  }
  // transformCategories(categories: ICategory[]): CategorywithSubcategories[] {
  //   return categories.map(cat => ({
  //     ...cat,
  //     displayName: this.translate.instant(this.lang === 'ar' ? cat.nameAr : cat.nameEn)
  //   }));
  // }

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

      return {
        id: representativeCategory.id,
        nameAr:
          this.lang === 'ar'
            ? representativeCategory.nameAr
            : representativeCategory.nameEn,
        nameEn: representativeCategory.nameEn,
        subcategories: subcategories.map((sub) => ({
          ...sub,
          name: this.lang === 'ar' ? sub.nameAr : sub.nameEn,
        })),
      };
    });

    return groupedCategories;
  }

  SelectedProductId(id: string): void {
    this.router.navigateByUrl(`/products-by-category/${id}`);
  }

  filterProductsByName(): void {
    let filteredProducts: IProduct[] = [];
    if (this.selectedProductName) {
      this.productService.FilterwithName(this.selectedProductName).subscribe({
        next: (productsByName) => {
          filteredProducts = productsByName;
          this.filterChange.emit(filteredProducts);
        },
        error: (error) => {
          console.error('Error fetching filtered products by name:', error);
        },
      });
    } else {
      this.productService.getAllProducts().subscribe({
        next: (products) => {
          filteredProducts = products;
          this.filterChange.emit(filteredProducts);
        },
        error: (error) => {
          console.error('Error fetching all products:', error);
        },
      });
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
