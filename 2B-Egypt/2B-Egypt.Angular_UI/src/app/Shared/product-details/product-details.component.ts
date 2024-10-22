import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../../models/IProduct';
import { FormsModule } from '@angular/forms'; 
import { JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Cookies from 'js-cookie';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']  
})
export class ProductDetailsComponent implements OnInit {  
  product: IProduct | undefined = undefined;
  productId: string  | null = null;

  constructor(
    private _productService: ProductService,
    private route: ActivatedRoute 
  ) { }

  ngOnInit() {

    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this._productService.getProductById(this.productId).subscribe({
        next: (res) => {
          console.log(res);
          this.product = res; 
        },
        error: (err) => {
          console.log(err);
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

}