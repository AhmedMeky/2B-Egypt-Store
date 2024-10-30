import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IShippingData } from '../../models/ishipping-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private apiUrl = 'http://localhost:5204/api/Account/AddAddress';



  constructor(private httpclient: HttpClient) { 

  }
  addAddress(email:string , address: IShippingData):Observable<IShippingData> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const params = new HttpParams().set('email', email);

    return this.httpclient.post<IShippingData>(this.apiUrl, JSON.stringify(address),{headers,params} );
  }
}
