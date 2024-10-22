import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './Shared/Components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { LanguageServiceService } from './services/language-service.service';
import { ProductsByCategoryComponent } from './Shared/products-by-category/products-by-category.component';



@Component({
  selector: 'app-root',
  standalone: true,
imports: [ProductListComponent, RouterOutlet, HttpClientModule,ProductsByCategoryComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '2B-Egypt.Angular_UI';
  lang: string = '';

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

}
