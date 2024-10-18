import { Component } from '@angular/core';
import { IProduct } from '../../../../models/IProduct';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  
  productQuantity:number=1;
  removeCart=false;
  cartData:IProduct[] = [] as IProduct[];
  products: IProduct[] = [] as IProduct[];
  constructor(private productService: ProductService,private activeRoute:ActivatedRoute) {}
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
  handleQuantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1;
    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1;
    }
  }

  // addToCart(){
  //   if(this.products){
  //     this.products.quantity = this.productQuantity;
  //     if(!localStorage.getItem('user')){
  //       this.productService.localAddToCart(this.products);
  //       this.removeCart=true
  //     }else{
  //       let user = localStorage.getItem('user');
  //       let userId= user && JSON.parse(user).id;
  //       let cartData:cart={
  //         ...this.products,
  //         productId:this.products.id,
  //         userId
  //       }
  //       delete cartData.id;
  //       this.productService.addToCart(cartData).subscribe((result)=>{
  //         if(result){
  //          this.productService.getCartList(userId);
  //          this.removeCart=true
  //         }
  //       })        
  //     }
      
  //   } 
  // }
//   removeToCart(productId:number){
//     if(!localStorage.getItem('user')){
// this.product.removeItemFromCart(productId)
//     }else{
//       console.warn("cartData", this.cartData);
      
//       this.cartData && this.product.removeToCart(this.cartData.id)
//       .subscribe((result)=>{
//         let user = localStorage.getItem('user');
//         let userId= user && JSON.parse(user).id;
//         this.product.getCartList(userId)
//       })
//     }
//     this.removeCart=false
//   }
}
