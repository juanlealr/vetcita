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
  mascotas: number;
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
  // private readonly ADMIN_API_URL = '/api/admin/clients';

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.API_URL}/me`);
  }

  updateCurrentUser(request: UpdateUserProfileRequest): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.API_URL}/me`, request);
  }
  
  getAllClients(): Observable<ClientSummary[]> {
    return this.http.get<ClientSummary[]>(`${this.API_URL}?role=CLIENT`); 
  }
}
