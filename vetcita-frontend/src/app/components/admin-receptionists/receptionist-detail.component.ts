import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ReceptionistService, ReceptionistProfile } from '../../services/receptionist.service';

@Component({
  selector: 'app-receptionist-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="receptionist" class="space-y-6">
      
      <div class="flex items-center gap-4">
        <a routerLink="/admin/recepcionistas" class="p-2 hover:bg-slate-200 rounded-full transition text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </a>
        <h1 class="text-2xl font-bold text-slate-800">Perfil del Recepcionista</h1>
      </div>

      <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center md:items-start gap-6">
        
        <div class="w-24 h-24 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-3xl font-bold shrink-0 uppercase">
          {{ receptionist.firstName.charAt(0) }}{{ receptionist.lastName.charAt(0) }}
        </div>
        
        <div class="flex-1 w-full text-center md:text-left">
          
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div class="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
              <h2 class="text-2xl font-bold text-slate-800">
                {{ receptionist.firstName }} {{ receptionist.lastName }}
              </h2>
              <span [class]="receptionist.active ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'" class="px-3 py-1 rounded-full text-xs font-bold w-fit mx-auto md:mx-0">
                {{ receptionist.active ? 'Activo' : 'Inactivo' }}
              </span>
            </div>

            <button 
              [routerLink]="['/admin/recepcionistas/editar', receptionist.id]"
              class="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-sky-50 text-sky-700 font-semibold hover:bg-sky-100 transition text-sm w-full md:w-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              Editar Datos
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm bg-slate-50 p-5 rounded-2xl">
            <div>
              <p class="text-slate-500 mb-1">Documento de Identidad</p>
              <p class="font-medium text-slate-700 uppercase">
                {{ receptionist.identificationType }} - {{ receptionist.identificationNumber }}
              </p>
            </div>
            <div>
              <p class="text-slate-500 mb-1">Correo Electrónico</p>
              <p class="font-medium text-slate-700">{{ receptionist.email }}</p>
            </div>
            <div>
              <p class="text-slate-500 mb-1">Teléfono</p>
              <p class="font-medium text-slate-700">{{ receptionist.phone || 'No registrado' }}</p>
            </div>
            <div>
              <p class="text-slate-500 mb-1">Rol en Sistema</p>
              <p class="font-medium text-slate-700">{{ receptionist.role || 'Recepcionista' }}</p>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div *ngIf="!receptionist" class="flex justify-center items-center min-h-[50vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
    </div>
  `
})
export class ReceptionistDetailComponent implements OnInit {
  receptionistId!: number;
  receptionist: ReceptionistProfile | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private receptionistService: ReceptionistService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.receptionistId = +id;
        this.loadReceptionistData();
      }
    });
  }

  loadReceptionistData(): void {
    this.receptionistService.getReceptionistById(this.receptionistId).subscribe({
      next: (data) => {
        this.receptionist = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando los datos del recepcionista:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información del recepcionista.',
          confirmButtonColor: '#0284c7'
        });
        this.router.navigate(['/admin/recepcionistas']);
      }
    });
  }
}