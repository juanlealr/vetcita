import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MedicalRecord {
  id?: number;
  appointmentId: number;
  appointmentDate?: string;
  appointmentTime?: string;
  diagnosis: string;
  treatment: string;
  observations: string;
  vetNotes: string;
}

@Injectable({ providedIn: 'root' })
export class VetWorkService {
  private API_VET = 'http://localhost:8080/api/vet';

  constructor(private http: HttpClient) {}

  getMyAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_VET}/appointments`);
  }

  getMedicalRecord(appointmentId: number): Observable<MedicalRecord> {
    return this.http.get<MedicalRecord>(`${this.API_VET}/appointments/${appointmentId}/medical-record`);
  }

  saveMedicalRecord(appointmentId: number, data: Partial<MedicalRecord>): Observable<MedicalRecord> {
    return this.http.put<MedicalRecord>(`${this.API_VET}/appointments/${appointmentId}/medical-record`, data);
  }

  getPetMedicalHistory(petId: number): Observable<MedicalRecord[]> {
    return this.http.get<MedicalRecord[]>(`${this.API_VET}/pets/${petId}/medical-history`);
  }
}