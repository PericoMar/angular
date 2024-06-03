import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localStorageKey = 'currentUser';
  private apiUrl = 'http://localhost:3000'; // Cambia esto por tu URL de backend

  constructor(private http: HttpClient) { }

  checkUserExists(email: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/checkUserExists?email=${email}`);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  validateCredentials(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/validateCredentials?email=${email}&password=${password}`);
  }

  loginUser(user: any): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem(this.localStorageKey);
    return user ? JSON.parse(user) : null;
  }

  logoutUser(): void {
    localStorage.removeItem(this.localStorageKey);
  }
}