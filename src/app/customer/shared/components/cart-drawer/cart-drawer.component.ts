import { Component } from '@angular/core';
import { CoreSharedModule } from '../../../../shared/core-shared.module';
import { MenuItem } from '../../../../shared/models/menu-item';
import { BehaviorSubject } from 'rxjs';
import { OrderItem } from '../../../../shared/models/order-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CoreSharedModule],
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.scss']
})
export class CartDrawerComponent {
  isOpen = false;


  orderItems: OrderItem[] = [] as OrderItem[];

  constructor(private cartService:CartService){
    this.cartService.cart$.subscribe(items => {
      this.orderItems = items;
    });
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  getTotal(): number {
    return this.orderItems.reduce((sum, item) => sum + item.quantity * item.menuItem.price, 0);
  }

}
