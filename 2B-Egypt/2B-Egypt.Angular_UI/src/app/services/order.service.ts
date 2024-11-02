import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IOrder } from '../../models/iorder';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:5204/api/Order/CreateOrder';
  private baseUrl = 'http://localhost:5204/api/Order';

  constructor(private httpclient: HttpClient) {}

  getAllOrders(userId: string): Observable<any> {
    const url = `${this.baseUrl}/GetAll`;
    return this.httpclient.get(url, {
      params: { userId: userId },
    });
  }
 
  getOrderDetails(orderId: string): Observable<any> {
    return  this.httpclient.get<any>(`${this.baseUrl}/Details/${orderId}`);
    
    
  }

  creatOrder(order: IOrder): Observable<IOrder> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpclient.post<IOrder>(this.apiUrl, order, { headers });
  }
}
