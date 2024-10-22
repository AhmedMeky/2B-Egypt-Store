import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../../models/IProduct';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Cookies from 'js-cookie';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [] as IProduct[];
  imgmvcurl = 'http://localhost:5269/img/';
  cartData: IProduct | undefined;
  SelectedProduct:IProduct | null = null;
  constructor(
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.checkCartItems();
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
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
    if (!product.unitInStock || product.unitInStock <= 0) {
      this.snackBar.open('Cannot add product to cart. Quantity must be greater than zero.', 'Close', {
        duration: 3000,
      });
      return;
    }
    let cartData = Cookies.get('cartItems');
    let cartItems: IProduct[] = cartData ? JSON.parse(cartData) : [];
    const existingProduct = cartItems.find((item: IProduct) => item.id === product.id);
    const quantityToAdd = product.quantity || 1;

    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 0) + quantityToAdd;
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
      cartItems = cartItems.filter((item: IProduct) => Number(item.id) !== productId);
      Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 });

      if (cartItems.length === 0) {
        Cookies.remove('cartItems');
      }
    }
  }

  handleQuantity(action: string, product: IProduct) {
    product.quantity = product.quantity || 1;
    product.quantity = product.quantity || 0;

    if (action === 'plus' && product.quantity < 20) {
    if (action === 'plus' && product.quantity < product.unitInStock) {
      product.quantity += 1;
    } else if (action === 'min' && product.quantity > 1) {
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
  SelectedProductId(id:string)
  {
    this.router.navigateByUrl(`/product-details/${id}`);

  }
}



