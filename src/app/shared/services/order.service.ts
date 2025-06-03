import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
private baseUrl = "";

  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.baseUrl = `${this.globalService.apiUrl}/order`
  }

  getAll(): Observable<Response<Order[]>> {
    return this.http.get<Response<Order[]>>(this.baseUrl);
  }
  
  getByCategory(id: number): Observable<Response<Order[]>> {
    return this.http.get<Response<Order[]>>(`${this.baseUrl}/ofCategory/${id}`);
  }
  
  getByCafe(id: number): Observable<Response<Order[]>> {
    return this.http.get<Response<Order[]>>(`${this.baseUrl}/ofcafe/${id}`);
  }
  
  getOfUser(userId: number): Observable<Response<Order[]>> {
    return this.http.get<Response<Order[]>>(`${this.baseUrl}/OfUser/${userId}`);
  }
  
  getCartOfUser(userId: number, cafeId: number): Observable<Response<Order[]>> {
    return this.http.post<Response<Order[]>>(`${this.baseUrl}/cartOfUser`, {customerId: userId, cafeId: cafeId} as any);
  }

  getById(id: number): Observable<Response<Order>> {
    return this.http.get<Response<Order>>(`${this.baseUrl}/${id}`);
  }

  addToCart(order: Order): Observable<Response<Order>> {
    return this.http.post<Response<Order>>(`${this.baseUrl}/addToCart`, {
      customerId: order.customerId,
      cafeId:order.cafeId,
      items:order.items
    } as Order);
  }

  fromInCartToOrder(id: number): Observable<Response<Order>> {
    return this.http.put<Response<Order>>(`${this.baseUrl}/fromInCartToOrder/${id}`,{});
  }
  
  create(order: Order): Observable<Response<Order>> {
    return this.http.post<Response<Order>>(`${this.baseUrl}/add`, order);
  }

  update(id: number, order: Partial<Order>): Observable<Response<Order>> {
    return this.http.put<Response<Order>>(`${this.baseUrl}/${id}`, order);
  }

  delete(id: number): Observable<Response<Order>> {
    return this.http.delete<Response<Order>>(`${this.baseUrl}/${id}`);
  }
}
