// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/auth';
  
  constructor(private http: HttpClient) {}
  
  login(username: string, password: string) {
    return this.http.post<any>(this.apiUrl, { username, password });
  }
}
