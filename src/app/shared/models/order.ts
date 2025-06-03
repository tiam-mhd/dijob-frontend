import { Cafe } from "./cafe"
import { OrderItem } from "./order-item"
import { User } from "./user"

export enum OrderStatus {
  PENDING = 'PENDING', // ثبت شده، منتظر تأیید
  CONFIRMED = 'CONFIRMED', // تأیید شده توسط کافه
  PREPARING = 'PREPARING', // در حال آماده‌سازی
  DELIVERING = 'DELIVERING', // در حال ارسال (در صورت ارسال)
  COMPLETED = 'COMPLETED', // تحویل داده شده
  CANCELLED = 'CANCELLED', // لغو شده
}
export enum OrderType {
  DINEIN = 'DINEIN', // سفارش در محل
  TAKEAWAY = 'TAKEAWAY', // سفارش بیرون بر
}

export interface Order {
  id: number
  cafe: Cafe
  cafeId: number
  customerId: number
  customer: User
  type: OrderType
  status: OrderStatus
  trackingToken: string
  items: OrderItem[]
//   feedback: Feedback
//   payments: Payment[]
  createdAt: Date
  updatedAt: Date;
}