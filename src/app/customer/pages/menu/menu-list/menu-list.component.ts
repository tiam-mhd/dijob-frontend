import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerSharedModule } from '../../../shared/customer-shared.module';
import { MenuCategory } from '../../../../shared/models/menu-category';
import { FormBuilder } from '@angular/forms';
import { MenuCategoryService } from '../../../../shared/services/menu-category.service';
import { MenuItemService } from '../../../../shared/services/menu-item.service';
import { MenuItem } from '../../../../shared/models/menu-item';
import { CartService } from '../../../shared/services/cart.service';
import { OrderItem } from '../../../../shared/models/order-item';
import { CartDrawerComponent } from '../../../shared/components/cart-drawer/cart-drawer.component';
import { OrderService } from '../../../../shared/services/order.service';
import { Order } from '../../../../shared/models/order';
import autoAnimate from '@formkit/auto-animate';

declare var bootstrap: any; // اگر از CDN استفاده می‌کنی

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CustomerSharedModule],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.scss'
})
export class MenuListComponent implements OnInit, AfterViewInit{
  @ViewChild('cartDrawer') cartDrawer!: CartDrawerComponent;
  @ViewChild('menuItemModal', { static: true }) modalRef!: ElementRef;
  @ViewChild('menuContainer') menuContainer!: ElementRef;

  quantity = 0
  cafeId = 1;
  categories: MenuCategory[] = [] as MenuCategory[]
  items: MenuItem[] = [] as MenuItem[]

  selectedCategory: MenuCategory = { id: 0 } as MenuCategory;
  selectedItem: MenuItem = { id: 0 } as MenuItem;

  cartItems: OrderItem[] = [] as OrderItem[];
  private itemsTimeout: any = null;

  constructor(private categoryService: MenuCategoryService,
    private itemService: MenuItemService,
    private orderService: OrderService,
    private cartService: CartService) {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  ngOnInit(): void {
    this.cartService.getCartOfUser();
    this.loadCategories();
  }
ngAfterViewInit(): void {
  if (this.menuContainer) {
    autoAnimate(this.menuContainer.nativeElement);
  }
}
  openItemModal(item: any) {
    this.selectedItem = item;
    this.quantity = this.cartService.getItemCount(item.id);
    if (!this.modalRef) return;
    const modal = new bootstrap.Modal(this.modalRef.nativeElement);
    modal.show();
  }

  closeItemModal() {
    const modal = bootstrap.Modal.getInstance(this.modalRef.nativeElement);
    modal.hide();
  }

  onButtonClick(event: MouseEvent) {
    event.stopPropagation();
  }

  loadCategories() {
    let id = localStorage.getItem("cafeId");
    if (id) {
      this.categoryService.getByCafe(+id).subscribe(res => {
        this.categories = res.data as MenuCategory[];
        this.selectedCategory = this.categories[0];
        this.loadItems(this.categories[0].id);
      });
    }
  }

  loadItems(id: number) {
    // let id = localStorage.getItem("cafeId");
    if (id) {
      this.itemService.getByCategory(+id).subscribe(res => {
        this.items = res.data as MenuItem[];
      });
    }
  }

  getItemCount(id: number): number {
    let orderId = this.cartItems.find(ci => ci.menuItemId == id)
    return this.cartService.getItemCount(id);
  }

  selectItem(item: MenuItem) {
    this.quantity = this.cartService.getItemCount(item.id);
    this.selectedItem = item;
  }

  clearSelectedCategory() {
    this.selectedCategory = { id: 0 } as MenuCategory;
  }

  closeModal(modalName: string) {
    modalName = modalName + "Close";
    const modalElement = document.getElementById(modalName) as HTMLElement;
    modalElement.click();
  }

  increaseQty(item: MenuItem) {
    var orderItem: OrderItem = {
      id: item.id,
      menuItem: item
    } as OrderItem;
    this.cartService.increase(orderItem)
    this.quantity++;
    this.addToCard();
  }

  decreaseQty(id: number) {
    this.cartService.decrease(id)
    this.quantity--;
    this.addToCard();
  }

  addToCard() {
    clearTimeout(this.itemsTimeout)
    this.itemsTimeout = setTimeout(() => {
      const items = [] as OrderItem[];
      this.cartService.getItems().forEach(ci => {
        items.push({ menuItemId: ci.menuItem.id, quantity: ci.quantity } as OrderItem)
      });
      const order: Order = {
        customerId: 4,
        cafeId: 1,
        items: items
      } as Order
      
      this.orderService.addToCart(order).subscribe(res => {
      });
      clearTimeout(this.itemsTimeout)
    }, 3000);
  }
}
