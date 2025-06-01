import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { Cafe } from '../models/cafe';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class CafeService {
  private baseUrl = "";

  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.baseUrl = `${this.globalService.apiUrl}/cafe`
  }

  getAll(): Observable<Response<Cafe[]>> {
    return this.http.get<Response<Cafe[]>>(this.baseUrl);
  }

  getById(id: number): Observable<Response<Cafe>> {
    return this.http.get<Response<Cafe>>(`${this.baseUrl}/${id}`);
  }

  getByUser(userId: number): Observable<Response<Cafe[]>> {
    return this.http.get<Response<Cafe[]>>(`${this.baseUrl}/ofUser/${userId}`);
  }

  create(cafe: Partial<Cafe>): Observable<Response<Cafe>> {
    return this.http.post<Response<Cafe>>(this.baseUrl, cafe);
  }

  update(id: number, cafe: Partial<Cafe>): Observable<Response<Cafe>> {
    return this.http.put<Response<Cafe>>(`${this.baseUrl}/${id}`, cafe);
  }

  delete(id: number): Observable<Response<Cafe>> {
    return this.http.delete<Response<Cafe>>(`${this.baseUrl}/${id}`);
  }
}
