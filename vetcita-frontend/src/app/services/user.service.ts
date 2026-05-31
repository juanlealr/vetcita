import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  identificationType: string;
  identificationNumber: string;
  role: string;
  active: boolean;
  photo?: string | null;            
  photoContentType?: string | null;
}

export interface ClientSummary extends UserProfile {
  mascotasCount: number; 
}

export interface UpdateUserProfileRequest {
  firstName: string;
  lastName: string;
  phone: string;
  identificationType: string;
  identificationNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.API_URL}/me`);
  }

  updateCurrentUser(request: UpdateUserProfileRequest): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.API_URL}/me`, request);
  }

  deactivateCurrentUser(): Observable<string> {
    return this.http.post(`${this.API_URL}/me/deactivate`, {}, { responseType: 'text' as const }) as Observable<string>;
  }

  deleteCurrentUser(): Observable<string> {
    return this.http.delete(`${this.API_URL}/me`, { responseType: 'text' as const }) as Observable<string>;
  }
  
  getAllClients(): Observable<ClientSummary[]> {
    return this.http.get<ClientSummary[]>(`${this.API_URL}?role=CLIENT`); 
  }

  getClientById(id: number): Observable<ClientSummary> {
    return this.http.get<ClientSummary>(`${this.API_URL}/${id}`);
  }

  createClient(clientData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/clients`, clientData);
  }

  updateClient(id: number, clientData: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}`, clientData);
  }

  toggleClientStatus(id: number): Observable<any> {
    return this.http.patch(`${this.API_URL}/${id}/status`, {});
  }

}