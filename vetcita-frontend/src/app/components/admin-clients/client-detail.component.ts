import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="space-y-6">
      
      <div class="flex items-center gap-4">
        <a routerLink="/admin/clientes" class="p-2 hover:bg-slate-200 rounded-full transition text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </a>
        <h1 class="text-2xl font-bold text-slate-800">Detalles del Cliente</h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div class="lg:col-span-1 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-fit">
          <div class="flex flex-col items-center text-center mb-6">
            <div class="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-2xl font-bold mb-4">
              {{ client.firstName.charAt(0) }}{{ client.lastName.charAt(0) }}
            </div>
            <h2 class="text-xl font-bold text-slate-800">{{ client.firstName }} {{ client.lastName }}</h2>
            <span [class]="client.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-3 py-1 rounded-full text-xs font-bold mt-2">
              {{ client.active ? 'Cliente Activo' : 'Inactivo' }}
            </span>
          </div>

          <div class="space-y-4 text-sm">
            <div class="flex justify-between border-b border-slate-50 pb-2">
              <span class="text-slate-500">Documento</span>
              <span class="font-medium text-slate-700">{{ client.identificationType }} - {{ client.identificationNumber }}</span>
            </div>
            <div class="flex justify-between border-b border-slate-50 pb-2">
              <span class="text-slate-500">Correo</span>
              <span class="font-medium text-slate-700">{{ client.email }}</span>
            </div>
            <div class="flex justify-between border-b border-slate-50 pb-2">
              <span class="text-slate-500">Teléfono</span>
              <span class="font-medium text-slate-700">{{ client.phone }}</span>
            </div>
          </div>

          <div class="mt-8 flex gap-3">
            <a [routerLink]="['/admin/clientes/editar', client.id]" class="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg font-medium transition">
              Editar Datos
            </a>
          </div>
        </div>

        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span class="text-xl">🐾</span> Mascotas Registradas
              </h3>
              <button class="bg-[#20b2aa] hover:bg-[#1c9c95] text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Añadir Mascota
              </button>
            </div>

            <div *ngIf="pets.length > 0; else noPets" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div *ngFor="let pet of pets" class="border border-slate-200 rounded-2xl p-4 hover:border-sky-300 transition flex gap-4 items-center">
                
                <div class="w-16 h-16 rounded-xl bg-sky-50 flex flex-col items-center justify-center shrink-0">
                  <span class="text-2xl">{{ pet.species === 'DOG' ? '🐕' : '🐈' }}</span>
                </div>
                
                <div class="flex-1">
                  <h4 class="font-bold text-slate-800 text-lg">{{ pet.name }}</h4>
                  <p class="text-xs text-slate-500">{{ pet.breed }} • {{ pet.sex === 'M' ? 'Macho' : 'Hembra' }}</p>
                  <p class="text-xs text-slate-500 font-medium mt-1">Peso: {{ pet.weight }} kg</p>
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

      </div>
    </div>
  `
})
export class ClientDetailComponent implements OnInit {
  clientId!: number;
  
  // Datos mockeados del cliente (Luego vendrán de tu UserService)
  client: any = {
    id: 1, 
    active: true, 
    email: 'juan.perez@email.com', 
    firstName: 'Juan', 
    lastName: 'Perez', 
    identificationNumber: '10456789', 
    identificationType: 'CC', 
    phone: '3001234567', 
    role: 'CLIENT'
  };

  // Datos mockeados de las mascotas basados en tu base de datos (pets)
  pets: any[] = [
    { id: 101, name: 'Toby', species: 'DOG', breed: 'Golden Retriever', sex: 'M', weight: 25.5, birthDate: '2020-05-10' },
    { id: 102, name: 'Luna', species: 'CAT', breed: 'Siames', sex: 'F', weight: 4.2, birthDate: '2022-08-15' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Aquí capturamos el ID de la URL que nos manda el "ojito"
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.clientId = +id;
        // Aquí llamarías a: this.userService.getClientById(this.clientId)...
      }
    });
  }
}