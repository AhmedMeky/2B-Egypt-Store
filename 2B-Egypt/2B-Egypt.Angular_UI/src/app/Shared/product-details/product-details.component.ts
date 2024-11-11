import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../../models/IProduct';
import { FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Cookies from 'js-cookie';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IReview } from '../../../models/ireview';
import { ReviewServiceService } from '../../services/review-service.service';
import { CartService } from '../../ShoppingCart/Services/CartService';
import { CartItem } from '../../ShoppingCart/Models/CartItem';
import { ICategory } from '../../../models/icategory';
import { IBrand } from '../../../models/ibrand';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, JsonPipe, CommonModule, TranslateModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct = {} as IProduct;
  catogary: ICategory = {} as ICategory;
  brand: IBrand = {} as IBrand;
  imgmvcurl = 'http://localhost:5204/img/';
  productId: string | null = null;
  cart: CartItem = {} as CartItem;
  PriceAfterSale: number = 0;
  IsMoreInfo: boolean = true;
  rating: number = 0;
  Review: IReview = {} as IReview;
  // ratings: { [key: string]: number } = { price: 0, quality: 0, value: 0 };
  // stars = Array(3).fill([false, false, false, false, false]);
  isLoading: boolean = true;
  @Output() AddToCartCounter: EventEmitter<number>;
  Counter: number = 0;
  // stars part
  @Input() ratingPrice: number = 0;
  @Input() ratingQuilty: number = 0;
  @Input() ratingValue: number = 0;
  @Input() starCount: number = 5;
  @Output() ratingUpdated = new EventEmitter<number>();
  starsPrice: boolean[] = [false, false, false, false, false];
  starsQuilty: boolean[] = [false, false, false, false, false];
  starsValue: boolean[] = [false, false, false, false, false];
  public translate: TranslateService;
  // stars part
  constructor(
    private _productService: ProductService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private _ReviewService: ReviewServiceService,
    private router: Router,
    private _cartService: CartService,
    translateService: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this.translate = translateService;
    this.AddToCartCounter = new EventEmitter<number>();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id')!;
      this.Review.productId = this.productId;
      this.Review.priceRating = this.ratingPrice.toString();
      this.Review.qualityRating = this.ratingQuilty.toString();
      this.Review.valueRating = this.ratingValue.toString();

      if (this.productId) {
        // Fetch product data based on new product ID
        this._productService.getProductById(this.productId).subscribe({
          next: (res) => {
            this.product = res;
            console.log('ssssssssssss' ,   this.product)
            this.PriceAfterSale =
              this.product.price -
              this.product.discount * 0.01 * this.product.price;
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  // ngOnInit() {
    // this.route.paramMap.subscribe((params) => {
    //   this.productId = params.get('id')!;
    //   // this.Review.productId = this.productId;
    //   // this.Review.priceRating = this.ratingPrice.toString();
    //   // this.Review.qualityRating = this.ratingQuilty.toString();
    //   // this.Review.valueRating = this.ratingValue.toString();

    //   if (this.productId) {
    //     // Fetch product data based on new product ID
    //     this._productService.getProductById(this.productId).subscribe({
    //       next: (res) => {
    //         this.product = res;
    //         this.PriceAfterSale =
    //           this.product.price -
    //           this.product.discount * 0.01 * this.product.price;
    //       },
    //       error: (err) => {
    //         console.log(err);
    //       },
    //     });
    //   }
    // });
  //}
  addToCart() {
    this._cartService.addToCartCounter();
    console.log(this.product);
    this.AddToCartCounter.emit(this.Counter);

    const cartItem: CartItem = {
      productId: this.product.id,
      productName: this.product.nameEn,
      price: this.product.price - (this.product.price * this.product.discount) / 100,
      quantity: this.product?.quantity || 1,
      totalPrice: this.product.price,
      productNamear: this.product.nameAr,
      discount:this.product.discount,
      image: this.product.images[0].imageUrl,
      stock: this.product.unitInStock,
    };
    this._cartService.addToCart(cartItem);
    this.snackBar.open(this.translate.instant('ADD_TO_CART'), 'Close', {
      duration: 2000,
    });
  }

  getLocalizedProductName(): string {
    return this.translate.currentLang === 'ar'
      ? this.product.nameAr
      : this.product.nameEn;
  }

  getLocalizedProductDescription(): string {
    return this.translate.currentLang === 'ar'
      ? this.product.descriptionAr
      : this.product.descriptionEn;
  }
  getLocalizedcatogary(): string {
    if (this.translate.currentLang === 'ar') {
      return this.product?.category?.nameAr || '';
    } else {
      return this.product?.category?.nameEn || ''; 
    }
  }
  
  getLocalizedbrand(): string {
    return this.translate.currentLang === 'ar'
      ? this.product.brand?.nameAr ?? 'Default Brand Name'
      : this.product.brand?.nameEn ?? 'Default Brand Name';
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }

  activateTab(showMoreInfo: boolean) {
    this.IsMoreInfo = showMoreInfo;
  }
  //stars parts
  ratePrice(rating: number) {
    this.ratingPrice = rating;
    this.Review.priceRating = rating.toString();
    this.ratingUpdated.emit(this.ratingPrice);
    console.log('ratingPrice', this.ratingPrice);
  }

  rateQuilty(rating: number) {
    this.ratingQuilty = rating;
    this.Review.qualityRating = rating.toString();
    this.ratingUpdated.emit(this.ratingPrice);
    console.log('ratingQuilty', this.ratingQuilty);
  }

  rateValue(rating: number) {
    this.ratingValue = rating;
    this.Review.valueRating = rating.toString();
    this.ratingUpdated.emit(this.ratingValue);
    console.log('ratingValue', this.ratingValue);
  }
  //stars parts
  addreview() {
    this._ReviewService.addReview(this.Review).subscribe({
      next: (res) => {
        var check = sessionStorage.getItem('token')
        if(check)
        {
          this.Review = {} as IReview;
          this.ratingPrice = 0;
          this.ratingQuilty = 0;
          this.ratingValue = 0;
        }
        else
        {
          this.router.navigate(['/login'])
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}