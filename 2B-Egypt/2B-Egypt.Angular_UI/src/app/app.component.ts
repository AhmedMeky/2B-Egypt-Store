import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './Shared/Components/product-list/product-list.component';
import { LanguageServiceService } from './services/language-service.service';
import { ProductsByCategoryComponent } from './Shared/products-by-category/products-by-category.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './Shared/product-details/product-details.component';
import { FooterComponent } from './Shared/Components/footer/footer.component';

import { NavBarComponent } from './Shared/Components/nav-bar/nav-bar.component';

import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './Shared/Components/sidebar/sidebar.component';
import { IProduct } from '../models/IProduct';

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
    NavBarComponent,
  ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = '2B-Egypt.Angular_UI';
  lang: string = '';
  // this.Counter++
  counter:number=0;


  constructor(private _LanguageService: LanguageServiceService) {}
  ngOnInit(): void {
    this._LanguageService.getlanguage().subscribe({
      next: (lang) => {
        this.lang = lang;
      },
    });
  }
  changelang() {
    this._LanguageService.cahngelanguage(this.lang == 'en' ? 'ar' : 'en');
  }
  onAddToCart() {
    this.counter++;
 
}
}
