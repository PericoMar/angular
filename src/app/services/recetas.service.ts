import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  private apiUrl = 'http://localhost:3000';
  constructor(private http : HttpClient) { }

  getRecetasByObjetivo(objetivo :any) : Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/getRecetas?objetivo=${objetivo}`);
  }
}
