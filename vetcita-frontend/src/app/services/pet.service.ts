import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pet {
    id?: number;         
    name: string;
    gender: string;      
    species: string;     
    breed: string;
    color: string;
    birthDate: string;
    weightKg: number;
    isNeutered: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private API_URL = 'http://localhost:8080/api/pets'; 

  constructor(private http: HttpClient) {}

  getMyPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.API_URL}/my-pets`);
  }

  registerPet(petData: any): Observable<any> {
    return this.http.post<any>(this.API_URL, petData);
  }

  getPetsByClientId(clientId: number): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.API_URL}/user/${clientId}`);
  }

  registerPetForClient(clientId: number, petData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/user/${clientId}`, petData);
  }
}