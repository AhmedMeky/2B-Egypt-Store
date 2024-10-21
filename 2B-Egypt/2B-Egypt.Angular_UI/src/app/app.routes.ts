import { Routes } from '@angular/router';
import { ProductListComponent } from './Shared/Components/product-list/product-list.component';

export const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'products', component: ProductListComponent }
    // { path: 'product/:id', component: ProductDetailsComponent },
    
];
