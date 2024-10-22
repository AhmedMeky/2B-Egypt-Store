import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../../models/IProduct';
import { ICategory } from '../../models/icategory';
import { CategorywithSubcategories } from '../../models/categorywith-subcategories';
@Injectable({
  providedIn: 'root',
})
export class CategoryService { 
 
  private apiUrl = 'http://localhost:5204/api/Category';
  constructor(private httpclient: HttpClient) {}
  getParentCategories(): Observable<ICategory[]> {
    return this.httpclient.get<ICategory[]>(`${this.apiUrl}/ParentCategories`);
  }
  getAllCategories(): Observable<ICategory[]> {
    return this.httpclient.get<ICategory[]>(`${this.apiUrl}/getAllCategories`);
  }
  getSubCategoriesByParentID(Id:string): Observable<ICategory[]>  {
    return this.httpclient.get<ICategory[]>(`${this.apiUrl}/SubCategoriesForOneCategory?id=${Id}`);
  } 
 
}
