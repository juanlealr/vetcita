import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vet {
  identificationType: string;
  identificationNumber: string;
  id?: number;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  isActive: boolean;
  createdAt?: string;
  serviceIds?: number[];
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VetService {

    private API_URL = 'http://localhost:8080/api/vets';

    constructor(private http: HttpClient) {}

    getAllVets(): Observable<Vet[]> {
        return this.http.get<Vet[]>(this.API_URL);
    }

    toggleVetStatus(id: number): Observable<Vet> {
        return this.http.patch<Vet>(`${this.API_URL}/${id}/toggle-status`, {});
    }

    getVetById(id: number): Observable<Vet> {
        return this.http.get<Vet>(`${this.API_URL}/${id}`);
    }

    createVet(vet: any): Observable<Vet> {
        return this.http.post<Vet>(this.API_URL, vet);
    }

    updateVet(id: number, vet: any): Observable<Vet> {
        return this.http.put<Vet>(`${this.API_URL}/${id}`, vet);
    }

}