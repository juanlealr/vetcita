import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminDashboardService, DashboardMetrics } from '../../services/admin-dashboard.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-receptionist-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-100">
      <div class="grid xl:grid-cols-[280px_1fr] gap-6 p-6">

        <aside class="min-h-screen bg-[#0f5f72] text-white shadow-2xl overflow-hidden flex flex-col">
          <div class="px-6 pb-8 pt-10">
            <div class="flex items-center gap-4">
              <div class="relative">
                <div class="h-20 w-20 rounded-full border border-white/10 bg-slate-300 p-1">
                  <div class="h-full w-full rounded-full bg-slate-400 flex items-center justify-center text-3xl text-slate-700 overflow-hidden">
                    <span *ngIf="(currentUser$ | async)?.foto; else initials">
                      <img [src]="(currentUser$ | async)?.foto" alt="Avatar" class="h-full w-full rounded-full object-cover" />
                    </span>
                    <ng-template #initials>
                      <span>{{ ((currentUser$ | async)?.name || 'R')[0] || 'R' }}</span>
                    </ng-template>
                  </div>
                </div>
              </div>
              <div>
                <p class="text-xs uppercase tracking-[0.24em] text-slate-200/80">Bienvenido</p>
                <h2 class="text-2xl font-bold text-white">{{ (currentUser$ | async)?.name || 'Recepcionista' }}</h2>
                <p class="mt-1 text-sm text-slate-200">{{ translateRole(role) }}</p>
              </div>
            </div>
            <div class="mt-6 rounded-[1.75rem] border border-white/10 bg-[#0f5f72] p-4">
              <p class="text-sm text-slate-200/80">Tarea rápida</p>
              <p class="mt-1 text-sm text-slate-200">Revisa tus citas del día y gestiona el flujo de recepción.</p>
            </div>
          </div>

          <nav class="flex-1 px-6 py-8 space-y-3">
            <button type="button" (click)="setActiveSection('dashboard')" [ngClass]="activeSection === 'dashboard' ? 'bg-cyan-400 text-white shadow-cyan-500/20' : 'bg-transparent text-slate-100 hover:bg-cyan-400/10'" class="flex w-full items-center gap-3 rounded-full px-5 py-4 shadow-sm ring-1 ring-white/10 transition">
              <span class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-100">🏠</span>
              <span class="font-semibold">Dashboard</span>
            </button>
            <button type="button" (click)="setActiveSection('today')" [ngClass]="activeSection === 'today' ? 'bg-cyan-400 text-white shadow-cyan-500/20' : 'bg-transparent text-slate-100 hover:bg-cyan-400/10'" class="flex w-full items-center gap-3 rounded-full px-5 py-4 shadow-sm ring-1 ring-white/10 transition">
              <span class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-100">📅</span>
              <span>Citas del día</span>
            </button>
            <button type="button" (click)="setActiveSection('upcoming')" [ngClass]="activeSection === 'upcoming' ? 'bg-cyan-400 text-white shadow-cyan-500/20' : 'bg-transparent text-slate-100 hover:bg-cyan-400/10'" class="flex w-full items-center gap-3 rounded-full px-5 py-4 shadow-sm ring-1 ring-white/10 transition">
              <span class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-100">⏰</span>
              <span>Próximas citas</span>
            </button>
            <button type="button" (click)="setActiveSection('calendar')" [ngClass]="activeSection === 'calendar' ? 'bg-cyan-400 text-white shadow-cyan-500/20' : 'bg-transparent text-slate-100 hover:bg-cyan-400/10'" class="flex w-full items-center gap-3 rounded-full px-5 py-4 shadow-sm ring-1 ring-white/10 transition">
              <span class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-100">📆</span>
              <span>Calendario</span>
            </button>
          </nav>

          <div class="p-6 border-t border-white/10">
            <button (click)="logout()" class="w-full rounded-3xl bg-sky-500 px-5 py-3 text-white font-semibold shadow-lg shadow-sky-500/20 transition hover:bg-sky-400">
              Cerrar sesión
            </button>
          </div>
        </aside>

        <main class="space-y-6">
          <section *ngIf="activeSection === 'dashboard'" id="dashboard" class="rounded-[2rem] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-200/80">
            <div class="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Panel Vet Cita</p>
                <h1 class="mt-3 text-3xl font-bold text-slate-900">Panel de Recepción</h1>
                <p class="mt-2 text-slate-500">Resumen operativo de hoy y ventas de citas para tu jornada.</p>
              </div>
              <button class="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-white font-semibold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition">
                <span class="text-xl">+</span>
                Añadir cita
              </button>
            </div>

            <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div class="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
                <p class="text-sm font-semibold text-slate-500 uppercase tracking-[0.2em]">Citas del día</p>
                <p class="mt-4 text-4xl font-bold text-slate-900">{{ metrics?.citasDelDia ?? '--' }}</p>
                <p class="mt-2 text-sm text-slate-500">{{ metrics?.citasHoy?.length ? metrics?.citasHoy?.length + ' citas hoy' : 'No hay citas hoy' }}</p>
              </div>
              <div class="rounded-[1.75rem] border border-slate-200/80 bg-amber-50 p-6 shadow-sm">
                <p class="text-sm font-semibold text-amber-700 uppercase tracking-[0.2em]">Próximas citas</p>
                <p class="mt-4 text-4xl font-bold text-amber-900">{{ metrics?.proximasCitas ?? '--' }}</p>
              </div>
              <div class="rounded-[1.75rem] border border-slate-200/80 bg-violet-50 p-6 shadow-sm">
                <p class="text-sm font-semibold text-violet-700 uppercase tracking-[0.2em]">Clientes</p>
                <p class="mt-4 text-4xl font-bold text-violet-900">{{ metrics?.totalClientes ?? '--' }}</p>
              </div>
              <div class="rounded-[1.75rem] border border-slate-200/80 bg-rose-50 p-6 shadow-sm">
                <p class="text-sm font-semibold text-rose-700 uppercase tracking-[0.2em]">Mascotas</p>
                <p class="mt-4 text-4xl font-bold text-rose-900">{{ metrics?.totalMascotas ?? '--' }}</p>
              </div>
            </div>
          </section>

          <section *ngIf="activeSection === 'today'" id="today" class="rounded-[2rem] bg-[#ecfeff] p-6 shadow-[0_20px_50px_rgba(14,165,233,0.12)] border border-cyan-200">
            <div class="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 class="text-xl font-bold text-slate-900">Citas del día</h2>
                <p class="text-sm text-slate-500">Revisa las citas programadas para hoy.</p>
              </div>
              <span class="inline-flex items-center rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-800">
                {{ metrics?.citasHoy?.length ?? 0 }} citas hoy
              </span>
            </div>

            <div *ngIf="isLoading" class="text-slate-500">Cargando citas del día...</div>
            <div *ngIf="!isLoading && (!metrics?.citasHoy || metrics?.citasHoy?.length === 0)" class="text-slate-500">No hay citas programadas para hoy.</div>

            <div class="space-y-4" *ngIf="!isLoading && metrics?.citasHoy?.length">
              <div *ngFor="let cita of metrics?.citasHoy" class="rounded-[2rem] border border-cyan-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div class="flex flex-col gap-4">
                  <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div class="flex items-start gap-4">
                      <span class="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-50 text-cyan-600 text-lg">📅</span>
                      <div>
                        <p class="font-semibold text-slate-900">{{ cita.time }} · {{ cita.petName }} ({{ cita.petSpecies }})</p>
                        <p class="mt-1 text-sm text-slate-500">Veterinario: {{ cita.vetName }}</p>
                        <p class="mt-1 text-sm text-slate-500">Dueño: {{ cita.ownerName || 'Desconocido' }}</p>
                      </div>
                    </div>
                    <span class="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
                      [ngClass]="getStatusClass(cita.status)">
                      {{ getStatusLabel(cita.status) }}
                    </span>
                  </div>
                  <div class="grid gap-3 sm:grid-cols-2">
                    <div class="rounded-3xl bg-slate-50 p-4">
                      <p class="text-xs uppercase tracking-[0.24em] text-slate-400">Servicio</p>
                      <p class="mt-2 text-sm font-semibold text-slate-900">{{ cita.serviceName || 'Servicio' }}</p>
                    </div>
                    <div class="rounded-3xl bg-slate-50 p-4">
                      <p class="text-xs uppercase tracking-[0.24em] text-slate-400">Descripción</p>
                      <p class="mt-2 text-sm text-slate-700">{{ cita.notes || 'Sin descripción' }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section *ngIf="activeSection === 'upcoming'" id="upcoming" class="rounded-[2rem] bg-[#ecfeff] p-6 shadow-[0_20px_50px_rgba(14,165,233,0.12)] border border-cyan-200">
            <div class="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 class="text-xl font-bold text-slate-900">Próximas citas</h2>
                <p class="text-sm text-slate-500">Las próximas citas agendadas y su estado.</p>
              </div>
              <span class="inline-flex items-center rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-800">
                {{ metrics?.proximasCitas ?? 0 }} en agenda
              </span>
            </div>

            <div *ngIf="isLoading" class="text-slate-500">Cargando próximas citas...</div>
            <div *ngIf="!isLoading && (!metrics?.ultimasCitas || metrics?.ultimasCitas?.length === 0)" class="text-slate-500">No hay próximas citas para mostrar.</div>

            <div class="space-y-4" *ngIf="!isLoading && metrics?.ultimasCitas?.length">
              <div *ngFor="let cita of metrics?.ultimasCitas" class="rounded-[2rem] border border-cyan-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div class="flex items-start gap-4">
                    <span class="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-50 text-cyan-600 text-lg">📅</span>
                    <div>
                      <p class="font-semibold text-slate-900">{{ cita.date }} · {{ cita.time }} · {{ cita.petName }}</p>
                      <p class="mt-1 text-sm text-slate-500">{{ cita.vetName }} · {{ cita.serviceName || 'Servicio' }}</p>
                    </div>
                  </div>
                  <span class="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
                    [ngClass]="getStatusClass(cita.status)">
                    {{ getStatusLabel(cita.status) }}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section *ngIf="activeSection === 'calendar'" id="calendar" class="space-y-6">
            <div class="rounded-[2rem] bg-[#f0f9ff] p-6 shadow-[0_20px_50px_rgba(14,165,233,0.12)] border border-cyan-200">
              <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Calendario</p>
                  <h1 class="mt-3 text-3xl font-bold text-slate-900">Agenda de Recepción</h1>
                  <p class="mt-2 text-slate-500">Una vista de calendario para la gestión diaria.</p>
                </div>
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button class="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-700 transition">
                    + Nueva cita
                  </button>
                  <button class="inline-flex items-center rounded-full bg-white px-4 py-3 text-slate-700 hover:bg-slate-100 transition">
                    Recepcionista
                  </button>
                </div>
              </div>

              <div class="mt-8 rounded-[1.75rem] bg-slate-50 p-6 shadow-inner shadow-slate-950/10 border border-slate-200/80">
                <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 class="text-lg font-semibold text-slate-900">Agenda de abril de 2024</h2>
                  </div>
                  <div class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
                    <button type="button" class="rounded-full px-3 py-2 text-slate-500 hover:bg-slate-100">←</button>
                    <button type="button" class="rounded-full px-3 py-2 text-slate-500 hover:bg-slate-100">Hoy</button>
                    <button type="button" class="rounded-full px-3 py-2 text-slate-500 hover:bg-slate-100">→</button>
                  </div>
                </div>

                <div class="mt-6 grid grid-cols-7 gap-3 text-center text-sm font-semibold text-slate-500">
                  <span class="text-slate-400">Lun</span>
                  <span class="text-slate-400">Mar</span>
                  <span class="text-slate-400">Mié</span>
                  <span class="text-slate-400">Jue</span>
                  <span class="text-slate-400">Vie</span>
                  <span class="text-slate-400">Sáb</span>
                  <span class="text-slate-400">Dom</span>
                </div>

                <div class="mt-4 grid grid-cols-7 gap-3 text-sm text-slate-600">
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">1</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">2</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">3</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">4</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">5</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">6</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">7</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">8</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">9</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">10</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">11</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">12</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">13</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">14</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">15</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">16</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">17</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">18</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">19</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">20</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">21</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">22</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">23</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">24</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">25</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">26</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">27</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">28</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">29</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">30</span>
                  <span class="rounded-3xl bg-slate-100 p-4 text-slate-300">31</span>
                </div>
              </div>
            </div>

            <div class="grid gap-4 xl:grid-cols-[1.45fr_0.95fr]">
              <div class="rounded-[2rem] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-200/80">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <p class="text-sm text-slate-500">Felix (Gato) - 10:00 AM</p>
                    <p class="mt-2 text-lg font-semibold text-slate-900">Ricardo Diaz · Dr. Sanez</p>
                  </div>
                  <span class="rounded-full bg-amber-100 px-3 py-2 text-amber-900 text-sm font-semibold">Pendiente</span>
                </div>
              </div>
              <div class="rounded-[2rem] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-200/80">
                <div class="grid gap-3 text-sm">
                  <span class="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-emerald-700">✔ Confirmadas</span>
                  <span class="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-2 text-amber-700">⏳ Pendientes</span>
                  <span class="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-2 text-rose-700">✖ Canceladas</span>
                  <span class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-slate-700">✔ Finalizadas</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  `
})
export class ReceptionistDashboardComponent implements OnInit {
  metrics?: DashboardMetrics;
  isLoading: boolean = true;
  activeSection: 'dashboard' | 'today' | 'upcoming' | 'calendar' = 'dashboard';
  role: string | null = null;

  get currentUser$() {
    return this.authService.currentUser$;
  }

  constructor(
    private dashboardService: AdminDashboardService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    this.dashboardService.getMetrics().subscribe({
      next: (data) => {
        this.metrics = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  setActiveSection(section: 'dashboard' | 'today' | 'upcoming' | 'calendar'): void {
    this.activeSection = section;
  }

  translateRole(role: string | null): string {
    const normalized = role ? role.replace('ROLE_', '').toUpperCase() : '';
    const roleMap: Record<string, string> = {
      RECEPTIONIST: 'Recepcionista',
      ADMIN: 'Administrador',
      VET: 'Veterinario',
      CLIENT: 'Cliente'
    };
    return roleMap[normalized] || 'Recepcionista';
  }

  getStatusLabel(status?: string): string {
    const statusMap: Record<string, string> = {
      SCHEDULED: 'Programada',
      CONFIRMED: 'Confirmada',
      PENDING: 'Pendiente',
      CANCELLED: 'Cancelada',
      COMPLETED: 'Finalizada'
    };
    return status ? statusMap[status.toUpperCase()] || status : 'Programada';
  }

  getStatusClass(status?: string): string {
    const normalized = status ? status.toUpperCase() : 'SCHEDULED';
    return {
      'SCHEDULED': 'bg-slate-100 text-slate-600',
      'CONFIRMED': 'bg-emerald-100 text-emerald-700',
      'PENDING': 'bg-amber-100 text-amber-800',
      'CANCELLED': 'bg-rose-100 text-rose-700',
      'COMPLETED': 'bg-slate-100 text-slate-600'
    }[normalized] || 'bg-slate-100 text-slate-600';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
