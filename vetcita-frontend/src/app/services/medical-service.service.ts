import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalServiceService {
  private apiUrl = 'http://localhost:8080/api/services'; 

  constructor(private http: HttpClient) { }

  getActiveServices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}