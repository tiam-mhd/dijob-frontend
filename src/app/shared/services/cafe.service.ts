import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { Cafe } from '../models/cafe';

@Injectable({
  providedIn: 'root'
})
export class CafeService {
  private baseUrl = "";

  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.baseUrl = `${this.globalService.apiUrl}/cafe`
  }

  getAll(): Observable<Cafe[]> {
    return this.http.get<Cafe[]>(this.baseUrl);
  }

  getById(id: number): Observable<Cafe> {
    return this.http.get<Cafe>(`${this.baseUrl}/${id}`);
  }

  getByUser(userId: number): Observable<Cafe> {
    return this.http.get<Cafe>(`${this.baseUrl}/ofUser/${userId}`);
  }

  create(cafe: Partial<Cafe>): Observable<Cafe> {
    return this.http.post<Cafe>(this.baseUrl, cafe);
  }

  update(id: number, cafe: Partial<Cafe>): Observable<Cafe> {
    return this.http.put<Cafe>(`${this.baseUrl}/${id}`, cafe);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
