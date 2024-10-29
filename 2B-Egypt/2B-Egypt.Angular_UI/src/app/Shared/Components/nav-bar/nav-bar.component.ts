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
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { ICategory } from '../../../../models/icategory';
import { HttpClientModule } from '@angular/common/http';
import { CategorywithSubcategories } from '../../../../models/categorywith-subcategories';
import { LanguageServiceService } from '../../../services/language-service.service';
import { SignUpComponent } from '../../sign-up/sign-up.component';
import { AdvertismentComponent } from '../advertisment/advertisment.component';
import { LoginService } from '../../../services/login.service';
import { IProduct } from '../../../../models/IProduct';
import { ProductService } from '../../../services/product.service';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { CartItem } from '../../../ShoppingCart/Models/CartItem';
import { CartService } from '../../../ShoppingCart/Services/CartService';
import { ProductDetailsComponent } from '../../product-details/product-details.component';
import { MegamenuComponent } from '../../../megamenu/megamenu.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MegamenuComponent,
    SignUpComponent,
    RouterLink,
    AdvertismentComponent,
    FormsModule,
    TranslateModule,
  ],

  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  [x: string]: any;
  ParentCategories: ICategory[] = [] as ICategory[];
  Categories: ICategory[] = [] as ICategory[];
  filteredSubcategories: ICategory[] = [] as ICategory[];
  selectedProductName = '';

  categorywithSubCategories: CategorywithSubcategories[] = [];
  lang: string = 'en';
  isLoggedIn: boolean = false;
  @Output() filterChange = new EventEmitter<IProduct[]>();
  // @Input() counter: number = 0;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private _LanguageService: LanguageServiceService,
    private productService: ProductService,
    private translate: TranslationService,
    private _cartService: CartService,
    private loginService: LoginService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.isLoggedIn = false;
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

  // transformCategories(categories: ICategory[]): CategorywithSubcategories[] {
  //   const groupedMap: { [key: string]: ICategory[] } = {};

  //   for (const cat of categories) {
  //     if (cat.parentCategoryId == null) {
  //       if (!groupedMap[cat.id]) {
  //         groupedMap[cat.id] = [];
  //       }
  //       groupedMap[cat.id].push(cat);
  //     } else {
  //       if (!groupedMap[cat.parentCategoryId]) {
  //         groupedMap[cat.parentCategoryId] = [];
  //       }
  //       groupedMap[cat.parentCategoryId].push(cat);
  //     }
  //   }

  //   const groupedCategories: CategorywithSubcategories[] = Object.keys(
  //     groupedMap
  //   ).map((parentId) => {
  //     const subcategories = groupedMap[parentId];
  //     const representativeCategory = subcategories[0];

  //     return {
  //       id: representativeCategory.id,
  //       nameAr:
  //         this.lang === 'ar'
  //           ? representativeCategory.nameAr
  //           : representativeCategory.nameEn,
  //       nameEn: representativeCategory.nameEn,
  //       subcategories: subcategories.map((sub) => ({
  //         ...sub,
  //         name: this.lang === 'ar' ? sub.nameAr : sub.nameEn,
  //       })),
  //     };
  //   });

  //   return groupedCategories;
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
  
    const groupedCategories: CategorywithSubcategories[] = Object.keys(groupedMap).map((parentId) => {
      const subcategories = groupedMap[parentId];
      const representativeCategory = subcategories[0];
  
      return {
        id: representativeCategory.id,
        nameAr: representativeCategory.nameAr, // Retaining nameAr if needed
        nameEn: representativeCategory.nameEn, // Retaining nameEn if needed
        subcategories: subcategories.map((sub) => ({
          ...sub,
          name: sub.nameEn, // Assuming you want to keep the English name
        })),
      };
    });
  
    return groupedCategories;
  }
  SelectedProductId(id: string): void {
    this.router.navigateByUrl(`/products-by-category/${id}`);
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = true;
  }
  changeStat() {
    this.isLoggedIn = !this.isLoggedIn;
  }
  get counter(): number {
    return this._cartService.getCounter();
  }
}
