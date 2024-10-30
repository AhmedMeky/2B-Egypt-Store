import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:5204/api/Order';

  constructor(private http: HttpClient) {}

  getAllOrders(userId: string): Observable<any> {
    const url = `${this.baseUrl}/GetAll`;
    return this.http.get(url, {
      params: { userId: userId },
    });
  }
}
