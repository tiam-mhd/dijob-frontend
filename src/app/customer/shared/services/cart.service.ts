import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderItem } from '../../../shared/models/order-item';
import { MenuItem } from '../../../shared/models/menu-item';
import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items = new Map<number, OrderItem>();
  private cartSubject = new BehaviorSubject<OrderItem[]>([]);

  constructor(private orderService: OrderService) { }

  getCartOfUser() {
    this.orderService.getCartOfUser(4, 1).subscribe(res => {
      if (res.isSuccess && res.data){
        const cart: Order = (res.data as any);
        const i = new Map<number, OrderItem>();
        cart.items.forEach(item => {
          if (!i.has(item.menuItemId))
            i.set(item.menuItemId, { ...item, quantity: item.quantity } as OrderItem);
        });
        this.items = i;
        this.updateCart()
      }
    });
  }

  cart$ = this.cartSubject.asObservable();

  addToCart(item: OrderItem) {
    if (this.items.has(item.id)) return;
    this.items.set(item.id, { ...item, quantity: 1 } as OrderItem);
    this.updateCart();
  }
  
  getItems(): OrderItem[] {
    return Array.from(this.items.values()) as OrderItem[];
  }

  increase(item: OrderItem) {
    const itemcard = this.items.get(item.id);
    if (itemcard) {
      itemcard.quantity++;
      this.updateCart();
    } else {
      this.addToCart(item)
    }
  }

  decrease(id: number) {
    const item = this.items.get(id);
    if (item) {
      item.quantity--;
      // if (item.quantity <= 0) this.items.delete(id);
      this.updateCart();
    }
  }

  getItemCount(id: number): number {
    return this.items.get(id)?.quantity || 0;
  }

  getTotalCount(): number {
    let total = 0;
    for (const item of this.items.values()) total += item.quantity;
    return total;
  }

  clearCart(){
    this.items.clear();
    this.updateCart();
  }

  private updateCart() {
    this.cartSubject.next(Array.from(this.items.values()));
  }
}
