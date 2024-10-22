import { Routes } from '@angular/router';
import { ProductListComponent } from './Shared/Components/product-list/product-list.component';
import { ProductDetailsComponent } from './Shared/product-details/product-details.component';

export const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'product-details/:id', component: ProductDetailsComponent},
    
];
