import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './Shared/Components/product-list/product-list.component';
import { LanguageServiceService } from './services/language-service.service';
import { ProductsByCategoryComponent } from './Shared/products-by-category/products-by-category.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './Shared/product-details/product-details.component';
import { FooterComponent } from './Shared/Components/footer/footer.component';
import { NavBarComponent } from './Shared/Components/nav-bar/nav-bar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SidebarComponent } from './Shared/Components/sidebar/sidebar.component';
import { IProduct } from '../models/IProduct';
import { ProductService } from './services/product.service';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    NavBarComponent,
    ProductListComponent,
    HttpClientModule,
    ProductDetailsComponent,
    ProductsByCategoryComponent,
    FooterComponent,
    SidebarComponent,
    TranslateModule
  ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = '2B-Egypt.Angular_UI';
  lang: string = '';
  products: IProduct[] = [] as IProduct[];
  filteredProducts: IProduct[] = [] as IProduct[];

  constructor(private productService: ProductService, private _LanguageService: LanguageServiceService, private translate:TranslateService)
  {

}
  ngOnInit(): void {
    this._LanguageService.getlanguage().subscribe({
      next: (lang) => {
        this.lang = lang;
      },
    });
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.filteredProducts = [...this.products];
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  changelang() {
    const newLang = this.lang === 'en' ? 'ar' : 'en';
    this._LanguageService.cahngelanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    this.lang = newLang;
    this.translate.use(newLang);
  }
  switchLanguage(event: Event): void {
    const selectElement = event.target as HTMLSelectElement | null;
    if (selectElement) {
      const language = selectElement.value || 'en'; 
      this.translate.use(language);
      
      
    }}

  applyFilters(filteredProducts: IProduct[]) {
    this.filteredProducts = filteredProducts;
    console.log(this.filteredProducts);
  }
}