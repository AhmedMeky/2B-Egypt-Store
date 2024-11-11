import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { IProduct } from '../../../../models/IProduct';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from '../../../services/language-service.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  selectedCategory = 'all';
  selectedProductName = '';
  categories: any[] = [];
  products: IProduct[] = [];
  selectedPrice: number = 1000000;
  minDiscount: number = 0;
  currentLang: string = 'en';
  lang: string = 'en';
  @Output() filterChange = new EventEmitter<IProduct[]>();
  public translate: TranslateService;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private languageService: LanguageServiceService,
    translateService: TranslateService
  ) {
    this.translate = translateService;
  }

  ngOnInit(): void {
    this.languageService.getlanguage().subscribe({
      next: (lang) => {
        this.lang = lang;
        document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
        this.translate.use(lang);
      },
    });
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
      // this.translate.use(data);
    });
    this.languageService.getlanguage().subscribe((lang: string) => {
      this.currentLang = lang;
      this.loadCategories();
      this.translate.use(lang);
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data.map((category) => {
        return {
          ...category,
          displayName:
            this.currentLang === 'ar' ? category.nameAr : category.nameEn,
        };
      });
    });
  }
  
  // filterProducts(): void {
  //   let filteredProducts: IProduct[] = [];
  //   const categoryFilter =
  //     this.selectedCategory !== 'all'
  //       ? this.productService.getProductsByCategoryId(this.selectedCategory)
  //       : this.productService.getAllProducts();

  //   categoryFilter.subscribe({
  //     next: (products) => {
  //       filteredProducts = products;
  //       if (this.selectedProductName) {
  //         this.productService
  //           .FilterwithName(this.selectedProductName)
  //           .subscribe({
  //             next: (productsByName) => {
  //               filteredProducts = filteredProducts.filter((product) => {
  //                 const productName =
  //                   this.currentLang === 'ar' ? product.nameAr : product.nameEn;
  //                 return productName
  //                   .toLowerCase()
  //                   .includes(this.selectedProductName.toLowerCase());
  //               });
  //               filteredProducts = filteredProducts.filter(
  //                 (product) => product.price <= this.selectedPrice
  //               );
  //               filteredProducts = filteredProducts.filter(
  //                 (product) => product.discount >= this.minDiscount
  //               );

  //               this.filterChange.emit(filteredProducts);
  //             },
  //             error: (error) => {
  //               console.error(
  //                 'Error fetching filtered products by name:',
  //                 error
  //               );
  //             },
  //           });
  //       } else {
  //         filteredProducts = filteredProducts.filter(
  //           (product) => product.price <= this.selectedPrice
  //         );
  //         filteredProducts = filteredProducts.filter(
  //           (product) => product.discount === this.minDiscount
  //         );

  //         this.filterChange.emit(filteredProducts);
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Error fetching filtered products by categoryId:', error);
  //     },
  //   });
  // }
  
  // filterProducts(): void {
  //   let filteredProducts: IProduct[] = [];
  //   const categoryFilter =
  //     this.selectedCategory !== 'all'
  //       ? this.productService.getProductsByCategoryId(this.selectedCategory)
  //       : this.productService.getAllProducts();
  
  //   categoryFilter.subscribe({
  //     next: (products) => {
  //       filteredProducts = products;
  
  //       if (this.selectedProductName) {
  //         filteredProducts = filteredProducts.filter((product) => {
  //           const productName =
  //             this.currentLang === 'ar' ? product.nameAr : product.nameEn;
  //           return productName
  //             .toLowerCase()
  //             .includes(this.selectedProductName.toLowerCase());
  //         });
  //       }
  
  //       filteredProducts = filteredProducts.filter(
  //         (product) => product.price <= this.selectedPrice
  //       );
  
  //       filteredProducts = filteredProducts.filter(
  //         (product) => product.discount == this.minDiscount
  //       );
  
  //       this.filterChange.emit(filteredProducts);
  //     },
  //     error: (error) => {
  //       console.error('Error fetching filtered products by categoryId:', error);
  //     },
  //   });
  // }



  filterProducts(): void {
    let filteredProducts: IProduct[] = [];
  
    const categoryFilter =
      this.selectedCategory !== 'all'
        ? this.productService.getProductsByCategoryId(this.selectedCategory)
        : this.productService.getAllProducts();
  
    categoryFilter.subscribe({
      next: (products) => {
        filteredProducts = products;
  
        if (this.selectedProductName) {
          filteredProducts = filteredProducts.filter((product) => {
            const productName =
              this.currentLang === 'ar' ? product.nameAr : product.nameEn;
            return productName
              .toLowerCase()
              .includes(this.selectedProductName.toLowerCase());
          });
        }
  
        if (this.selectedPrice) {
          filteredProducts = filteredProducts.filter(
            (product) => product.price <= this.selectedPrice
          );
        }
  
        if (this.minDiscount) {
          filteredProducts = filteredProducts.filter(
            (product) => product.discount == this.minDiscount
          );
        }
  
        this.filterChange.emit(filteredProducts);
      },
      error: (error) => {
        console.error('Error fetching filtered products by categoryId:', error);
      },
    });
  }
  
  
}
