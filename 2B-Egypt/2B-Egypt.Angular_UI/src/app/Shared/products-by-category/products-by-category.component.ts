import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IProduct } from '../../../models/IProduct';
import Cookies from 'js-cookie';
import { SidebarComponent } from '../Components/sidebar/sidebar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-products-by-category',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule,SidebarComponent,TranslateModule],
  templateUrl: './products-by-category.component.html',
  styleUrl: './products-by-category.component.css',
})
export class ProductsByCategoryComponent implements OnInit {
  imgmvcurl = 'http://localhost:5269/img/';

  products: IProduct[] = [] as IProduct[];
  filteredProducts: IProduct[] = [] as IProduct[];
  public translate: TranslateService;
  categoryId!: string;
  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    translateService: TranslateService
    
  ) {this.translate = translateService;}

  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.categoryId = params.get('id')!;
        this.getProductsByCategoryIdt(this.categoryId);
    });
    
      this.checkCartItems()
    
};
getProductsByCategoryIdt(categoryId: string): void {
  this.productService.getProductsByCategoryId(categoryId).subscribe({
    next: (res) => {
      this.products = res;
      console.log('Fetched products:', this.products);  
      this.products.forEach(product => {
        console.log('Product Images Array:', product.images);
        if (product.images.length > 0) {
          console.log('Product Image URL:', product.images[0]?.imageUrl); 
        } else {
          console.log('No images for this product');
        }
      });
    },
    error: (error) => {
      console.error('Error fetching products by category:', error);
    },
  });
}


// getProductsByCategoryIdt(categoryId: string): void {
//   this.productService.getProductsByCategoryId(categoryId).subscribe({
//     next: (res) => {
//       this.products = res;
//       console.log('Fetched products:', this.products);  // طباعة المنتجات
//       this.products.forEach(product => {
//         console.log('Product Image URL:', product.images[0]?.imageUrl);  // طباعة رابط الصورة
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
  addToCart(product: IProduct) {
    if (!product.unitInStock || product.unitInStock <= 0) {
      this.snackBar.open(
        'Cannot add product to cart. Quantity must be greater than zero.',
        'Close',
        {
          duration: 3000,
        }
      );
      return;
    }
    let cartData = Cookies.get('cartItems');
    let cartItems: IProduct[] = cartData ? JSON.parse(cartData) : [];
    const existingProduct = cartItems.find(
      (item: IProduct) => item.id === product.id
    );
    const quantityToAdd = product.quantity || 1;

    if (existingProduct) {
      existingProduct.quantity =
        (existingProduct.quantity || 0) + quantityToAdd;
    } else {
      cartItems.push({ ...product, quantity: quantityToAdd });
    }

    Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 });
    product.inCart = true;
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
