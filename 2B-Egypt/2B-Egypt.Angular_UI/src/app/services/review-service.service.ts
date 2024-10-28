import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReview } from '../../models/ireview';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {
  private apiUrl = 'http://localhost:5204/api/Review';
  constructor(private httpclient: HttpClient) 
  {

   }
   addReview(review: IReview):Observable<IReview> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpclient.post<IReview>(this.apiUrl, JSON.stringify(review),{headers} );
  }
}
