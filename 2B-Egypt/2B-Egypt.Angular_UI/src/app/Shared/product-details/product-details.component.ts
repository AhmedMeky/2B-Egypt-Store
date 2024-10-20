import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../../models/IProduct';
import { FormsModule } from '@angular/forms'; 
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports :  [FormsModule,JsonPipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']  
})
export class ProductDetailsComponent implements OnInit {  
  id: string = "6e2c3398-479c-474c-934a-1a50c8b00257"; 
 product: IProduct | null = null;

  constructor(private _productService: ProductService) { 
  }

  ngOnInit() {
  
    this._productService.getProductById(this.id).subscribe({
      next: (res) => {
        console.log(res)
        this.product = res;
        console.log(this.product)


      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
