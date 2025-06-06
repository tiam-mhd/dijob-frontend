import { Component, Input, OnInit } from '@angular/core';
import { CustomerSharedModule } from '../../../shared/customer-shared.module';
import { OrderService } from '../../../../shared/services/order.service';
import { Order, OrderStatus } from '../../../../shared/models/order';
import { PersianDatePipe } from '../../../../shared/pipes/persian-date.pipe';
import { OrderItem } from '../../../../shared/models/order-item';
import { PricePipe } from '../../../../shared/pipes/price.pipe';

@Component({
  selector: 'app-order-list',
  imports: [CustomerSharedModule, PersianDatePipe, PricePipe],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [] as Order[];
  filteredOrders: Order[] = [] as Order[];
  selectedStatus: OrderStatus | 'ALL' = 'ALL';

  orderStatuses: { key: OrderStatus | 'ALL', label: string }[] = [
    { key: 'ALL', label: 'همه' },
    { key: OrderStatus.PENDING, label: 'در انتظار تأیید' },
    { key: OrderStatus.CONFIRMED, label: 'تأیید شده' },
    { key: OrderStatus.PREPARING, label: 'در حال آماده‌سازی' },
    { key: OrderStatus.DELIVERING, label: 'در حال ارسال' },
    { key: OrderStatus.COMPLETED, label: 'تحویل داده شده' },
    { key: OrderStatus.CANCELLED, label: 'لغو شده' }
  ];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOfUser(4).subscribe(res => {
      if (res.isSuccess) {
        this.orders = res.data as Order[];
        this.filterOrdersByStatus('ALL');
      }
    });
  }

  getStatusLabel(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.PENDING: return 'در حال بررسی';
      case OrderStatus.CONFIRMED: return 'تأیید شده';
      case OrderStatus.PREPARING: return 'در حال آماده‌سازی';
      case OrderStatus.DELIVERING: return 'در حال ارسال';
      case OrderStatus.COMPLETED: return 'تکمیل شده';
      case OrderStatus.CANCELLED: return 'لغو شده';
      default: return 'نامشخص';
    }
  }

  getStatusClass(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.PENDING: return 'bg-warning text-light';
      case OrderStatus.CONFIRMED: return 'bg-primary text-primary';
      case OrderStatus.PREPARING: return ' bg-info text-info';
      case OrderStatus.DELIVERING: return 'bg-light text-secondary';
      case OrderStatus.COMPLETED: return 'bg-success text-success';
      case OrderStatus.CANCELLED: return 'bg-secondary text-danger';
      default: return 'text-muted';
    }
  }

  getTotal(orderItems: OrderItem[]): number {
    return orderItems.reduce((sum, item) => {
      return sum + (item.menuItem?.price || 0) * item.quantity;
    }, 0);
  }

  filterOrdersByStatus(status: OrderStatus | 'ALL') {
    this.selectedStatus = status;
    if (status === 'ALL') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(
        o => o.status === status
      );
    }
  }
}
