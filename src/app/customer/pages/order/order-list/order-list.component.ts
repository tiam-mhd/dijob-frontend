import { Component, Input, OnInit } from '@angular/core';
import { CustomerSharedModule } from '../../../shared/customer-shared.module';
import { OrderService } from '../../../../shared/services/order.service';
import { Order, OrderStatus } from '../../../../shared/models/order';
import { PersianDatePipe } from '../../../../shared/pipes/persian-date.pipe';
import { OrderItem } from '../../../../shared/models/order-item';

@Component({
  selector: 'app-order-list',
  imports: [CustomerSharedModule, PersianDatePipe],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [] as Order[];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOfUser(4).subscribe(res => {
      if (res.isSuccess) {
        this.orders = res.data as Order[];
      }
    });
  }

  getStatusLabel(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.PENDING: return 'در انتظار تأیید';
      case OrderStatus.CONFIRMED: return 'تأیید شده';
      case OrderStatus.PREPARING: return 'در حال آماده‌سازی';
      case OrderStatus.DELIVERING: return 'در حال ارسال';
      case OrderStatus.COMPLETED: return 'تحویل داده شده';
      case OrderStatus.CANCELLED: return 'لغو شده';
      default: return 'نامشخص';
    }
  }

  getStatusClass(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.PENDING: return 'bg-warning text-light';
      case OrderStatus.CONFIRMED: return 'text-primary';
      case OrderStatus.PREPARING: return ' text-info';
      case OrderStatus.DELIVERING: return 'text-secondary';
      case OrderStatus.COMPLETED: return 'text-success';
      case OrderStatus.CANCELLED: return 'text-danger';
      default: return 'text-muted';
    }
  }

  getTotal(orderItems: OrderItem[]): number {
    return orderItems.reduce((sum , item) => {
      return sum + (item.menuItem?.price || 0) * item.quantity;
    }, 0);
  }
}
