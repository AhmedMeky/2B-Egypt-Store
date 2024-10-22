import { Routes } from '@angular/router';
import { ProductListComponent } from './Shared/Components/product-list/product-list.component';
import { NavBarComponent } from './Shared/Components/nav-bar/nav-bar.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'Categories', component: NavBarComponent },
];
