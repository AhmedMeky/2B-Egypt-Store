import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IProduct } from '../../../../models/IProduct';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Cookies from 'js-cookie';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslationService } from '../../../services/translation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CartService } from '../../../ShoppingCart/Services/CartService';
import { CartItem } from '../../../ShoppingCart/Models/CartItem';
import { LanguageServiceService } from '../../../services/language-service.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule, SidebarComponent, NavBarComponent, TranslateModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [] as IProduct[];
  filteredProducts: IProduct[] = [] as IProduct[];
  currentPage = 1;
  pageSize = 6;
  totalProducts = 0;
  lang: string = 'en';

  @Output() AddToCartCounter: EventEmitter<number> = new EventEmitter<number>();
  Counter: number = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar,
    translateService: TranslateService,
    private _cartService: CartService,
    private _LanguageService: LanguageServiceService,
    public translate: TranslateService
  ) {
    this.translate = translateService;
  }

  ngOnInit(): void {
    this._LanguageService.getlanguage().subscribe({
      next: (lang) => {
        this.lang = lang;
        document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
        this.translate.use(lang);
      },
    });
    this.translate.setDefaultLang('en');
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProductsWithPagination(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.products = res.items; 
        this.filteredProducts = [...this.products];
        this.totalProducts = res.totalCount; 
        this.checkCartItems();
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  checkCartItems() {
    const cartData = Cookies.get('cartItems');
    const items = cartData ? JSON.parse(cartData) : [];
    this.products.forEach(product => {
      const item = items.find((item: IProduct) => item.id === product.id);
      product.inCart = !!item;
      product.quantity = item ? item.quantity : 1;
    });
  }

  addToCart(product: IProduct) {
    this.AddToCartCounter.emit(this.Counter);
    const cartItem: CartItem = {
      productId: product.id,
      productName: product.nameEn,
      productNamear: product.nameAr,
      price: product.price,
      quantity: product?.quantity || 1,
      totalPrice: product.price,
      image: "",
      stock: product.unitInStock
    };
    this._cartService.addToCart(cartItem);
  }

  handleQuantity(action: string, product: IProduct) {
    product.quantity = product.quantity || 0;

    if (action === 'plus' && product.quantity < product.unitInStock) {
      product.quantity += 1;
    } else if (action === 'min' && product.quantity > 0) {
      product.quantity -= 1;
    }
    this.updateCartQuantity(product);
  }

  updateCartQuantity(product: IProduct) {
    const cartData = Cookies.get('cartItems');
    if (cartData) {
      const cartItems: IProduct[] = JSON.parse(cartData);
      const existingProduct = cartItems.find((item: IProduct) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity = product.quantity;
        Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 });
      }
    }
  }

  SelectedProductId(id: string) {
    this.router.navigateByUrl(`/product-details/${id}`);
  }

  applyFilters(filteredProducts: IProduct[]) {
    this.filteredProducts = filteredProducts;
  }

  getLocalizedProductName(product: IProduct): string {
    return this.translate.currentLang === 'ar' ? product.nameAr : product.nameEn;
  }

  getLocalizedProductDescription(product: IProduct): string {
    return this.translate.currentLang === 'ar' ? product.descriptionAr : product.descriptionEn;
  }
}
