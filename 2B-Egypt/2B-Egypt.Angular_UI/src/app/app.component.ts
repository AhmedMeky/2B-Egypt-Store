import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './Shared/Components/product-list/product-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './Shared/product-details/product-details.component';
import { FooterComponent } from './Shared/Components/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProductListComponent,HttpClientModule,ProductDetailsComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent {
  title = '2B-Egypt.Angular_UI';
}
