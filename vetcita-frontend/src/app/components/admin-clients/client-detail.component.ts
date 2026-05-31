import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { UserService, ClientSummary } from '../../services/user.service';
import { PetService, Pet } from '../../services/pet.service';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="client" class="space-y-6">
      
      <div class="flex items-center gap-4">
        <a routerLink="/admin/clientes" class="p-2 hover:bg-slate-200 rounded-full transition text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </a>
        <h1 class="text-2xl font-bold text-slate-800">Detalles del Cliente</h1>
      </div>

      <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center md:items-start gap-6">
        
        <div class="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-2xl font-bold shrink-0">
          {{ client.firstName.charAt(0) }}{{ client.lastName.charAt(0) }}
        </div>
        
        <div class="flex-1 w-full text-center md:text-left">
          <div class="flex flex-col md:flex-row md:items-center gap-3 mb-4">
            <h2 class="text-2xl font-bold text-slate-800">{{ client.firstName }} {{ client.lastName }}</h2>
            <span [class]="client.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-3 py-1 rounded-full text-xs font-bold w-fit mx-auto md:mx-0">
              {{ client.active ? 'Cliente Activo' : 'Inactivo' }}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-slate-50 p-4 rounded-2xl">
            <div>
              <p class="text-slate-500 mb-1">Documento</p>
              <p class="font-medium text-slate-700">{{ client.identificationType }} - {{ client.identificationNumber }}</p>
            </div>
            <div>
              <p class="text-slate-500 mb-1">Correo Electrónico</p>
              <p class="font-medium text-slate-700">{{ client.email }}</p>
            </div>
            <div>
              <p class="text-slate-500 mb-1">Teléfono</p>
              <p class="font-medium text-slate-700">{{ client.phone }}</p>
            </div>
          </div>
        </div>

      </div>

      <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span class="text-xl">🐾</span> Mascotas Registradas
          </h3>
          <a [routerLink]="['/admin/clientes', client.id, 'mascotas', 'nueva']" class="bg-[#20b2aa] hover:bg-[#1c9c95] text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 cursor-pointer whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Añadir Mascota
          </a>
        </div>

        <div *ngIf="pets.length > 0; else noPets" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div *ngFor="let pet of pets" class="border border-slate-200 rounded-2xl p-4 hover:border-sky-300 transition flex gap-4 items-center">
            <div class="w-16 h-16 rounded-xl bg-sky-50 flex flex-col items-center justify-center shrink-0">
              <span class="text-2xl">{{ pet.species === 'CANINO' ? '🐕' : (pet.species === 'FELINO' ? '🐈' : '🐾') }}</span>
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-slate-800 text-lg">{{ pet.name }}</h4>
              <p class="text-xs text-slate-500">{{ pet.breed }} • {{ pet.gender === 'MACHO' ? 'Macho' : 'Hembra' }}</p>
              <p class="text-xs text-slate-500 font-medium mt-1">Peso: {{ pet.weightKg }} kg</p>
            </div>
            <div class="flex flex-col gap-2">
              <button class="text-sky-500 hover:bg-sky-50 p-2 rounded-lg transition" title="Ver Historial">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <ng-template #noPets>
          <div class="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <span class="text-4xl">📭</span>
            <p class="text-slate-500 mt-2 font-medium">Este cliente aún no tiene mascotas registradas.</p>
          </div>
        </ng-template>
      </div>

    </div>

    <div *ngIf="!client" class="flex justify-center items-center min-h-[50vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
    </div>
  `
})
export class ClientDetailComponent implements OnInit {
  clientId!: number;
  client: ClientSummary | null = null;
  pets: Pet[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private petService: PetService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.clientId = +id;
        this.loadClientData();
        this.loadClientPets();
      }
    });
  }

  loadClientData(): void {
    this.userService.getClientById(this.clientId).subscribe({
      next: (data) => {
        this.client = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando cliente:', err)
    });
  }

  loadClientPets(): void {
    this.petService.getPetsByClientId(this.clientId).subscribe({
      next: (data) => {
        this.pets = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando mascotas:', err)
    });
  }
}