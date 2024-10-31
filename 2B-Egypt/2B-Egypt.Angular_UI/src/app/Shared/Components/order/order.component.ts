import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { IOrder } from '../../../../models/iorder';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  order:IOrder = {} as IOrder

constructor(private _order:OrderService)
{

}
createOrder()
{
  this._order.creatOrder(this.order).subscribe({
    next: (res) => {
      this.order = res
    },
    error: (err) => {
    },
})
}
}
