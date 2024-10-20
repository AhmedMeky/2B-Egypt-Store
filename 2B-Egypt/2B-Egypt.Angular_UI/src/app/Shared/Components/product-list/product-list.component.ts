import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../../models/IProduct';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [] as IProduct[];
  cartData: IProduct | undefined;
  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private router: Router,

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
  goToDetails(id: number) {
    this.router.navigate(['products', id]).then(() => {
      console.log('Navigation to product details completed');
    });
  }
  checkCartItems() {
    let cartData = Cookies.get('cartItems'); 
    if (cartData) {
      let items = JSON.parse(cartData);
      this.products.forEach((product) => {
        let item = items.find((item: IProduct) => item.id === product.id);
        if (item) {
          product.inCart = true;
          product.quantity = item.quantity;
        } else {
          product.inCart = false;
        }
      });
    }
  }

 

  addToCart(product: IProduct) {
    let cartData = Cookies.get('cartItems'); 
    let cartItems: IProduct[] = cartData ? JSON.parse(cartData) : []; 

    const existingProduct = cartItems.find(
      (item: IProduct) => item.id === product.id
    ); 
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
      cartItems = cartItems.filter(
        (item: IProduct) => Number(item.id) !== productId
      );
      Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 });

      if (cartItems.length === 0) {
        Cookies.remove('cartItems'); 
      }
    }

    let product = this.products.find((p) => Number(p.id) === productId);
    if (product) {
      product.inCart = false;
      product.quantity = 1; 
    }
  }
  handleQuantity(action: string, product: IProduct) {
    if (product.quantity === undefined) {
        product.quantity = 1; 
    }

    if (action === 'plus' && product.quantity < 20) {
        product.quantity += 1;
    } else if (action === 'min' && product.quantity > 1) {
        product.quantity -= 1;
    }
    this.updateCartQuantity(product);
}

updateCartQuantity(product: IProduct) {
    let cartData = Cookies.get('cartItems'); 

    if (cartData) {
        let cartItems: IProduct[] = JSON.parse(cartData);
        const existingProduct = cartItems.find((item: IProduct) => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity = product.quantity; 
            Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 }); 
        }
    }
}

}
