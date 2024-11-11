import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  NgModule,
  OnInit,
  Output,
  Input,
  HostListener,
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

//  import { MegaMenuModule } from 'primeng/megamenu';
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
  BarsAppears = false; // Control the visibility of the dropdown
  isDropdownOpen = false; // Track whether the dropdown is open
  selectedCategory: string | null = null;
  searchAppears: boolean = false;
  selectedDiv: string = ''; // Property to keep track of the selected div
  searchTerm: string = '';
  @Input() products: IProduct[] = [];
  filteredProducts: IProduct[] = [];

  selectedParentId: string | null = null;

  [x: string]: any;
  ParentCategories: ICategory[] = [] as ICategory[];
  Categories: ICategory[] = [] as ICategory[];
  filteredSubcategories: ICategory[] = [] as ICategory[];
  selectedProductName = '';
  showCategories: boolean = false;
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
    let check = sessionStorage.getItem('token');
    if (check) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
  switchLanguage(event: Event): void {
    const selectElement = event.target as HTMLSelectElement | null;
    if (selectElement) {
      const language = selectElement.value || 'en';
      this.translate.use(language);
    }
  }
  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('parentOfNav') as HTMLElement;
      const cartIcon = document.getElementById('cartIcon') as HTMLElement;
      if (!navbar) return;
    
      const stickyThreshold = navbar.offsetTop - 5; 
    
      if (window.pageYOffset >= stickyThreshold) {
        navbar.classList.add('sticky');
        cartIcon.style.display = "block"
      } else {
        navbar.classList.remove('sticky');
        cartIcon.style.display = "none"

      }
    });
    
    // window.addEventListener('scroll', () => {
    //   const navbar = document.getElementById('parentOfNav') as HTMLElement;
    //   if (!navbar) return; // Check if navbar exists
    //   const sticky = navbar.offsetTop;
    //   console.log('sticky number ' + sticky);
    //   console.log(' window.pageYOffset ' + window.pageYOffset);

    //   if (window.pageYOffset == sticky) {
    //     navbar.classList.add('sticky');
    //   } else {
    //     navbar.classList.remove('sticky');
    //   }
    // });
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
  toggleCategories() {
    this.showCategories = !this.showCategories;
  }

  selectDiv(divName: string) {
    this.selectedDiv = divName; // Update the selected div
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
    this.selectedParentId = id;
    this.filteredSubcategories = this.Categories.filter(
      (sub) => sub.parentCategoryId === id
    );
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

  login() {
    this.router.navigateByUrl(`login`);
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigateByUrl(`login`);
  }

  get counter(): number {
    return this._cartService.getCounter();
  }
  changeSearchAppearance() {
    this.searchAppears = !this.searchAppears;
  }
  changeBarsAppearance() {
    this.BarsAppears = !this.BarsAppears;
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle main dropdown visibility
  }

  toggleSubDropdown(category: any) {
    // Close other sub dropdowns and toggle the clicked one
    this.ParentCategories.forEach((cat) => {
      if (cat !== category) {
        cat.isSubDropdownOpen = false; // Close other dropdowns
      }
    });
    category.isSubDropdownOpen = !category.isSubDropdownOpen; // Toggle the clicked dropdown
  }

  selectCategory(category: string) {
    this.selectedCategory = category; // Set the selected category
  }

  closeDropdown() {
    this.isDropdownOpen = false; // Close the main dropdown
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 800) {
      this.showCategories = false;
    }
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const dropdownElement = document.getElementById('sidelist');
    const targetElement = event.target as HTMLElement;

    if (dropdownElement && !dropdownElement.contains(targetElement)) {
      this.isDropdownOpen = false;
      this.ParentCategories.forEach((cat) => {
        cat.isSubDropdownOpen = false;
      });
    }
  }
}
