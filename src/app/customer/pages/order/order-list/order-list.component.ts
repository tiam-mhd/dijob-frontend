import { Component } from '@angular/core';
import { CustomerSharedModule } from '../../../shared/customer-shared.module';

@Component({
  selector: 'app-order-list',
  imports: [CustomerSharedModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent {

}
