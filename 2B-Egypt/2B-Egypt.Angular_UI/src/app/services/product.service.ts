import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IProduct } from '../../models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  filterProductsByCategory(selectedCategory: string) {
    throw new Error('Method not implemented.');
  }
  productColors: string[] = [];
  private apiUrl = 'http://localhost:5204/api/products';
  private imgmvcurl = 'http://localhost:5269/';
  // private apiUrl = 'http://2b-sohag.runasp.net/api/products';
  // private imgmvcurl = 'http://2begypt.runasp.net/';
  // private imgmvcurl = 'http://localhost:29510/';
  constructor(private httpclient: HttpClient) {}

  getAllProducts(): Observable<IProduct[]> {
    return this.httpclient.get<IProduct[]>(this.apiUrl).pipe(
      map((products) => {
        return products.map((product) => {
          const processedProduct = this.processProductImages(product);
          console.log('Processed Product:', processedProduct);
          console.log('Product Images:', processedProduct.images);
          return processedProduct;
        });
      })
    );
  }

  processProductImages(product: IProduct): IProduct {
    if (product.images && product.images.length > 0) {
      product.images = product.images.map((image) => ({
        ...image,
        imageUrl: this.imgmvcurl + image.imageUrl,
      }));
    } else {
      product.images = [];
    }
    return product;
  }
  getProductById(id: string): Observable<IProduct> {
    return this.httpclient.get<IProduct>(`${this.apiUrl}/${id}`).pipe(
      map((product: IProduct) => {
        return this.processProductImages(product);
      })
    );
  }
  

  addProduct(product: IProduct): Observable<IProduct> {
    return this.httpclient.post<IProduct>(this.apiUrl, product);
  }

  updateProduct(id: string, product: IProduct): Observable<IProduct> {
    return this.httpclient.put<IProduct>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.httpclient.delete<void>(`${this.apiUrl}/${id}`);
  }

  FilterwithName(filters: string): Observable<IProduct[]> {
    return this.httpclient
      .get<IProduct[]>(this.apiUrl)
      .pipe(
        map((products) =>
          products
            .filter((product) =>
              product.nameEn.toLowerCase().includes(filters.toLowerCase())
            )
            .map((product) => this.processProductImages(product))
        )
      );
  }
  Filterwithprice(filters: string, maxPrice: number): Observable<IProduct[]> {
    return this.httpclient
      .get<IProduct[]>(this.apiUrl)
      .pipe(
        map((products) =>
          products
            .filter((product) => product.price <= maxPrice)
            .map((product) => this.processProductImages(product))
        )
      );
  }

  filterProductsByCategoryId(categoryId: string): Observable<IProduct[]> {
    const url = `http://localhost:5204/api/Category/${categoryId}`;
    return this.httpclient.get<IProduct[]>(url);
  }
  getProductsByCategoryId(categoryId: string): Observable<IProduct[]> {
    return this.httpclient
      .get<IProduct[]>(`${this.apiUrl}/category/${categoryId}`)
      .pipe(
        map((products) => {
          console.log('Fetched Products:', products); 
          return products.map((product) => {
            const processedProduct = this.processProductImages(product);
            console.log('Processed Product:', processedProduct);
            console.log('Product Images:', processedProduct.images);
            return processedProduct;
          });
        })
      );
  }

  FilterWithDiscount(minDiscount: number): Observable<IProduct[]> {
    return this.httpclient
      .get<IProduct[]>(this.apiUrl)
      .pipe(
        map((products) =>
          products
            .filter((product) => product.discount >= minDiscount)
            .map((product) => this.processProductImages(product))
        )
      );
  }
  getProductsWithPagination(pageNumber: number, pageSize: number): Observable<{ items: IProduct[], totalCount: number }> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.httpclient.get<{ items: IProduct[], totalCount: number }>(`${this.apiUrl}/productsWithPagination`, { params }).pipe(
      map((response) => {
        response.items = response.items.map((product: IProduct) => {
          const processedProduct = this.processProductImages(product);
          console.log('Processed Product:', processedProduct);
          console.log('Product Images:', processedProduct.images);
          return processedProduct;
        });
        return response;
      })
    );
  }
  getProductsByCategoryIdWithPagination(categoryId: string, pageNumber: number, pageSize: number): Observable<{ items: IProduct[], totalCount: number }> {
    const params = new HttpParams()
        .set('categoryId', categoryId)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString());

    return this.httpclient.get<{ items: IProduct[], totalCount: number }>(`${this.apiUrl}/productsByCategory`, { params }).pipe(
        map((response) => {
            response.items = response.items.map((product: IProduct) => this.processProductImages(product));
            console.log('Processed Products:', response.items);
            return response;
        })
    );
}
private productsSource = new BehaviorSubject<IProduct[]>([]);
  products$ = this.productsSource.asObservable();

  updateProducts(products: IProduct[]) {
    this.productsSource.next(products);}

  

}



