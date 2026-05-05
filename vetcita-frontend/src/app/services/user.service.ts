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
  private readonly API_URL = '/api/users';

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.API_URL}/me`);
  }

  updateCurrentUser(request: UpdateUserProfileRequest): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.API_URL}/me`, request);
  }
}
