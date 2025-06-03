import { Component } from '@angular/core';
import { CoreSharedModule } from '../../../../shared/core-shared.module';
import { MenuItem } from '../../../../shared/models/menu-item';
import { BehaviorSubject } from 'rxjs';
import { OrderItem } from '../../../../shared/models/order-item';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../../../shared/services/order.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CoreSharedModule],
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.scss']
})
export class CartDrawerComponent {
  isOpen = false;

  orderId: number = 0;
  orderItems: OrderItem[] = [] as OrderItem[];
  orderItemsCount: number = 0;

  constructor(private cartService: CartService, private orderService: OrderService) {
    this.cartService.cart$.subscribe(items => {
      this.orderItems = items;
      this.orderItemsCount = items.filter(oi => oi.quantity > 0).length;
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

  fromInCartToOrder(){
    let orderId = (this.orderItems.length > 0)? this.orderItems[0].orderId : 0;
    this.orderService.fromInCartToOrder(orderId).subscribe(res=>{
      if (res.isSuccess) {
        this.orderItems = [];
      }else{
        
      }
    });
  }
}
