import { Component } from '@angular/core';
import { CustomerSharedModule } from '../../shared/customer-shared.module';

@Component({
  selector: 'app-order',
  imports: [CustomerSharedModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {

}
