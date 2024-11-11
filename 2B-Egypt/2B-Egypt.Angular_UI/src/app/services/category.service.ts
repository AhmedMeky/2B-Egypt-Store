// import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ICategory } from '../../models/icategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService { 
  //private apiUrl = 'http://2b-sohag.runasp.net/api/Category';
  private apiUrl = 'http://localhost:5204/api/Category';

  constructor(private httpclient: HttpClient) {}

  getParentCategories(): Observable<ICategory[]> {
    return this.httpclient.get<ICategory[]>(`${this.apiUrl}/ParentCategories`);
  }

  getAllCategories(): Observable<ICategory[]> {
    return this.httpclient.get<ICategory[]>(`${this.apiUrl}/getAllCategories`);
  }

  getSubCategoriesByParentID(id: string): Observable<ICategory[]> {
    return this.httpclient.get<ICategory[]>(`${this.apiUrl}/SubCategoriesForOneCategory?id=${id}`);
  }
}
