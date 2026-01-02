import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // This connects to the Backend URL
  private baseUrl = 'http://localhost:3000/api/auth';

  // We use 'inject' to get the HTTP tool
  private http = inject(HttpClient);

  constructor() {}

  register(userDetails: any) {
    return this.http.post(`${this.baseUrl}/register`, userDetails);
  }

  login(userDetails: any) {
    return this.http.post(`${this.baseUrl}/login`, userDetails);
  }
}