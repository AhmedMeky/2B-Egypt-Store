import { Component, TemplateRef, ViewChild } from '@angular/core';
// import { IPayPalConfig } from 'ngx-paypal';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './Shared/Components/product-list/product-list.component';
import { LanguageServiceService } from './services/language-service.service';
import { ProductsByCategoryComponent } from './Shared/products-by-category/products-by-category.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './Shared/product-details/product-details.component';
import { FooterComponent } from './Shared/Components/footer/footer.component';
import { NavBarComponent } from './Shared/Components/nav-bar/nav-bar.component';
import { LoginComponent } from './Shared/login/login.component';
import { SignUpComponent } from "./Shared/sign-up/sign-up.component";
// import { SliderComponent } from "./Shared/Components/slider/slider.component";
import { FormsModule } from '@angular/forms';
import { AdvertismentComponent } from "./Shared/Components/advertisment/advertisment.component"; 
import { IProduct } from '../models/IProduct';
import { ProductService } from './services/product.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxPayPalModule } from 'ngx-paypal';
// import { ToastglobalComponent } from './Shared/Components/toastglobal/toastglobal.component';
import { Toast, ToastService } from './services/toast.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, NavBarComponent,ProductListComponent, HttpClientModule, ProductDetailsComponent,ProductsByCategoryComponent, LoginComponent,FooterComponent, SignUpComponent, AdvertismentComponent,NgxPayPalModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
  providers: [ToastService], // Provide the ToastService if needed
  
})
export class AppComponent { 

  title = '2B-Egypt.Angular_UI';
  lang: string = '';
  products: IProduct[] = [] as IProduct[];
  filteredProducts: IProduct[] = [] as IProduct[];
  // this.Counter++
  counter:number=0;
  @ViewChild('toastTemplate', { static: true }) toastTemplate!: TemplateRef<any>;


  constructor(
    private productService: ProductService,
     private _LanguageService: LanguageServiceService,
      private translate:TranslateService,
      private toastService: ToastService
    )
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

  onAddToCart() {
    this.counter++;
 
} 
showToast() {
  const toast: Toast = {
    template: this.toastTemplate,
    classname: 'bg-success text-light',
    delay: 3000
  };
  this.toastService.show(toast);
}
}