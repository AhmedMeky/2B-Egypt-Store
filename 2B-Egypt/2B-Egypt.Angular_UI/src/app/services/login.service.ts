import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../models/iuser';
import {  Observable } from 'rxjs';
import { Loginuser } from '../../models/loginuser';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:5204/api/Account';
  constructor(private httpclient: HttpClient) {}
  UserRegister(user: IUser): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpclient.post(`${this.apiUrl}/Register`, user, { headers });
  }

  login(loginuser: Loginuser): Observable<any> {
    return this.httpclient.post(`${this.apiUrl}/Login`, loginuser);
  }
  logout() {
    sessionStorage.removeItem('token');
  }
}
