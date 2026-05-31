import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VetWorkService } from '../../services/vet-work.service';
import { AppointmentService } from '../../services/appointment.service';
import { ModalService } from '../../services/modal.services';
import { MedicalRecordModalComponent } from './medical-record-modal.component';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vet-appointments',
  standalone: true,
  imports: [CommonModule, MedicalRecordModalComponent],
  template: `
    <div class="p-6 max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold text-slate-800 mb-6">Mis citas</h2>

      @if (loading) {
        <div class="text-center py-10 text-slate-500">Cargando citas...</div>
      } @else if (appointments.length === 0) {
        <div class="text-center py-10 bg-white rounded-xl border border-slate-200 text-slate-500">
          No tienes citas programadas.
        </div>
      } @else {
        <div class="grid gap-4">
          @for (appt of appointments; track appt.id) {
            <div class="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-sky-500 hover:shadow-lg transition">
              <!-- Cabecera con fecha, hora y estado -->
              <div class="p-4 bg-slate-50 border-b border-slate-100 flex flex-wrap justify-between items-center gap-2">
                <div class="flex items-center gap-3">
                  <span class="font-bold text-slate-800">
                    📅 {{ appt.date }} | 🕒 {{ appt.time }}
                  </span>
                  <span class="px-2 py-1 rounded-full text-xs font-semibold" [ngClass]="getStatusBadgeClass(appt.status)">
                    {{ getStatusText(appt.status) }}
                  </span>
                </div>
                <select (change)="updateAppointmentStatus(appt.id, $event)" class="text-sm border border-slate-300 rounded-lg px-2 py-1 bg-white">
                  <option value="" disabled selected>Cambiar estado</option>
                  <option value="SCHEDULED">📋 Programada</option>
                  <option value="IN_PROGRESS">🟡 En consulta</option>
                  <option value="COMPLETED">✅ Finalizada</option>
                  <option value="MISSED">❌ No asistió</option>
                  <option value="CANCELLED">🚫 Cancelada</option>
                </select>
              </div>

              <!-- Cuerpo con datos -->
              <div class="p-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <div class="flex items-center gap-2 text-slate-700">
                      <span class="text-lg">🐾</span>
                      <span class="font-semibold">{{ appt.petName }}</span>
                      <span class="text-sm text-slate-500">({{ appt.petSpecies }})</span>
                    </div>
                    <div class="flex items-center gap-2 text-slate-600">
                      <span>👤</span>
                      <span>{{ appt.clientName }}</span>
                      <span class="text-sm text-slate-400">{{ appt.clientPhone }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-slate-600">
                      <span>🏥</span>
                      <span>{{ appt.serviceName }}</span>
                    </div>
                  </div>

                  <div class="flex flex-wrap gap-2 justify-start md:justify-end items-center">
                    <button (click)="openMedicalRecord(appt.id)"
                            class="flex items-center gap-2 px-3 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span class="text-sm font-medium">Historial clínico</span>
                    </button>

                    <button (click)="viewPetMedicalHistory(appt.petId)"
                            class="flex items-center gap-2 px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span class="text-sm font-medium">Historial mascota</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>

    @if (showModal) {
      <app-medical-record-modal [appointmentId]="selectedAppointmentId!" (closed)="onModalClosed()"></app-medical-record-modal>
    }
  `,
  styles: []
})
export class VetAppointmentsComponent implements OnInit, OnDestroy {
  appointments: any[] = [];
  loading = true;
  showModal = false;
  selectedAppointmentId: number | null = null;
  private modalSubscription!: Subscription;

  constructor(
    private vetWorkService: VetWorkService,
    private appointmentService: AppointmentService,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.modalSubscription = this.modalService.modalState$.subscribe(data => {
      this.showModal = !!data;
      this.selectedAppointmentId = data?.appointmentId || null;
    });
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }

  loadAppointments(): void {
    this.vetWorkService.getMyAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.loading = false;
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar las citas', 'error');
        this.loading = false;
      }
    });
  }

  updateAppointmentStatus(appointmentId: number, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value;

    Swal.fire({
      title: '¿Cambiar estado?',
      text: `¿Deseas marcar esta cita como "${this.getStatusText(newStatus)}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentService.updateAppointmentStatus(appointmentId, newStatus).subscribe({
          next: () => {
            Swal.fire('Actualizado', 'El estado de la cita ha sido actualizado', 'success');
            this.loadAppointments();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo actualizar el estado', 'error');
          }
        });
      } else {
        this.loadAppointments();
      }
    });
  }

  openMedicalRecord(appointmentId: number): void {
    this.modalService.open({ appointmentId });
  }

  viewPetMedicalHistory(petId: number): void {
    this.router.navigate(['/vet/medical-history', petId]);
  }

  onModalClosed(): void {
    this.loadAppointments();
  }

  getStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      'SCHEDULED': 'Programada',
      'IN_PROGRESS': 'En consulta',
      'COMPLETED': 'Finalizada',
      'MISSED': 'No asistió',
      'CANCELLED': 'Cancelada'
    };
    return statusMap[status] || status;
  }

  getStatusBadgeClass(status: string): string {
    const classMap: Record<string, string> = {
      'SCHEDULED': 'bg-blue-100 text-blue-700',
      'IN_PROGRESS': 'bg-yellow-100 text-yellow-700',
      'COMPLETED': 'bg-green-100 text-green-700',
      'MISSED': 'bg-red-100 text-red-700',
      'CANCELLED': 'bg-gray-100 text-gray-700'
    };
    return classMap[status] || 'bg-gray-100 text-gray-700';
  }
}