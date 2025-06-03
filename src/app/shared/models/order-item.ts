import { MenuItem } from "./menu-item"
import { Order } from "./order"

export interface OrderItem {
    id: number
    orderId: number
    order: Order
    menuItemId: number
    menuItem: MenuItem
    quantity: number
  }