import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuCategory } from '../models/menu-category';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class MenuCategoryService {
  private baseUrl = "";

  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.baseUrl = `${this.globalService.apiUrl}/menu/category`
  }

  getAll(): Observable<MenuCategory[]> {
    return this.http.get<MenuCategory[]>(this.baseUrl);
  }

  getById(id: number): Observable<MenuCategory> {
    return this.http.get<MenuCategory>(`${this.baseUrl}/${id}`);
  }

  create(category: Partial<MenuCategory>): Observable<MenuCategory> {
    return this.http.post<MenuCategory>(this.baseUrl, category);
  }

  update(id: number, category: Partial<MenuCategory>): Observable<MenuCategory> {
    return this.http.put<MenuCategory>(`${this.baseUrl}/${id}`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
