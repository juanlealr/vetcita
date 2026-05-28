import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReceptionistService, ReceptionistProfile } from '../../services/receptionist.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receptionist-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 min-h-[80vh] flex flex-col">
      
      @if (isLoading) {
        <div class="flex flex-col items-center justify-center py-20 text-slate-500 font-medium h-full grow">
          <svg class="animate-spin h-8 w-8 mb-4 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Cargando recepcionistas...</span>
        </div>
      } @else {
        
        <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div class="relative w-full md:w-1/2 lg:w-1/3">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </span>
            <input 
              type="text" 
              [ngModel]="searchTerm"
              (ngModelChange)="onSearchChange($event)"
              placeholder="Buscar por nombre o correo" 
              class="w-full pl-12 pr-4 py-3 rounded-full border-2 border-sky-100 bg-slate-50 focus:outline-none focus:border-sky-400 transition text-sm text-slate-700"
            >
          </div>

          <a routerLink="/admin/recepcionistas/nuevo" class="bg-[#0C7489] hover:bg-[#095b6b] text-white px-6 py-3 rounded-full font-semibold transition shadow-md flex items-center gap-2 w-full md:w-auto justify-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
            Registrar Recepcionista
          </a>
        </div>

        <div class="overflow-x-auto rounded-2xl border border-sky-100 grow">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-sky-50 text-slate-600 text-sm uppercase tracking-wide border-b border-sky-100">
                <th class="px-6 py-4 font-semibold">Empleado</th>
                <th class="px-6 py-4 font-semibold">Documento</th>
                <th class="px-6 py-4 font-semibold">Contacto</th>
                <th class="px-6 py-4 font-semibold text-center">Estado</th>
                <th class="px-6 py-4 font-semibold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-sky-50 text-slate-700">
              @if (paginatedReceptionists.length === 0) {
                <tr>
                  <td colspan="5" class="px-6 py-8 text-center text-slate-500">
                    No se encontraron recepcionistas.
                  </td>
                </tr>
              }
              
              <tr *ngFor="let rep of paginatedReceptionists" class="hover:bg-slate-50 transition" [class.opacity-60]="!rep.active">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold overflow-hidden shrink-0 uppercase">
                      <span>{{ rep.firstName.charAt(0) }}{{ rep.lastName.charAt(0) }}</span>
                    </div>
                    <div>
                      <p class="font-medium text-slate-800">{{ rep.firstName }} {{ rep.lastName }}</p>
                      <p class="text-xs text-slate-500">{{ rep.email }}</p>
                    </div>
                  </div>
                </td>
                
                <td class="px-6 py-4 text-sm">
                  <span class="font-medium uppercase">{{ rep.identificationType }}:</span> {{ rep.identificationNumber }}
                </td>

                <td class="px-6 py-4 text-sm">{{ rep.phone || 'Sin teléfono' }}</td>
                
                <td class="px-6 py-4 text-center">
                  <span [class]="rep.active ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'" class="px-3 py-1 rounded-full text-xs font-bold">
                    {{ rep.active ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>

                <td class="px-6 py-4">
                  <div class="flex items-center justify-center gap-3">
                    
                    <a [routerLink]="['/admin/recepcionistas', rep.id]" class="text-indigo-400 hover:text-indigo-600 transition cursor-pointer" title="Ver perfil">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </a>

                    <a [routerLink]="['/admin/recepcionistas/editar', rep.id]" class="text-sky-500 hover:text-sky-700 transition cursor-pointer" title="Editar">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.158 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" /></svg>
                    </a>

                    <button (click)="toggleStatus(rep)" [class]="rep.active ? 'text-rose-400 hover:text-rose-600' : 'text-emerald-400 hover:text-emerald-600'" class="transition cursor-pointer" [title]="rep.active ? 'Desactivar' : 'Activar'">
                      <svg *ngIf="rep.active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" /></svg>
                      <svg *ngIf="!rep.active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 11.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" /></svg>
                    </button>
                    
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-between items-center mt-6" *ngIf="totalPages > 1">
          <p class="text-sm text-slate-500">
            Mostrando página <span class="font-semibold">{{ currentPage }}</span> de <span class="font-semibold">{{ totalPages }}</span>
          </p>
          <div class="flex gap-2">
            <button (click)="prevPage()" [disabled]="currentPage === 1" class="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition">
              Anterior
            </button>
            <button (click)="nextPage()" [disabled]="currentPage === totalPages" class="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition">
              Siguiente
            </button>
          </div>
        </div>

      }
    </div>
  `
})
export class ReceptionistListComponent implements OnInit {
  searchTerm: string = '';
  receptionists: ReceptionistProfile[] = []; 
  isLoading: boolean = true;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private receptionistService: ReceptionistService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadReceptionists();
  }

  loadReceptionists(): void {
    this.isLoading = true;
    this.receptionistService.getAllReceptionists().subscribe({
      next: (data) => {
        this.receptionists = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar recepcionistas:', err);
        this.isLoading = false; 
        this.cdr.detectChanges();
      }
    });
  }

  onSearchChange(term: string) {
    this.searchTerm = term;
    this.currentPage = 1;
  }

  get filteredReceptionists(): ReceptionistProfile[] {
    if (!this.searchTerm) return this.receptionists;
    const term = this.searchTerm.toLowerCase();
    return this.receptionists.filter(r => 
      (`${r.firstName} ${r.lastName}`).toLowerCase().includes(term) || 
      (r.email?.toLowerCase() || '').includes(term) ||
      (r.identificationNumber?.toLowerCase() || '').includes(term)
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredReceptionists.length / this.itemsPerPage);
  }

  get paginatedReceptionists(): ReceptionistProfile[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredReceptionists.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  toggleStatus(rep: ReceptionistProfile) {
    const action = rep.active ? 'desactivar' : 'activar';
    
    Swal.fire({
      title: `¿Estás seguro?`,
      text: `Vas a ${action} a ${rep.firstName} ${rep.lastName}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: rep.active ? '#d33' : '#10b981',
      cancelButtonColor: '#64748b',
      confirmButtonText: `Sí, ${action}`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.receptionistService.toggleReceptionistStatus(rep.id!).subscribe({
          next: () => {
            rep.active = !rep.active; 
            this.cdr.detectChanges();

            Swal.fire({
              title: '¡Actualizado!',
              text: 'El estado del recepcionista ha sido modificado.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
          }
        });
      }
    });
  }
}