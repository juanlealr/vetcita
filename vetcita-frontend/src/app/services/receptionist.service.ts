import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReceptionistProfile {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  identificationType: string;
  identificationNumber: string;
  role?: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ReceptionistService {
  private readonly API_URL = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getAllReceptionists(): Observable<ReceptionistProfile[]> {
    return this.http.get<ReceptionistProfile[]>(`${this.API_URL}/receptionists`);
  }

  getReceptionistById(id: number): Observable<ReceptionistProfile> {
    return this.http.get<ReceptionistProfile>(`${this.API_URL}/${id}`);
  }

  createReceptionist(receptionistData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/receptionists`, receptionistData);
  }

  updateReceptionist(id: number, receptionistData: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}`, receptionistData);
  }

  toggleReceptionistStatus(id: number): Observable<any> {
    return this.http.patch(`${this.API_URL}/${id}/status`, {});
  }
}