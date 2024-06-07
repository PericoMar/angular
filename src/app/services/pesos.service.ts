import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PesosService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http : HttpClient) { }

  getPesosByUser(email :any) : Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/getPesos?email=${email}`);
  }

  registerPeso(peso: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerPeso`, peso);
  }
}
