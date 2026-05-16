import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl">
      <div class="mb-8 bg-white rounded-3xl p-6 shadow-sm border border-sky-100 flex items-center justify-between">
         <img src="/assets/images/logo.png" alt="Vet Cita" class="h-20">
      </div>

      <h1 class="text-3xl font-bold text-slate-900 mb-6">Mis citas</h1>

      <div class="flex gap-4 mb-6">
        <button class="px-6 py-2 rounded-full bg-slate-300 font-semibold text-slate-800">Proximas citas</button>
        <button class="px-6 py-2 rounded-full bg-sky-600/60 font-semibold text-white hover:bg-sky-600">Historial de citas</button>
      </div>

      <div class="space-y-4">
        
        <div class="bg-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-sm border border-slate-300">
          <div>
            <p class="font-bold text-slate-800 mb-1">Abril 25, 2026 | Viernes 10:00 AM</p>
            <p class="text-sm text-slate-700">Paciente: <span class="font-semibold">Felix (Gato)</span> | Dueño: Laura Lemus</p>
            <p class="text-sm text-slate-700">Servicio: Vacunacion</p>
          </div>
          <div class="flex gap-3">
            <button class="w-10 h-10 rounded-full bg-sky-400 text-white flex items-center justify-center hover:bg-sky-500 transition shadow-md">✏️</button>
            <button class="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition shadow-md">✖️</button>
          </div>
        </div>

        <div class="bg-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-sm border border-slate-300">
          <div>
            <p class="font-bold text-slate-800 mb-1">Junio 12, 2026 | Lunes 10:00 AM</p>
            <p class="text-sm text-slate-700">Paciente: <span class="font-semibold">Tony (Perro)</span> | Dueño: Carlos Lopez</p>
            <p class="text-sm text-slate-700">Servicio: Vacunacion</p>
          </div>
          <div class="flex gap-3">
            <button class="w-10 h-10 rounded-full bg-sky-400 text-white flex items-center justify-center hover:bg-sky-500 transition shadow-md">✏️</button>
            <button class="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition shadow-md">✖️</button>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: []
})
export class AppointmentsComponent {}