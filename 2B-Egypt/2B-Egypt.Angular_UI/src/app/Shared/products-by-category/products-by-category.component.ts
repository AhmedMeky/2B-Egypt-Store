import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IProduct } from '../../../models/IProduct';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-products-by-category',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './products-by-category.component.html',
  styleUrl: './products-by-category.component.css',
})
export class ProductsByCategoryComponent implements OnInit {
  @Input() categoryId!: string;
  products: IProduct[] = [] as IProduct[];
 

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.categoryId = params.get('id')!;
        this.getProductsByCategoryId(this.categoryId);
    });
}

   
  

  getProductsByCategoryId(categoryId: string): void {
    this.productService.getProductsByCategoryId(categoryId).subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (error) => {
        console.error('Error fetching products by category:', error);
      },
    });
  }


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
}
