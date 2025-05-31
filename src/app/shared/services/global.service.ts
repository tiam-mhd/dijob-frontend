import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  apiUrl = "http://localhost:3000"
  constructor() { }
}
