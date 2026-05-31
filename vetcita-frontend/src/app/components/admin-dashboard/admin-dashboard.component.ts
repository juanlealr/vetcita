import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardService, DashboardMetrics } from '../../services/admin-dashboard.service';

interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasAppointments: boolean;
  appointments: any[];
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-8">
      
      <div class="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div class="absolute right-32 opacity-20 pointer-events-none">
          <span class="text-9xl">🐾</span>
        </div>
        <div class="z-10">
          <h1 class="text-2xl font-bold text-slate-800">Vet Cita Dashboard</h1>
          <p class="text-slate-500 text-sm">Resumen operativo de hoy</p>
        </div>
        <button class="z-10 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full font-bold shadow-md transition flex items-center gap-2 cursor-pointer">
          <span>+</span> Añadir cita
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" *ngIf="metrics">
        
        <div class="bg-green-100 rounded-xl p-4 flex items-center justify-between border border-green-200">
          <div class="flex items-center gap-2">
            <span class="text-2xl">📅</span>
            <span class="font-semibold text-green-800">Citas del día</span>
          </div>
          <span class="bg-green-200 text-green-900 px-3 py-1 rounded-lg font-bold text-xl">
            {{ metrics.citasDelDia }}
          </span>
        </div>

        <div class="bg-orange-100 rounded-xl p-4 flex items-center justify-between border border-orange-200">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🗓️</span>
            <span class="font-semibold text-orange-800">Próximas citas</span>
          </div>
          <span class="bg-orange-200 text-orange-900 px-3 py-1 rounded-lg font-bold text-xl">
            {{ metrics.proximasCitas }}
          </span>
        </div>

        <div class="bg-purple-100 rounded-xl p-4 flex items-center justify-between border border-purple-200">
          <div class="flex items-center gap-2">
            <span class="text-2xl">👤</span>
            <span class="font-semibold text-purple-800">Clientes</span>
          </div>
          <span class="bg-purple-200 text-purple-900 px-3 py-1 rounded-lg font-bold text-xl">
            {{ metrics.totalClientes }}
          </span>
        </div>

        <div class="bg-red-100 rounded-xl p-4 flex items-center justify-between border border-red-200">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🐾</span>
            <span class="font-semibold text-red-800">Mascotas</span>
          </div>
          <span class="bg-red-200 text-red-900 px-3 py-1 rounded-lg font-bold text-xl">
            {{ metrics.totalMascotas }}
          </span>
        </div>
      </div>

      <div *ngIf="!metrics && isLoading" class="text-center py-10 text-slate-500 animate-pulse">
        Cargando métricas...
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div class="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-center mb-6">
              <div>
                <h2 class="text-lg font-bold text-slate-800">Agenda Operativa</h2>
                <p class="text-sm text-slate-400 capitalize">{{ monthNames[currentMonth] }} {{ currentYear }}</p>
              </div>
              <div class="flex gap-2">
                <button (click)="changeMonth(-1)" class="p-2 hover:bg-slate-100 rounded-full transition cursor-pointer text-slate-600 font-bold">❮</button>
                <button (click)="changeMonth(1)" class="p-2 hover:bg-slate-100 rounded-full transition cursor-pointer text-slate-600 font-bold">❯</button>
              </div>
            </div>

            <div class="grid grid-cols-7 text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <div *ngFor="let day of weekDays">{{ day }}</div>
            </div>

            <div class="grid grid-cols-7 gap-2">
              <div 
                *ngFor="let cell of calendarCells" 
                [class.opacity-30]="!cell.isCurrentMonth"
                [class.bg-sky-50]="cell.isToday"
                [class.border-sky-400]="cell.isToday"
                class="min-h-[85px] p-2 border border-slate-100 rounded-xl flex flex-col transition hover:bg-slate-50 relative"
              >
                <span [class.text-sky-600]="cell.isToday" [class.font-bold]="cell.isToday" class="text-sm text-slate-700 mb-1">
                  {{ cell.dayNumber }}
                </span>

                <div class="flex flex-col gap-1 overflow-hidden">
                  <div *ngFor="let apt of cell.appointments | slice:0:2" class="text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded truncate font-medium">
                    {{ apt.time }} {{ apt.petName }}
                  </div>
                  <div *ngIf="cell.appointments.length > 2" class="text-[10px] text-slate-400 font-semibold pl-1">
                    +{{ cell.appointments.length - 2 }} más
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-slate-100 rounded-3xl p-6 border border-slate-200 flex flex-col h-full">
          <div class="flex items-center gap-2 mb-6">
            <span class="text-xl">📋</span>
            <h2 class="text-lg font-bold text-slate-700">Últimas citas</h2>
          </div>

          <div class="space-y-4 flex-1 overflow-y-auto max-h-[450px] pr-1">
            
            <div *ngIf="metrics?.ultimasCitas?.length === 0" class="text-center text-sm text-slate-500 py-4">
              No hay citas recientes registradas.
            </div>

            <div *ngFor="let cita of metrics?.ultimasCitas" class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
              <p class="font-bold text-slate-800">{{ cita.petName }} ({{ cita.petSpecies }})</p>
              <div class="text-sm text-slate-500 mt-1 flex flex-col gap-1">
                <span class="flex items-center gap-1">🕒 {{ cita.date }} - {{ cita.time }}</span>
                <span class="flex items-center gap-1">👨‍⚕️ {{ cita.vetName }}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  metrics?: DashboardMetrics;
  isLoading = true;

  currentMonth!: number;
  currentYear!: number;
  weekDays: string[] = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  monthNames: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  calendarCells: CalendarDay[] = [];

  constructor(
    private dashboardService: AdminDashboardService,
    private cdr: ChangeDetectorRef 
  ) {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
  }

  ngOnInit(): void {
    this.dashboardService.getMetrics().subscribe({
      next: (data) => {
        this.metrics = data;
        this.isLoading = false;
        this.generateCalendar();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.generateCalendar();
        this.cdr.detectChanges();
      }
    });
  }

  generateCalendar(): void {
    this.calendarCells = [];
    
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    
    const startDayOfWeek = firstDayOfMonth.getDay(); 
    const totalDaysInMonth = lastDayOfMonth.getDate();

    const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const targetDate = new Date(this.currentYear, this.currentMonth - 1, prevMonthLastDay - i);
      this.calendarCells.push(this.createCalendarDayObj(targetDate, false));
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
      const targetDate = new Date(this.currentYear, this.currentMonth, day);
      this.calendarCells.push(this.createCalendarDayObj(targetDate, true));
    }

    const remainingCells = 42 - this.calendarCells.length;
    for (let i = 1; i <= remainingCells; i++) {
      const targetDate = new Date(this.currentYear, this.currentMonth + 1, i);
      this.calendarCells.push(this.createCalendarDayObj(targetDate, false));
    }
  }

  private createCalendarDayObj(date: Date, isCurrentMonth: boolean): CalendarDay {
    const today = new Date();
    
    const isToday = date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear();

    let dayAppointments: any[] = [];
    
    if (this.metrics && this.metrics.ultimasCitas) {
      const yearStr = date.getFullYear();
      const monthStr = String(date.getMonth() + 1).padStart(2, '0');
      const dayStr = String(date.getDate()).padStart(2, '0');
      const formattedCellDate = `${yearStr}-${monthStr}-${dayStr}`;

      dayAppointments = this.metrics.ultimasCitas.filter(cita => cita.date === formattedCellDate);
    }

    return {
      date,
      dayNumber: date.getDate(),
      isCurrentMonth,
      isToday,
      hasAppointments: dayAppointments.length > 0,
      appointments: dayAppointments
    };
  }

  changeMonth(direction: number): void {
    this.currentMonth += direction;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
    this.cdr.detectChanges();
  }
}
