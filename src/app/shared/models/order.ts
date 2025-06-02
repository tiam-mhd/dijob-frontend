import { Cafe } from "./cafe"
import { OrderItem } from "./order-item"

export enum OrderStatus {
  PENDING = 'PENDING', // ثبت شده، منتظر تأیید
  CONFIRMED = 'CONFIRMED', // تأیید شده توسط کافه
  PREPARING = 'PREPARING', // در حال آماده‌سازی
  DELIVERING = 'DELIVERING', // در حال ارسال (در صورت ارسال)
  COMPLETED = 'COMPLETED', // تحویل داده شده
  CANCELLED = 'CANCELLED', // لغو شده
}

export interface Order {
  id: number
  cafe: Cafe
  customerName: string
  customerPhone?: string
  status: OrderStatus
  trackingToken: string
  items: OrderItem[]
//   feedback: Feedback
//   payments: Payment[]
  createdAt: Date
  updatedAt: Date;
}