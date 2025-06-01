import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
private baseUrl = "";

  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.baseUrl = `${this.globalService.apiUrl}/menu/item`
  }

  getAll(): Observable<Response<MenuItem[]>> {
    return this.http.get<Response<MenuItem[]>>(this.baseUrl);
  }
  
  getByCategory(id: number): Observable<Response<MenuItem[]>> {
    return this.http.get<Response<MenuItem[]>>(`${this.baseUrl}/ofCategory/${id}`);
  }
  
  getByCafe(id: number): Observable<Response<MenuItem[]>> {
    return this.http.get<Response<MenuItem[]>>(`${this.baseUrl}/ofcafe/${id}`);
  }

  getById(id: number): Observable<Response<MenuItem>> {
    return this.http.get<Response<MenuItem>>(`${this.baseUrl}/${id}`);
  }

  create(item: MenuItem): Observable<Response<MenuItem>> {
    return this.http.post<Response<MenuItem>>(`${this.baseUrl}/add`, item);
  }

  update(id: number, category: Partial<MenuItem>): Observable<Response<MenuItem>> {
    return this.http.put<Response<MenuItem>>(`${this.baseUrl}/${id}`, category);
  }

  delete(id: number): Observable<Response<MenuItem>> {
    return this.http.delete<Response<MenuItem>>(`${this.baseUrl}/${id}`);
  }
}
