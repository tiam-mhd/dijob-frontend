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
    this.baseUrl = `${this.globalService.apiUrl}/menu/item`
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

  getById(id: number): Observable<Response<Order>> {
    return this.http.get<Response<Order>>(`${this.baseUrl}/${id}`);
  }

  create(order: Order): Observable<Response<Order>> {
    return this.http.post<Response<Order>>(`${this.baseUrl}/add`, order);
  }

  update(id: number, category: Partial<Order>): Observable<Response<Order>> {
    return this.http.put<Response<Order>>(`${this.baseUrl}/${id}`, category);
  }

  delete(id: number): Observable<Response<Order>> {
    return this.http.delete<Response<Order>>(`${this.baseUrl}/${id}`);
  }
}
