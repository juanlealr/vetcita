import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Pet, PetService } from '../../../services/pet.service';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-5xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight uppercase flex items-center gap-2">
          Mis Mascotas 🐾
        </h1>
      </div>

      <div class="mb-6">
        <a routerLink="/client/mascotas/nueva" 
           class="inline-flex items-center gap-2 bg-[#0C7489] hover:bg-[#11B0C8] text-white px-6 py-2.5 rounded-lg font-medium transition shadow-md">
          <span>+</span> Añadir mascota
        </a>
      </div>

      <div class="bg-yellow-100 p-4 mb-4 text-xs font-mono rounded overflow-auto">
        <strong>Debug Info:</strong>
        <pre>{{ pets | json }}</pre>
      </div>

      <div *ngIf="pets.length === 0 && !loading" class="bg-white rounded-2xl shadow-sm p-12 text-center border border-slate-100">
        <div class="text-6xl mb-4">🐕</div>
        <h3 class="text-xl font-bold text-slate-700 mb-2">Aún no tienes mascotas registradas</h3>
      </div>

      <div *ngIf="pets.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div *ngFor="let pet of pets" class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col relative">
          <div class="flex gap-4 items-center mb-4">
            <div class="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center text-3xl shrink-0">
              {{ pet.species === 'FELINO' ? '🐱' : (pet.species === 'AVE' ? '🐦' : (pet.species === 'OTRO' ? '🐾' : '🐶')) }}
            </div>
            
            <div>
              <h3 class="text-xl font-bold text-slate-800 uppercase">{{ pet.name }}</h3>
              <div class="flex items-center gap-2 text-sm text-slate-500 mt-1">
                <span class="text-sky-500 font-semibold">{{ pet.gender }}</span>
                <span>•</span>
                <span>Raza: {{ pet.breed }}</span>
              </div>
            </div>
          </div>
          
          <div class="text-sm text-slate-600 mb-6 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p><strong>Nacimiento:</strong> {{ pet.birthDate }}</p>
            <p><strong>Peso:</strong> {{ pet.weightKg }} kg</p>
            <p><strong>Esterilizado/a:</strong> {{ pet.isNeutered ? 'Sí ✅' : 'No ❌' }}</p>
          </div>
        </div>

      </div>
    </div>
  `
})
export class PetListComponent implements OnInit {
  pets: Pet[] = [];
  loading = true;

  constructor(
    private petService: PetService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.petService.getMyPets().subscribe({
      next: (data: any) => {
        this.pets = data;
        this.loading = false;

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al traer mascotas:', error);
        this.loading = false;
      }
    });
  }
}