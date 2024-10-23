import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../../models/IProduct';
import { FormsModule } from '@angular/forms'; 
import { CommonModule, JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Cookies from 'js-cookie';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, JsonPipe,CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']  
})
export class ProductDetailsComponent implements OnInit {  
  product: IProduct = {} as IProduct;
  productId: string | null = null;
  PriceAfterSale: number = 0;
IsMoreInfo:boolean=true;
  constructor(
    private _productService: ProductService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this._productService.getProductById(this.productId).subscribe({
        next: (res) => {
          this.product = res; 
          this.PriceAfterSale = this.product.price - (this.product.discount * 0.01 * this.product.price);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
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
  activateTab(showMoreInfo: boolean) {
    this.IsMoreInfo = showMoreInfo; 
  }
}
