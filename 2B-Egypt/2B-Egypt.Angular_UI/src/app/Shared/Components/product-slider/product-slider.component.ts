import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { IProduct } from '../../../../models/IProduct';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-slider',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.css'],
})
export class ProductSliderComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private productService: ProductService,  public translate: TranslateService
  ) {}
  productGroups: IProduct[][] = [];

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.splitProductsIntoGroups();
    });
  }

  splitProductsIntoGroups(): void {
    const groupSize = 4;
    for (let i = 0; i < this.products.length; i += groupSize) {
      this.productGroups.push(this.products.slice(i, i + groupSize));
    }
  }
  getLocalizedProductName(product: IProduct): string {
    return this.translate.currentLang === 'ar' ? product.nameAr : product.nameEn;
  }
}
