import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../../models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://localhost:5204/api/products'; 

  constructor(private httpclient: HttpClient) {}

  getAllProducts(): Observable<IProduct[]> {
    return this.httpclient.get<IProduct[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<IProduct> {
    return this.httpclient.get<IProduct>(`${this.apiUrl}/${id}`);
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
}
