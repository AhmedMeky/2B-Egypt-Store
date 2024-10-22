import { Routes } from '@angular/router';
import { ProductListComponent } from './Shared/Components/product-list/product-list.component';
import { ProductsByCategoryComponent } from './Shared/products-by-category/products-by-category.component';
import { ProductDetailsComponent } from './Shared/product-details/product-details.component';

export const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'category/:id', component: ProductsByCategoryComponent },
    { path: 'product-details/:id', component: ProductDetailsComponent},
];
