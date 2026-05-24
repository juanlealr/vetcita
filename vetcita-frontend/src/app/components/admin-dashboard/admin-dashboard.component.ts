import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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

        <button class="z-10 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full font-bold shadow-md transition flex items-center gap-2">
          <span>+</span> Añadir cita
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div class="bg-green-100 rounded-xl p-4 flex items-center justify-between border border-green-200">
          <div class="flex items-center gap-2">
            <span class="text-2xl">📅</span>
            <span class="font-semibold text-green-800">Citas del día</span>
          </div>
          <span class="bg-green-200 text-green-900 px-3 py-1 rounded-lg font-bold text-xl">3</span>
        </div>

        <div class="bg-orange-100 rounded-xl p-4 flex items-center justify-between border border-orange-200">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🗓️</span>
            <span class="font-semibold text-orange-800">Próximas citas</span>
          </div>
          <span class="bg-orange-200 text-orange-900 px-3 py-1 rounded-lg font-bold text-xl">5</span>
        </div>

        <div class="bg-purple-100 rounded-xl p-4 flex items-center justify-between border border-purple-200">
          <div class="flex items-center gap-2">
            <span class="text-2xl">👤</span>
            <span class="font-semibold text-purple-800">Clientes</span>
          </div>
          <span class="bg-purple-200 text-purple-900 px-3 py-1 rounded-lg font-bold text-xl">28</span>
        </div>

        <div class="bg-red-100 rounded-xl p-4 flex items-center justify-between border border-red-200">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🐾</span>
            <span class="font-semibold text-red-800">Mascotas</span>
          </div>
          <span class="bg-red-200 text-red-900 px-3 py-1 rounded-lg font-bold text-xl">34</span>
        </div>

      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div class="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-bold text-slate-700">Agenda de abril de 2024</h2>
            <div class="flex gap-2 text-sm text-slate-500">
              <button class="px-2 hover:bg-slate-100 rounded">&lt;</button>
              <button class="px-3 hover:bg-slate-100 rounded font-medium">Ir a hoy</button>
              <button class="px-2 hover:bg-slate-100 rounded">&gt;</button>
            </div>
          </div>

          <div class="grid grid-cols-7 gap-1 text-center text-sm">
            <div class="text-slate-400 font-semibold py-2">Lun</div>
            <div class="text-slate-400 font-semibold py-2">Mar</div>
            <div class="text-slate-400 font-semibold py-2">Mié</div>
            <div class="text-slate-400 font-semibold py-2">Jue</div>
            <div class="text-slate-400 font-semibold py-2">Vie</div>
            <div class="text-slate-400 font-semibold py-2">Sáb</div>
            <div class="text-slate-400 font-semibold py-2">Dom</div>

            <div class="py-6 border border-slate-50 rounded-lg hover:bg-slate-50 text-slate-400">1</div>
            <div class="py-6 border border-slate-50 rounded-lg hover:bg-slate-50 text-slate-400">2</div>
            <div class="py-6 border border-slate-50 rounded-lg hover:bg-slate-50 text-slate-400">3</div>
            <div class="py-6 border border-slate-50 rounded-lg hover:bg-slate-50 text-slate-400">4</div>
            <div class="py-6 border border-slate-50 rounded-lg hover:bg-slate-50 text-slate-400">5</div>
            <div class="py-6 border border-slate-50 rounded-lg hover:bg-slate-50 text-slate-400">6</div>
            <div class="py-6 border border-slate-50 rounded-lg hover:bg-slate-50 text-slate-400">7</div>
            
            <div class="h-24 border border-slate-100 rounded-lg p-1 relative hover:bg-slate-50 group transition">
              <span class="absolute top-1 left-2 text-slate-700">8</span>
            </div>
            <div class="h-24 border border-slate-100 rounded-lg p-1 relative hover:bg-slate-50">
              <span class="absolute top-1 left-2 text-slate-700">9</span>
              <div class="mt-6 text-[10px] bg-green-100 text-green-700 p-1 rounded font-medium truncate">
                Felix (Gato) - 10:00 AM
              </div>
            </div>
            <div class="h-24 border border-slate-100 rounded-lg p-1 relative hover:bg-slate-50">
               <span class="absolute top-1 left-2 text-slate-700">10</span>
            </div>
            <div class="h-24 border border-slate-100 rounded-lg p-1 relative hover:bg-slate-50">
               <span class="absolute top-1 left-2 text-slate-700">11</span>
            </div>
            <div class="h-24 border border-slate-100 rounded-lg p-1 relative hover:bg-slate-50 bg-sky-50">
               <span class="absolute top-1 left-2 font-bold text-sky-700">12 (Hoy)</span>
               <div class="mt-6 text-[10px] bg-orange-100 text-orange-700 p-1 rounded font-medium truncate">
                Max (Perro) - 04:00 PM
              </div>
            </div>
            <div class="h-24 border border-slate-100 rounded-lg p-1 relative hover:bg-slate-50">
               <span class="absolute top-1 left-2 text-slate-700">13</span>
            </div>
            <div class="h-24 border border-slate-100 rounded-lg p-1 relative hover:bg-slate-50 text-red-400">
               <span class="absolute top-1 left-2">14</span>
            </div>
          </div>
        </div>

        <div class="bg-slate-100 rounded-3xl p-6 border border-slate-200 flex flex-col h-full">
          <div class="flex items-center gap-2 mb-6">
            <span class="text-xl">📋</span>
            <h2 class="text-lg font-bold text-slate-700">Últimas citas</h2>
          </div>

          <div class="space-y-4 flex-1">
            
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              <p class="font-bold text-slate-800">Felix (Gato)</p>
              <div class="text-sm text-slate-500 mt-1 flex flex-col gap-1">
                <span class="flex items-center gap-1">🕒 20/12/2026 - 10:00 AM</span>
                <span class="flex items-center gap-1">👨‍⚕️ Dr. Perez</span>
              </div>
            </div>

            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              <p class="font-bold text-slate-800">Max (Perro)</p>
              <div class="text-sm text-slate-500 mt-1 flex flex-col gap-1">
                <span class="flex items-center gap-1">🕒 18/12/2026 - 04:00 PM</span>
                <span class="flex items-center gap-1">👩‍⚕️ Dr. Sánchez</span>
              </div>
            </div>

          </div>
          
          <button class="mt-4 w-full py-2 text-sky-600 text-sm font-medium hover:bg-slate-200 rounded-lg transition">
            Ver todas las citas
          </button>
        </div>

      </div>
    </div>
  `
})
export class AdminDashboardComponent {}
