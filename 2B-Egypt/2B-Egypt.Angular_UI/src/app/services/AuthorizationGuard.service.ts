import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    const userToken = sessionStorage.getItem('token');
    if (!userToken) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
