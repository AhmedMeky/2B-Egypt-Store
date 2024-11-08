import { Routes } from '@angular/router';
import { ProductListComponent } from './Shared/Components/product-list/product-list.component';
import { ProductsByCategoryComponent } from './Shared/products-by-category/products-by-category.component';
import { ProductDetailsComponent } from './Shared/product-details/product-details.component';
import { NavBarComponent } from './Shared/Components/nav-bar/nav-bar.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './Shared/login/login.component';
import { SignUpComponent } from './Shared/sign-up/sign-up.component';
import { AuthorizationGuard } from './services/AuthorizationGuard.service';
import { CartComponent } from './ShoppingCart/Components/cart/cart.component';
import { OrderListComponent } from './Shared/Components/order-list/order-list.component';
import { ShippingReviewPaymentComponent } from './Shared/Components/shipping-review-payment/shipping-review-payment.component';
import { OrderComponent } from './Shared/Components/order/order.component';
import { OrderDetailsComponent } from './Shared/Components/order-details/order-details.component';
import { PaypalComponent } from './Shared/Components/pay-pal/pay-pal.component';


export const routes: Routes = [ 
  // { path: '', component: LoginComponent },
  // { path: '', component: ProductListComponent },
  // { path: '', component: ProductListComponent },
  { path: 'cart', component: CartComponent},
  { path: 'Signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Home', component: ProductListComponent },
  { path: 'products', component: ProductListComponent},
  { path: 'category/:id', component: ProductsByCategoryComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'Categories', component: NavBarComponent },
  { path: 'products-by-category/:id', component: ProductsByCategoryComponent },
  { path: 'order-list', component: OrderListComponent,canActivate:[AuthorizationGuard] },
  { path: 'order/:orderId', component: OrderDetailsComponent,canActivate:[AuthorizationGuard] },
  { path: 'shipping', component: ShippingReviewPaymentComponent ,canActivate:[AuthorizationGuard] },
  { path: 'order', component: OrderComponent },
  { path: 'paypal', component: PaypalComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  // { path: '**', redirectTo: '/products', pathMatch: 'full' },

];