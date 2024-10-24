import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { IProduct } from '../../../../models/IProduct';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  selectedCategory = 'all';
  selectedProductName = '';
  categories: any[] = [];
  products: IProduct[] = [];
  selectedPrice: number = 9000;
  minDiscount: number = 0;

  @Output() filterChange = new EventEmitter<IProduct[]>();

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  filterProducts(): void {
    let filteredProducts: IProduct[] = [];
    const categoryFilter = this.selectedCategory !== 'all'
      ? this.productService.getProductsByCategoryId(this.selectedCategory)
      : this.productService.getAllProducts();

    categoryFilter.subscribe({
      next: (products) => {
        filteredProducts = products;
        if (this.selectedProductName) {
          this.productService.FilterwithName(this.selectedProductName).subscribe({
            next: (productsByName) => {
              filteredProducts = filteredProducts.filter((product) =>
                productsByName.some((p) => p.id === product.id)
              );

              filteredProducts = filteredProducts.filter(
                (product) => product.price <= this.selectedPrice
              );

              filteredProducts = filteredProducts.filter(
                (product) => product.discount >= this.minDiscount
              );

              this.filterChange.emit(filteredProducts);
            },
            error: (error) => {
              console.error('Error fetching filtered products by name:', error);
            },
          });
        } else {
          filteredProducts = filteredProducts.filter(
            (product) => product.price <= this.selectedPrice
          );

          filteredProducts = filteredProducts.filter(
            (product) => product.discount >= this.minDiscount
          );

          this.filterChange.emit(filteredProducts);
        }
      },
      error: (error) => {
        console.error('Error fetching filtered products by categoryId:', error);
      },
    });
  }

 
}
