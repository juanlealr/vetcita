import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AppointmentResponseDTO {
  id: number;
  date: string;
  time: string;
  petName: string;
  petSpecies: string;
  vetName: string;
}

export interface DashboardMetrics {
  citasDelDia: number;
  proximasCitas: number;
  totalClientes: number;
  totalMascotas: number;
  ultimasCitas: AppointmentResponseDTO[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private apiUrl = 'http://localhost:8080/api/appointments/admin/dashboard-metrics';

  constructor(private http: HttpClient) {}

  getMetrics(): Observable<DashboardMetrics> {
    return this.http.get<DashboardMetrics>(this.apiUrl);
  }
}