import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  createAppointment(appointmentData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/appointments`, appointmentData);
  }

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/services`);
  }

  getVetsByService(serviceId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/vets/service/${serviceId}`);
  }

  getAvailableTimes(vetId: number, date: string): Observable<string[]> {
    const params = new HttpParams()
      .set('vetId', vetId.toString())
      .set('date', date);

    return this.http.get<string[]>(`${this.baseUrl}/appointments/available-times`, { params });
  }

  getMyAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/appointments/my-appointments`);
  }

  cancelAppointment(appointmentId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/appointments/${appointmentId}/cancel`, {});
  }
}