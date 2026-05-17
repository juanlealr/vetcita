import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface AuthResponse {
  token: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  identificationType: string;
  identificationNumber: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/auth';
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, request).pipe(
      tap((response) => {
        if (response.token) {
          this.setToken(response.token);
          
          const userData = {
            name: response.firstName,
            lastName: response.lastName,
            foto: response.photoUrl
          };
          localStorage.setItem('usuario', JSON.stringify(userData));
        }
      })
    );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, request).pipe(
      tap((response) => {
        if (response.token) {
          this.setToken(response.token);
          
          const userData = {
            name: response.firstName,
            lastName: response.lastName,
            foto: response.photoUrl
          };
          localStorage.setItem('usuario', JSON.stringify(userData));
        }
      })
    );
  }

  forgotPassword(request: ForgotPasswordRequest): Observable<string> {
    return this.http.post(`${this.API_URL}/forgot-password`, request, {
      responseType: 'text'
    });
  }

  resetPassword(request: ResetPasswordRequest): Observable<string> {
    return this.http.post(`${this.API_URL}/reset-password`, request, {
      responseType: 'text'
    });
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    const token = localStorage.getItem('auth_token');
    
    if (token === 'null' || token === 'undefined' || token === '') {
      return null;
    }
    
    return token;
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));

      return decodedPayload.role || null; 
    } catch (e) {
      console.error('Error decodificando token', e);
      return null;
    }
  }

  getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.userId || null; 
    } catch (e) {
      console.error('Error obteniendo el ID del usuario', e);
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const isAuth = token !== null;
    return isAuth;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('usuario'); 
    this.tokenSubject.next(null);
  }
}
