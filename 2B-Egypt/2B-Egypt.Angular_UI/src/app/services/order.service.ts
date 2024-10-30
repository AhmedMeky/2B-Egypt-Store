import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../../models/iorder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5204/api/Order/CreateOrder';

  
  constructor(private httpclient: HttpClient) { 

  }
  creatOrder( order:IOrder):Observable<IOrder> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });
    return this.httpclient.post<IOrder>(this.apiUrl,order,{headers} );
  }
}
