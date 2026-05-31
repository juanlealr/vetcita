import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface MedicalServiceData {
  id?: number;
  name: string;
  description: string;
  price: number;
  estimatedDurationMinutes: number;
  isActive?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MedicalServiceService {
  private apiUrl = 'http://localhost:8080/api/services'; 

  constructor(private http: HttpClient) { }

  getAllServices(): Observable<MedicalServiceData[]> {
    return this.http.get<MedicalServiceData[]>(this.apiUrl);
  }

  getActiveServices(): Observable<MedicalServiceData[]> {
    return this.http.get<MedicalServiceData[]>(`${this.apiUrl}/active`);
  }

  getServiceById(id: number): Observable<MedicalServiceData> {
    return this.http.get<MedicalServiceData>(`${this.apiUrl}/${id}`);
  }

  createService(data: MedicalServiceData): Observable<MedicalServiceData> {
    return this.http.post<MedicalServiceData>(this.apiUrl, data);
  }

  updateService(id: number, data: MedicalServiceData): Observable<MedicalServiceData> {
    return this.http.put<MedicalServiceData>(`${this.apiUrl}/${id}`, data);
  }

  toggleServiceStatus(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, {});
  }
}