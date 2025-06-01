import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuCategory } from '../models/menu-category';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class MenuCategoryService {
  private baseUrl = "";

  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.baseUrl = `${this.globalService.apiUrl}/menu/category`
  }

  getByCafe(id: number): Observable<Response<MenuCategory[]>> {
    return this.http.get<Response<MenuCategory[]>>(`${this.baseUrl}/ofcafe/${id}`);
  }

  getById(id: number): Observable<Response<MenuCategory>> {
    return this.http.get<Response<MenuCategory>>(`${this.baseUrl}/${id}`);
  }

  create(category: Partial<MenuCategory>): Observable<Response<MenuCategory>> {
    return this.http.post<Response<MenuCategory>>(this.baseUrl, category);
  }

  update(id: number, category: Partial<MenuCategory>): Observable<Response<MenuCategory>> {
    return this.http.put<Response<MenuCategory>>(`${this.baseUrl}/${id}`, category);
  }

  delete(id: number): Observable<Response<MenuCategory>> {
    return this.http.delete<Response<MenuCategory>>(`${this.baseUrl}/${id}`);
  }
}
