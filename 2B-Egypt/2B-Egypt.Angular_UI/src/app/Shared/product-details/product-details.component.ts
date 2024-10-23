import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../../models/IProduct';
import { FormsModule } from '@angular/forms'; 
import { CommonModule, JsonPipe } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Cookies from 'js-cookie';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IReview } from '../../../models/ireview';
import { ReviewServiceService } from '../../services/review-service.service';

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
rating: number = 0;  
Review:IReview= {} as IReview;
isLoading: boolean =true;
// stars part
@Input() ratingPrice: number = 0;
  @Input() ratingQuilty: number = 0; 
  @Input() ratingValue: number = 0; 
  @Input() starCount: number = 5; 
  @Output() ratingUpdated = new EventEmitter<number>();
  starsPrice: boolean[] = [false,false,false,false,false];
  starsQuilty: boolean[] = [false,false,false,false,false];
  starsValue: boolean[] = [false,false,false,false,false];
  // stars part

  constructor(
    private _productService: ProductService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private _ReviewService : ReviewServiceService,
    private router : Router
  ) {}
  
  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    this.Review.productId = this.route.snapshot.params['id'];
this.Review.priceRating = this.ratingPrice.toString();
this.Review.qualityRating = this.ratingQuilty.toString();
this.Review.valueRating = this.ratingValue.toString();
    // console.log(this.productId); // طباعة القيم للتحقق منها
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
//stars parts
  ratePrice(rating: number) {
    this.ratingPrice = rating;
    this.Review.priceRating =rating.toString();
    this.ratingUpdated.emit(this.ratingPrice); // Emit the new rating
    console.log('ratingPrice' , this.ratingPrice)
  }

  rateQuilty(rating: number) {
    this.ratingQuilty = rating;
    this.Review.qualityRating =rating.toString();
    this.ratingUpdated.emit(this.ratingPrice); // Emit the new rating
    console.log('ratingQuilty' , this.ratingQuilty)
  }

  rateValue(rating: number) {
    this.ratingValue = rating;
    this.Review.valueRating =rating.toString();
    this.ratingUpdated.emit(this.ratingValue); // Emit the new rating
    console.log('ratingValue' , this.ratingValue)
  }
//stars parts










  addreview() {
    // console.log(this.Review); // طباعة القيم للتحقق منها
    this._ReviewService.addReview(this.Review).subscribe({
      
      next: (res) => {
        alert("Review Added Successfully")
        // this.router.navigateByUrl(`product-details/${this.productId}`);
      },
      error: (err) => {
        console.log(err);
      },
    
    });
  }
}