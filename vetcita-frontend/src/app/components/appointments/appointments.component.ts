import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-4xl mx-auto relative">
      <div class="mb-8 bg-white rounded-3xl p-6 shadow-sm border border-sky-100 flex items-center justify-between">
         <img src="/assets/images/logo.png" alt="Vet Cita" class="h-16 object-contain" onerror="this.src='https://via.placeholder.com/150x50?text=VET+CITA'">
      </div>

      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold text-slate-900">Mis citas</h1>
        <button routerLink="/client/agendar" 
                class="bg-[#0e7490] hover:bg-cyan-800 text-white font-semibold py-2 px-6 rounded-xl transition-colors shadow-md flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Agendar Cita
        </button>
      </div>

      <div class="flex gap-4 mb-6">
        <button (click)="setActiveTab('upcoming')" 
                [class.bg-sky-600]="activeTab() === 'upcoming'" [class.text-white]="activeTab() === 'upcoming'"
                [class.bg-slate-200]="activeTab() !== 'upcoming'" [class.text-slate-700]="activeTab() !== 'upcoming'"
                class="px-6 py-2 rounded-full font-semibold transition-colors">
          Próximas citas
        </button>
        <button (click)="setActiveTab('history')" 
                [class.bg-sky-600]="activeTab() === 'history'" [class.text-white]="activeTab() === 'history'"
                [class.bg-slate-200]="activeTab() !== 'history'" [class.text-slate-700]="activeTab() !== 'history'"
                class="px-6 py-2 rounded-full font-semibold transition-colors">
          Historial de citas
        </button>
      </div>

      @if (isLoading()) {
        <div class="text-center py-10 text-slate-500 font-medium">
          Cargando citas...
        </div>
      } @else {
        <div class="space-y-4">
          @if (displayedAppointments().length === 0) {
            <div class="text-center py-10 bg-white rounded-2xl border border-slate-200 text-slate-500">
              No hay citas para mostrar en esta sección.
            </div>
          }

          @for (appt of displayedAppointments(); track appt.id) {
            <div class="bg-white rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm border border-slate-200 hover:border-sky-200 transition-colors gap-4">
              <div>
                <div class="flex items-center gap-3 mb-1">
                  <p class="font-bold text-slate-800 text-lg">{{ appt.date }} | {{ appt.time }}</p>
                  
                  @if (appt.status === 'CANCELLED') {
                    <span class="bg-rose-100 text-rose-700 text-xs px-2 py-1 rounded-md font-bold">Cancelada</span>
                  }
                  
                  @if (appt.status === 'COMPLETED') {
                    <span class="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-md font-bold">Completada</span>
                  }
                </div>
                <p class="text-sm text-slate-700">Paciente: <span class="font-semibold">{{ appt.petName }} ({{ appt.petSpecies }})</span></p>
                <p class="text-sm text-slate-700">Servicio: {{ appt.serviceName }}</p>
              </div>
              
              <div class="flex gap-3 self-end sm:self-auto">
                <button (click)="openModal(appt)" title="Ver Detalles"
                        class="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center hover:bg-sky-200 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
                
                @if (activeTab() === 'upcoming' && appt.status !== 'CANCELLED') {
                  <button (click)="cancelAppointment(appt.id)" title="Cancelar Cita"
                          class="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center hover:bg-rose-200 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                }
              </div>
            </div>
          }
        </div>
      }

      @if (selectedAppointment()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div class="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
            <button (click)="closeModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <h2 class="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">Detalles de la Cita</h2>
            
            <div class="space-y-4 text-slate-700">
              <div>
                <p class="text-xs text-slate-400 font-bold uppercase tracking-wider">Fecha y Hora</p>
                <p class="font-medium text-lg">{{ selectedAppointment()?.date }} a las {{ selectedAppointment()?.time }}</p>
              </div>
              <div>
                <p class="text-xs text-slate-400 font-bold uppercase tracking-wider">Servicio</p>
                <p class="font-medium">{{ selectedAppointment()?.serviceName }}</p>
              </div>
              <div>
                <p class="text-xs text-slate-400 font-bold uppercase tracking-wider">Médico Veterinario</p>
                <p class="font-medium">Dr(a). {{ selectedAppointment()?.vetName }}</p>
              </div>
              <div>
                <p class="text-xs text-slate-400 font-bold uppercase tracking-wider">Paciente</p>
                <p class="font-medium">{{ selectedAppointment()?.petName }} ({{ selectedAppointment()?.petSpecies }})</p>
              </div>
              <div>
                <p class="text-xs text-slate-400 font-bold uppercase tracking-wider">Estado</p>
                <p class="font-medium inline-block px-3 py-1 rounded-md text-sm mt-1"
                   [ngClass]="{
                     'bg-sky-100 text-sky-700': selectedAppointment()?.status === 'SCHEDULED',
                     'bg-emerald-100 text-emerald-700': selectedAppointment()?.status === 'COMPLETED',
                     'bg-rose-100 text-rose-700': selectedAppointment()?.status === 'CANCELLED'
                   }">
                  {{ selectedAppointment()?.status }}
                </p>
              </div>
            </div>

            <div class="mt-8">
              <button (click)="closeModal()" class="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.2s ease-out; }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class AppointmentsComponent implements OnInit {
  activeTab = signal<'upcoming' | 'history'>('upcoming');
  isLoading = signal<boolean>(true);
  appointments = signal<any[]>([]);
  selectedAppointment = signal<any | null>(null);

  displayedAppointments = computed(() => {
    const now = new Date();
    const currentTab = this.activeTab();
    const allAppointments = this.appointments();
    
    return allAppointments.filter(appt => {
      const apptDateTime = new Date(`${appt.date}T${appt.time}`);
      
      if (currentTab === 'upcoming') {
        return apptDateTime >= now && appt.status !== 'CANCELLED';
      }
      return true;
      
    }).sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`).getTime();
      const dateB = new Date(`${b.date}T${b.time}`).getTime();
      return currentTab === 'upcoming' ? dateA - dateB : dateB - dateA;
    });
  });

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.isLoading.set(true);
    this.appointmentService.getMyAppointments().subscribe({
      next: (data) => {
        this.appointments.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando citas', err);
        this.isLoading.set(false);
        Swal.fire('Error', 'No se pudieron cargar tus citas.', 'error');
      }
    });
  }

  setActiveTab(tab: 'upcoming' | 'history') {
    this.activeTab.set(tab);
  }

  openModal(appointment: any) {
    this.selectedAppointment.set(appointment);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedAppointment.set(null);
    document.body.style.overflow = 'auto';
  }

  cancelAppointment(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer y la cita será cancelada.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Sí, cancelar cita',
      cancelButtonText: 'No, mantenerla'
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentService.cancelAppointment(id).subscribe({
          next: () => {
            Swal.fire('¡Cancelada!', 'Tu cita ha sido cancelada.', 'success');
            this.loadAppointments();
          },
          error: () => {
            Swal.fire('Error', 'Hubo un problema al cancelar la cita.', 'error');
          }
        });
      }
    });
  }
}