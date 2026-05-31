import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VetService, Vet } from '../../services/vet.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vet-list',
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
          <span>Cargando equipo médico...</span>
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
              placeholder="Buscar por nombre, especialidad o correo" 
              class="w-full pl-12 pr-4 py-3 rounded-full border-2 border-sky-100 bg-slate-50 focus:outline-none focus:border-sky-400 transition text-sm text-slate-700"
            >
          </div>

          <a routerLink="/admin/veterinarios/nuevo" class="bg-[#0C7489] hover:bg-[#095b6b] text-white px-6 py-3 rounded-full font-semibold transition shadow-md flex items-center gap-2 w-full md:w-auto justify-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Registrar Veterinario
          </a>
        </div>

        <div class="overflow-x-auto rounded-2xl border border-sky-100 grow">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-sky-50 text-slate-600 text-sm uppercase tracking-wide border-b border-sky-100">
                <th class="px-6 py-4 font-semibold">Profesional</th>
                <th class="px-6 py-4 font-semibold">Especialidad</th>
                <th class="px-6 py-4 font-semibold">Contacto</th>
                <th class="px-6 py-4 font-semibold text-center">Estado</th>
                <th class="px-6 py-4 font-semibold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-sky-50 text-slate-700">
              @if (paginatedVets.length === 0) {
                <tr>
                  <td colspan="5" class="px-6 py-8 text-center text-slate-500">
                    No se encontraron veterinarios.
                  </td>
                </tr>
              }
              
              <tr *ngFor="let vet of paginatedVets" class="hover:bg-slate-50 transition" [class.opacity-60]="!vet.isActive">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold overflow-hidden shrink-0">
                      <span>{{ vet.name.charAt(0) }}</span>
                    </div>
                    <div>
                      <p class="font-medium text-slate-800">Dr(a). {{ vet.name }}</p>
                      <p class="text-xs text-slate-500">{{ vet.email }}</p>
                    </div>
                  </div>
                </td>
                
                <td class="px-6 py-4">
                  <span class="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-100">
                    {{ vet.specialty }}
                  </span>
                </td>

                <td class="px-6 py-4 text-sm">{{ vet.phone || 'Sin teléfono' }}</td>
                
                <td class="px-6 py-4 text-center">
                  <span [class]="vet.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'" class="px-3 py-1 rounded-full text-xs font-bold">
                    {{ vet.isActive ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>

                <td class="px-6 py-4">
                  <div class="flex items-center justify-center gap-3">
                    <a [routerLink]="['/admin/veterinarios/editar', vet.id]" class="text-sky-500 hover:text-sky-700 transition cursor-pointer" title="Editar">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.158 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" /></svg>
                    </a>
                    
                    <a [routerLink]="['/admin/veterinarios', vet.id]" class="text-indigo-400 hover:text-indigo-600 transition cursor-pointer" title="Ver Detalles">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" /></svg>
                    </a>

                    <button (click)="toggleStatus(vet)" [class]="vet.isActive ? 'text-rose-400 hover:text-rose-600' : 'text-emerald-400 hover:text-emerald-600'" class="transition cursor-pointer" [title]="vet.isActive ? 'Desactivar' : 'Activar'">
                      <svg *ngIf="vet.isActive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" /></svg>
                      <svg *ngIf="!vet.isActive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 11.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" /></svg>
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
export class VetListComponent implements OnInit {
  searchTerm: string = '';
  vets: Vet[] = []; 
  isLoading: boolean = true;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private vetService: VetService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadVets();
  }

  loadVets(): void {
    this.isLoading = true;
    this.vetService.getAllVets().subscribe({
      next: (data) => {
        this.vets = data.map((vet: any) => ({
          ...vet,
          isActive: vet.isActive !== undefined ? vet.isActive : vet.active
        }));
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar veterinarios:', err);
        this.isLoading = false; 
        this.cdr.detectChanges();
      }
    });
  }

  onSearchChange(term: string) {
    this.searchTerm = term;
    this.currentPage = 1;
  }

  get filteredVets(): Vet[] {
    if (!this.searchTerm) return this.vets;
    const term = this.searchTerm.toLowerCase();
    return this.vets.filter(v => 
      (v.name?.toLowerCase() || '').includes(term) || 
      (v.specialty?.toLowerCase() || '').includes(term) ||
      (v.email?.toLowerCase() || '').includes(term)
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredVets.length / this.itemsPerPage);
  }

  get paginatedVets(): Vet[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredVets.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  toggleStatus(vet: Vet) {
    const action = vet.isActive ? 'desactivar' : 'activar';
    
    Swal.fire({
      title: `¿Estás seguro?`,
      text: `Vas a ${action} al Dr(a). ${vet.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: vet.isActive ? '#d33' : '#10b981',
      cancelButtonColor: '#64748b',
      confirmButtonText: `Sí, ${action}`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vetService.toggleVetStatus(vet.id!).subscribe({
          next: () => {
            vet.isActive = !vet.isActive; 
            
            this.cdr.detectChanges();

            Swal.fire({
              title: '¡Actualizado!',
              text: 'El estado del veterinario ha sido modificado.',
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