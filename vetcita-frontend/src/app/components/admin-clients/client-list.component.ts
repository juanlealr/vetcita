import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Asegúrate de que esta ruta apunte a donde guardaste el UserService y la interfaz ClientSummary
// import { UserService, ClientSummary } from '../../../services/user.service'; 

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 min-h-[80vh]">
      
      <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div class="relative w-full md:w-1/2 lg:w-1/3">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </span>
          <input 
            type="text" 
            [(ngModel)]="searchTerm"
            placeholder="Buscar por nombre, correo o documento" 
            class="w-full pl-12 pr-4 py-3 rounded-full border-2 border-sky-100 bg-slate-50 focus:outline-none focus:border-sky-400 transition text-sm text-slate-700"
          >
        </div>

        <a routerLink="/admin/clientes/nuevo" class="bg-[#20b2aa] hover:bg-[#1c9c95] text-white px-6 py-3 rounded-full font-semibold transition shadow-md flex items-center gap-2 w-full md:w-auto justify-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nuevo cliente
        </a>
      </div>

      <div class="overflow-x-auto rounded-2xl border border-sky-100">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-sky-50 text-slate-600 text-sm uppercase tracking-wide border-b border-sky-100">
              <th class="px-6 py-4 font-semibold">Cliente</th>
              <th class="px-6 py-4 font-semibold">Documento</th>
              <th class="px-6 py-4 font-semibold">Contacto</th>
              <th class="px-6 py-4 font-semibold text-center">Estado</th>
              <th class="px-6 py-4 font-semibold text-center">Mascotas</th>
              <th class="px-6 py-4 font-semibold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-sky-50 text-slate-700">
            <tr *ngFor="let client of filteredClients" class="hover:bg-slate-50 transition">
              
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold overflow-hidden shrink-0">
                    <img *ngIf="client.photo" [src]="client.photo" alt="Foto" class="w-full h-full object-cover">
                    <span *ngIf="!client.photo">{{ client.firstName.charAt(0) }}{{ client.lastName.charAt(0) }}</span>
                  </div>
                  <div>
                    <p class="font-medium text-slate-800">{{ client.firstName }} {{ client.lastName }}</p>
                    <p class="text-xs text-slate-500">{{ client.email }}</p>
                  </div>
                </div>
              </td>
              
              <td class="px-6 py-4">
                <p class="text-sm font-medium">{{ client.identificationNumber }}</p>
                <p class="text-xs text-slate-500 uppercase">{{ client.identificationType }}</p>
              </td>

              <td class="px-6 py-4 text-sm">{{ client.phone }}</td>
              
              <td class="px-6 py-4 text-center">
                <span [class]="client.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-3 py-1 rounded-full text-xs font-bold">
                  {{ client.active ? 'Activo' : 'Inactivo' }}
                </span>
              </td>

              <td class="px-6 py-4 text-center">
                <span class="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-bold">{{ client.mascotas }}</span>
              </td>

              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-3">
                  <a [routerLink]="['/admin/clientes/editar', client.id]" class="text-sky-500 hover:text-sky-700 transition cursor-pointer" title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.158 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    </svg>
                  </a>
                  <a [routerLink]="['/admin/clientes', client.id]" class="text-indigo-400 hover:text-indigo-600 transition cursor-pointer" title="Ver Detalles">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                    </svg>
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-between mt-6 text-sm text-slate-500">
        <p>Mostrando 1 a {{ filteredClients.length }} de {{ clients.length }} clientes</p>
        <div class="flex items-center gap-1">
          <button class="px-3 py-1 rounded hover:bg-slate-100">&laquo;</button>
          <button class="px-3 py-1 rounded bg-[#20b2aa] text-white">1</button>
          <button class="px-3 py-1 rounded hover:bg-slate-100">2</button>
          <button class="px-3 py-1 rounded hover:bg-slate-100">3</button>
          <button class="px-3 py-1 rounded hover:bg-slate-100">&raquo;</button>
        </div>
      </div>
    </div>
  `
})
export class ClientListComponent implements OnInit {
  searchTerm: string = '';
  
  clients: any[] = []; 

  // constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.clients = [
      { 
        id: 1, 
        active: true, 
        email: 'juan.perez@email.com', 
        firstName: 'Juan', 
        lastName: 'Perez', 
        identificationNumber: '10456789', 
        identificationType: 'CC', 
        phone: '3001234567', 
        role: 'CLIENT', 
        photo: null, 
        photoContentType: null, 
        mascotas: 2 
      },
      { 
        id: 2, 
        active: true, 
        email: 'ana.lopez@email.com', 
        firstName: 'Ana', 
        lastName: 'Lopez', 
        identificationNumber: '10123456', 
        identificationType: 'CC', 
        phone: '3106549876', 
        role: 'CLIENT', 
        photo: null, 
        photoContentType: null, 
        mascotas: 1 
      },
      { 
        id: 3, 
        active: false, 
        email: 'carlos.diaz@email.com', 
        firstName: 'Carlos', 
        lastName: 'Diaz', 
        identificationNumber: '10398765', 
        identificationType: 'CE', 
        phone: '3207895432', 
        role: 'CLIENT', 
        photo: null, 
        photoContentType: null, 
        mascotas: 3 
      },
      { 
        id: 4, 
        active: true, 
        email: 'laura.gomez@email.com', 
        firstName: 'Laura', 
        lastName: 'Gómez', 
        identificationNumber: '10067890', 
        identificationType: 'CC', 
        phone: '3114567890', 
        role: 'CLIENT', 
        photo: null, 
        photoContentType: null, 
        mascotas: 0 
      }
    ];
  }

  get filteredClients() {
    if (!this.searchTerm) return this.clients;
    
    const term = this.searchTerm.toLowerCase();
    return this.clients.filter(c => 
      c.firstName.toLowerCase().includes(term) || 
      c.lastName.toLowerCase().includes(term) ||
      c.identificationNumber.includes(term) ||
      c.email.toLowerCase().includes(term)
    );
  }
}