import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Service {
  id: number;
  name: string;
  description?: string;
  price?: number;
  estimatedDurationMinutes?: number;
}

export interface Vet {
  id: number;
  name: string;
  specialty: string;
}

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private API_URL = 'http://localhost:8080/api/appointments';
  private SERVICES_URL = 'http://localhost:8080/api/services';
  private VETS_URL = 'http://localhost:8080/api/vets';

  constructor(private http: HttpClient) {}

  // ========== CITAS ==========
  createAppointment(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}`, data);
  }

  getMyAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/my-appointments`);
  }

  getVetAppointments(vetId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/vet/${vetId}`);
  }

  getAvailableTimes(vetId: number, date: string, excludeAppointmentId?: number): Observable<string[]> {
    let url = `${this.API_URL}/available-times?vetId=${vetId}&date=${date}`;
    if (excludeAppointmentId) url += `&excludeAppointmentId=${excludeAppointmentId}`;
    return this.http.get<string[]>(url);
  }

  updateAppointment(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, data);
  }

  cancelAppointment(id: number): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}/cancel`, {});
  }

  updateAppointmentStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.API_URL}/${id}/status`, { status });
  }

  // ========== SERVICIOS ==========
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.SERVICES_URL);
  }

  // ========== VETERINARIOS ==========
  getVetsByService(serviceId: number): Observable<Vet[]> {
    return this.http.get<Vet[]>(`${this.VETS_URL}/service/${serviceId}`);
  }
}