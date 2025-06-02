import { MenuItem } from "./menu-item"
import { Order } from "./order"

export interface OrderItem {
    id: number
    order: Order
    menuItem: MenuItem
    quantity: number
  }