import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IProduct } from '../../../models/IProduct';
import Cookies from 'js-cookie';
import { SidebarComponent } from '../Components/sidebar/sidebar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CartItem } from '../../ShoppingCart/Models/CartItem';
import { CartService } from '../../ShoppingCart/Services/CartService';

@Component({
  selector: 'app-products-by-category',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule,SidebarComponent,TranslateModule],
  templateUrl: './products-by-category.component.html',
  styleUrl: './products-by-category.component.css',
})
export class ProductsByCategoryComponent implements OnInit {
  imgmvcurl = 'http://localhost:5269/img/';
  @Output() AddToCartCounter: EventEmitter<number> = new EventEmitter<number>();
  Counter: number = 0;

  products: IProduct[] = [] as IProduct[];
  filteredProducts: IProduct[] = [] as IProduct[];
  public translate: TranslateService;
  categoryId!: string;
  pageNumber: number = 1; 
  pageSize: number = 8; 
  totalProducts: number = 0; 
  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    translateService: TranslateService,
    private _cartService:CartService
  ) {this.translate = translateService;}

  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.categoryId = params.get('id')!;
        this.getProductsByCategoryId(this.categoryId, this.pageNumber, this.pageSize);(this.categoryId);
    });
    
      this.checkCartItems()
    
};
getProductsByCategoryId(categoryId: string, pageNumber: number, pageSize: number): void {
  this.productService.getProductsByCategoryIdWithPagination(categoryId, pageNumber, pageSize).subscribe({
    next: (res) => {
      this.products = res.items; 
      this.totalProducts = res.totalCount; 
      console.log('Fetched products:', this.products);
    },
    error: (error) => {
      console.error('Error fetching products by category:', error);
    },
  });
}
onPageChange(page: number): void {
  this.pageNumber = page;
  this.getProductsByCategoryId(this.categoryId, this.pageNumber, this.pageSize);
}
// getProductsByCategoryIdt(categoryId: string): void {
//   this.productService.getProductsByCategoryId(categoryId).subscribe({
//     next: (res) => {
//       this.products = res;
//       console.log('Fetched products:', this.products);  
//       this.products.forEach(product => {
//         console.log('Product Images Array:', product.images);
//         if (product.images.length > 0) {
//           console.log('Product Image URL:', product.images[0]?.imageUrl); 
//         } else {
//           console.log('No images for this product');
//         }
//       });
//     },
//     error: (error) => {
//       console.error('Error fetching products by category:', error);
//     },
//   });
// }

  checkCartItems() {
    const cartData = Cookies.get('cartItems');
    const items = cartData ? JSON.parse(cartData) : [];
    this.products.forEach((product) => {
      const item = items.find((item: IProduct) => item.id === product.id);
      product.inCart = !!item;
      product.quantity = item ? item.quantity : 1;
    });
  }
  addToCart(product: IProduct)
  {
    console.log(product)
    this.AddToCartCounter.emit(this.Counter)
        const cartItem: CartItem = {
          productId: (product.id),
          productName: product.nameEn,
          productNamear: product.nameAr,
          price: product.price - (product.price * product.discount) / 100 ,
          quantity: product?.quantity || 1,
          totalPrice: product.price,
          discount:product.discount,
          // image: product.images.find(i => i.imageUrl === product.image)?.imageUrl || ''
          image: "",
          stock: product.unitInStock 
    
        };
        this._cartService.addToCart(cartItem);
  }

  removeFromCart(productId: number) {
    let cartData = Cookies.get('cartItems');
    if (cartData) {
      let cartItems: IProduct[] = JSON.parse(cartData);
      cartItems = cartItems.filter(
        (item: IProduct) => Number(item.id) !== productId
      );
      Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 });

      if (cartItems.length === 0) {
        Cookies.remove('cartItems');
      }
    }
  }

  handleQuantity(action: string, product: IProduct) {
    product.quantity = product.quantity || 1;

    if (action === 'plus' && product.quantity < 20) {
      product.quantity += 1;
    } else if (action === 'min' && product.quantity > 1) {
      product.quantity -= 1;
    }
    this.updateCartQuantity(product);
  }

  updateCartQuantity(product: IProduct) {
    const cartData = Cookies.get('cartItems');
    if (cartData) {
      const cartItems: IProduct[] = JSON.parse(cartData);
      const existingProduct = cartItems.find(
        (item: IProduct) => item.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity = product.quantity;
        Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 });
      }
    }
  }
  SelectedProductId(id:string)
  {
    this.router.navigateByUrl(`/product-details/${id}`);

  }
  applyFilters(filteredProducts: IProduct[]) {
    this.filteredProducts = filteredProducts;
    console.log(this.filteredProducts); 
  }
  getLocalizedProductName(product: IProduct): string {
    const lang = this.translate.currentLang; 
    return lang === 'ar' ? product.nameAr : product.nameEn;
  }

  getLocalizedProductDescription(product: IProduct): string {
    const lang = this.translate.currentLang;
    return lang === 'ar' ? product.descriptionAr : product.descriptionEn;
  }
}