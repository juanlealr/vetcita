import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { VetService, Vet } from '../../services/vet.service';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-vet-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="vet" class="space-y-6">
      
      <div class="flex items-center gap-4">
        <a routerLink="/admin/veterinarios" class="p-2 hover:bg-slate-200 rounded-full transition text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </a>
        <h1 class="text-2xl font-bold text-slate-800">Perfil del Veterinario</h1>
      </div>

      <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div class="w-24 h-24 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-3xl font-bold shrink-0">
          {{ vet.name.charAt(0) }}
        </div>
        
        <div class="flex-1 w-full text-center md:text-left">
          <div class="flex flex-col md:flex-row md:items-center gap-3 mb-4">
            <h2 class="text-2xl font-bold text-slate-800">Dr(a). {{ vet.name }}</h2>
            <span [class]="vet.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'" class="px-3 py-1 rounded-full text-xs font-bold w-fit mx-auto md:mx-0">
              {{ vet.isActive ? 'Activo' : 'Inactivo' }}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-slate-50 p-4 rounded-2xl">
            <div>
              <p class="text-slate-500 mb-1">Especialidad</p>
              <p class="font-medium text-indigo-600">{{ vet.specialty }}</p>
            </div>
            <div>
              <p class="text-slate-500 mb-1">Correo Electrónico</p>
              <p class="font-medium text-slate-700">{{ vet.email }}</p>
            </div>
            <div>
              <p class="text-slate-500 mb-1">Teléfono</p>
              <p class="font-medium text-slate-700">{{ vet.phone || 'No registrado' }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        
        <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b border-slate-100 pb-4">
          <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span class="text-xl">📅</span> Agenda Médica
          </h3>

          <div class="flex bg-slate-100 p-1 rounded-lg gap-1 w-full md:w-auto">
            <button 
              (click)="viewMode = 'today'"
              [class]="viewMode === 'today' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500 hover:text-slate-700'"
              class="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-semibold transition cursor-pointer">
              Citas de Hoy
            </button>
            <button 
              (click)="viewMode = 'all'"
              [class]="viewMode === 'all' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500 hover:text-slate-700'"
              class="flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-semibold transition cursor-pointer">
              Todas las Citas
            </button>
          </div>
        </div>

        <div *ngIf="isLoadingAppointments" class="flex justify-center py-10">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
        </div>

        <div *ngIf="!isLoadingAppointments">
          
          <div *ngIf="filteredAppointments.length === 0" class="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <span class="text-4xl">☕</span>
            <p class="text-slate-500 mt-2 font-medium">
              El veterinario no tiene citas {{ viewMode === 'today' ? 'para hoy' : 'registradas' }}.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div *ngFor="let apt of filteredAppointments" 
                 class="p-5 rounded-2xl border transition hover:shadow-md"
                 [ngClass]="{
                   'bg-white border-slate-200': apt.status === 'SCHEDULED',
                   'bg-green-50 border-green-100': apt.status === 'COMPLETED',
                   'bg-red-50 border-red-100 opacity-75': apt.status === 'CANCELLED'
                 }">
              
              <div class="flex justify-between items-start mb-3">
                <span class="text-xs font-bold px-2 py-1 rounded-md"
                      [ngClass]="{
                        'bg-sky-100 text-sky-700': apt.status === 'SCHEDULED',
                        'bg-green-200 text-green-800': apt.status === 'COMPLETED',
                        'bg-red-200 text-red-800': apt.status === 'CANCELLED'
                      }">
                  {{ getStatusText(apt.status) }}
                </span>
                <div class="text-right">
                  <p class="text-slate-800 font-bold">{{ apt.time }}</p>
                  <p class="text-xs text-slate-500 font-medium">{{ apt.date }}</p>
                </div>
              </div>

              <div>
                <p class="font-bold text-slate-800 text-lg flex items-center gap-2">
                  🐾 {{ apt.petName }} 
                  <span class="text-xs font-normal text-slate-500">({{ apt.petSpecies }})</span>
                </p>
                <p class="text-indigo-600 text-sm font-medium mt-1">🩺 {{ apt.serviceName }}</p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>

    <div *ngIf="!vet" class="flex justify-center items-center min-h-[50vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
    </div>
  `
})
export class VetDetailComponent implements OnInit {
  vetId!: number;
  vet: Vet | null = null;
  
  appointments: any[] = [];
  isLoadingAppointments: boolean = true;
  viewMode: 'today' | 'all' = 'today'; 

  constructor(
    private route: ActivatedRoute,
    private vetService: VetService,
    private appointmentService: AppointmentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.vetId = +id;
        this.loadVetData();
        this.loadAppointments();
      }
    });
  }

  loadVetData(): void {
    this.vetService.getVetById(this.vetId).subscribe({
      next: (data) => {
        this.vet = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando los datos del veterinario:', err)
    });
  }

  loadAppointments(): void {
    this.isLoadingAppointments = true;
    this.appointmentService.getVetAppointments(this.vetId).subscribe({
      next: (data) => {
        this.appointments = data;
        this.isLoadingAppointments = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando citas:', err);
        this.isLoadingAppointments = false;
        this.cdr.detectChanges();
      }
    });
  }

  get filteredAppointments(): any[] {
    if (this.viewMode === 'all') {
      return this.appointments;
    }
    
    const today = new Date().toISOString().split('T')[0];
    return this.appointments.filter(apt => apt.date === today);
  }

  getStatusText(status: string): string {
    const statuses: Record<string, string> = {
      'SCHEDULED': 'Programada',
      'COMPLETED': 'Completada',
      'CANCELLED': 'Cancelada'
    };
    return statuses[status] || status;
  }
}