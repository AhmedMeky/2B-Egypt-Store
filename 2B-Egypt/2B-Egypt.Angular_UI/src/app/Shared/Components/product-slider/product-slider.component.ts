import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../../services/product.service";
import { IProduct } from "../../../../models/IProduct";


@Component({
  selector: 'app-product-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.css']
})
export class ProductSliderComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }}
  