import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MedicalServiceService, MedicalServiceData } from '../../services/medical-service.service';

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 min-h-[80vh] flex flex-col">
      <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 class="text-2xl font-bold text-slate-800">Servicios Médicos</h1>
        <a routerLink="/admin/servicios/nuevo" class="bg-[#0C7489] hover:bg-[#095b6b] text-white px-6 py-3 rounded-full font-semibold transition shadow-md flex items-center gap-2 cursor-pointer">
          + Nuevo Servicio
        </a>
      </div>

      <div class="overflow-x-auto rounded-2xl border border-sky-100 grow">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-sky-50 text-slate-600 text-sm uppercase tracking-wide border-b border-sky-100">
              <th class="px-6 py-4 font-semibold">Servicio</th>
              <th class="px-6 py-4 font-semibold text-center">Duración</th>
              <th class="px-6 py-4 font-semibold text-right">Precio</th>
              <th class="px-6 py-4 font-semibold text-center">Estado</th>
              <th class="px-6 py-4 font-semibold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-sky-50 text-slate-700">
            
            <tr *ngIf="isLoading">
              <td colspan="5" class="px-6 py-12 text-center text-slate-500 animate-pulse">
                <span class="text-3xl block mb-2">🩺</span>
                Cargando servicios médicos...
              </td>
            </tr>

            <ng-container *ngIf="!isLoading">
              <tr *ngFor="let srv of services" class="hover:bg-slate-50 transition" [class.opacity-60]="!srv.isActive">
                <td class="px-6 py-4">
                  <p class="font-bold text-slate-800">{{ srv.name }}</p>
                  <p class="text-xs text-slate-500 truncate max-w-xs">{{ srv.description }}</p>
                </td>
                <td class="px-6 py-4 text-center text-sm font-medium">{{ srv.estimatedDurationMinutes }} min</td>
                <td class="px-6 py-4 text-right font-bold text-sky-700">{{ srv.price | currency }}</td>
                <td class="px-6 py-4 text-center">
                  <span [class]="srv.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'" class="px-3 py-1 rounded-full text-xs font-bold">
                    {{ srv.isActive ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center justify-center gap-3">
                    <a [routerLink]="['/admin/servicios/editar', srv.id]" class="text-sky-500 hover:text-sky-700 font-medium cursor-pointer">Editar</a>
                    <button (click)="toggleStatus(srv)" [class]="srv.isActive ? 'text-rose-400 hover:text-rose-600' : 'text-emerald-400 hover:text-emerald-600'" class="font-medium cursor-pointer">
                      {{ srv.isActive ? 'Desactivar' : 'Activar' }}
                    </button>
                  </div>
                </td>
              </tr>
            </ng-container>

            <tr *ngIf="!isLoading && services.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-slate-500">No hay servicios registrados.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ServicesListComponent implements OnInit {
  services: MedicalServiceData[] = [];
  isLoading = true;

  constructor(private serviceService: MedicalServiceService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.isLoading = true;
    this.serviceService.getAllServices().subscribe({
      next: (data) => {
        this.services = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar servicios:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleStatus(srv: MedicalServiceData) {
    Swal.fire({
      title: '¿Confirmar acción?',
      text: `Vas a ${srv.isActive ? 'desactivar' : 'activar'} el servicio ${srv.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceService.toggleServiceStatus(srv.id!).subscribe(() => {
          this.loadServices();
        });
      }
    });
  }
}