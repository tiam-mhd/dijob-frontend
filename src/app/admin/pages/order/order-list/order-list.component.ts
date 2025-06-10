import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminSharedModule } from '../../../shared/admin-shared.module';
import { Order, OrderStatus, OrderType } from '../../../../shared/models/order';
import { OrderItem } from '../../../../shared/models/order-item';
import { OrderService } from '../../../../shared/services/order.service';
import { PricePipe } from '../../../../shared/pipes/price.pipe';
import { PersianDatePipe } from '../../../../shared/pipes/persian-date.pipe';

@Component({
  selector: 'app-order-list',
  imports: [AdminSharedModule, PersianDatePipe, PricePipe],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent {

  @ViewChild('closeStatusModal') closeStatusModal!: ElementRef;

  cafeId = localStorage.getItem("cafeId");

  crudModalTitle = "افزودن آیتم جدید";

  orders: Order[] = [] as Order[];

  orderStatuses: { key: OrderStatus, label: string }[] = [
    { key: OrderStatus.PENDING, label: 'در حال بررسی' },
    { key: OrderStatus.CONFIRMED, label: 'تأیید شده' },
    { key: OrderStatus.PREPARING, label: 'در حال آماده‌سازی' },
    { key: OrderStatus.DELIVERING, label: 'در حال ارسال' },
    { key: OrderStatus.COMPLETED, label: 'تکمیل شده' }
  ];

  selectedOrder: Order = { id: 0 } as Order;
  selectedOrderItems: OrderItem[] = [] as OrderItem[];

  constructor(private orderService: OrderService) {
    this.loadOrders();
  }

  loadOrders() {
    let id = localStorage.getItem("cafeId");
    if (id) {
      this.orderService.getByCafe(+id).subscribe(res => {
        this.orders = (res.data as Order[]).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      });
    }
  }

  clearSelectedItem() {
    this.selectedOrder = { id: 0 } as Order;
    this.selectedOrderItems = [] as OrderItem[];
  }

  // saveItem() {
  //   let data = {
  //     title: this.selectedItem.title,
  //     price: +this.selectedItem.price,
  //     description: this.selectedItem.description,
  //     image: '',
  //     cafeId: (this.cafeId) ? +this.cafeId : 0,
  //     categoryId: +this.selectedItem.categoryId
  //   } as MenuItem

  //   if (this.selectedItem.id != 0) {
  //     this.itemService.update(this.selectedItem.id, data).subscribe(() => this.loadCategories());
  //   } else {
  //     this.itemService.create(data).subscribe(() => this.loadMenuItems());
  //   }
  //   this.closeModal("crudModal")
  // }

  // delete() {
  //   this.itemService.delete(this.selectedItem.id).subscribe(() => this.loadMenuItems());
  //   this.closeModal("deleteModal")
  //   this.clearSelectedItem();
  // }

  closeModal(modalName: string) {
    modalName = modalName + "Close";
    const modalElement = document.getElementById(modalName) as HTMLElement;
    modalElement.click();
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
  getTypeLabel(type: OrderType): string {
    switch (type) {
      case OrderType.DINEIN: return 'در محل';
      case OrderType.TAKEAWAY: return 'بیرون بر';
      default: return 'نامشخص';
    }
  }
  getStatusClass(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.PENDING: return 'bg-warning text-light';
      case OrderStatus.CONFIRMED: return 'bg-primary text-light';
      case OrderStatus.PREPARING: return ' bg-info text-info';
      case OrderStatus.DELIVERING: return 'bg-secondary text-light';
      case OrderStatus.COMPLETED: return 'bg-success text-success';
      case OrderStatus.CANCELLED: return 'bg-light text-secondary';
      default: return 'text-muted';
    }
  }



  getTotal(orderItems: OrderItem[]): number {
    return orderItems.reduce((sum, item) => {
      return sum + (item.menuItem?.price || 0) * item.quantity;
    }, 0);
  }

  changeStatus() {
    this.orderService.changeStatus(this.selectedOrder.id, this.selectedOrder.status).subscribe(() => {
      this.loadOrders();
      this.closeStatusModal.nativeElement.click();
    })
  }
}
