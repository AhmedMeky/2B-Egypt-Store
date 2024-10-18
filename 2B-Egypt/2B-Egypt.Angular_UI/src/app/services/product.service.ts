import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl: 'https://localhost:61044/api/products' | undefined; //Link Api :Not fixed, variable depending on port
  constructor(private httpclient: HttpClient) {}
  getAllProducts(): Observable<IProduct[]> {
    return this.httpclient.get<IProduct[]>(`${this.apiUrl}`);
  }
  getProductById(id: string): Observable<IProduct> {
    return this.httpclient.get<IProduct>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: IProduct): Observable<IProduct> {
    return this.httpclient.post<IProduct>(`${this.apiUrl}`, product);
  }

  updateProduct(id: string, product: IProduct): Observable<IProduct> {
    return this.httpclient.put<IProduct>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.httpclient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
