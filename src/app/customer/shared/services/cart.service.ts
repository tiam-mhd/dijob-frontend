import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderItem } from '../../../shared/models/order-item';
import { MenuItem } from '../../../shared/models/menu-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items = new Map<number, OrderItem>();
  private cartSubject = new BehaviorSubject<OrderItem[]>([]);

  constructor() { }
  
  cart$ = this.cartSubject.asObservable();

  addToCart(item: OrderItem) {
    if (this.items.has(item.id)) return;
    this.items.set(item.id, { ...item, quantity: 1 } as OrderItem);
    this.updateCart();
  }

  increase(item: OrderItem) {
    const itemcard = this.items.get(item.id);
    if (itemcard) {
      itemcard.quantity++;
      this.updateCart();
    }else{
      this.addToCart(item)
    }
  }

  decrease(id:number) {
    const item = this.items.get(id);
    console.log(item);
    
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) this.items.delete(id);
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

  private updateCart() {
    this.cartSubject.next(Array.from(this.items.values()));
    console.log(this.items);
    
  }
}
