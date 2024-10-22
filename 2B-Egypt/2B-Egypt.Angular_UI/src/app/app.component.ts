import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './Shared/Components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './Shared/Components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ProductListComponent,
    RouterOutlet,
    HttpClientModule,
    NavBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = '2B-Egypt.Angular_UI';
}
