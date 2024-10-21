import { Routes } from '@angular/router';
import { ProductListComponent } from './Shared/Components/product-list/product-list.component';
import { ProductsByCategoryComponent } from './Shared/products-by-category/products-by-category.component';

export const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'products', component: ProductListComponent },
    // { path: 'product/:id', component: ProductDetailsComponent },
    { path: 'category/:id', component: ProductsByCategoryComponent }

    
];
