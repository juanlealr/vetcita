// src/app/components/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-linear-to-br from-sky-100 via-white to-sky-50 text-slate-900 font-sans selection:bg-sky-200">
      <div class="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        
        <header class="rounded-[30px] border border-white/60 bg-white/60 px-6 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between transition-all">
          <div class="flex items-center gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-[18px] bg-linear-to-br from-sky-500 to-sky-700 text-xl font-bold text-white shadow-md shadow-sky-500/30">
              V
            </div>
            <div>
              <p class="text-[10px] font-bold uppercase tracking-[0.4em] text-sky-600">VET CITA</p>
              <p class="text-sm font-semibold text-slate-800">Gestión Veterinaria</p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3 justify-end">
            <a routerLink="/login" class="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:text-sky-600 hover:bg-sky-50">
              Iniciar sesión
            </a>
            <a routerLink="/register" class="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 hover:-translate-y-0.5">
              Crear cuenta
            </a>
          </div>
        </header>

        <main class="mt-12 sm:mt-20">
          <div class="mx-auto max-w-4xl text-center">
            <div class="inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-semibold text-sky-700 shadow-sm">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              PLATAFORMA INTEGRAL PARA CLÍNICAS VETERINARIAS
            </div>

            <h1 class="mt-8 text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-slate-900 to-slate-700 tracking-tight sm:text-6xl leading-[1.15]">
              Todo lo que tu veterinaria necesita, <br class="hidden sm:block">
              <span class="text-sky-600">en un solo lugar.</span>
            </h1>

            <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Simplifica tu día a día. Gestiona citas, lleva el control del historial clínico de tus pacientes y coordina a todo tu equipo médico de forma rápida y segura.
            </p>

          </div>

          <div class="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            <div class="group rounded-4xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm transition hover:shadow-[0_8px_30px_rgb(14,165,233,0.1)] hover:-translate-y-1">
              <div class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 transition group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900">Agenda Inteligente</h3>
              <p class="mt-3 text-sm leading-relaxed text-slate-600">Controla las citas de forma eficiente. Evita cruces de horarios y mantén el flujo de tu clínica organizado.</p>
            </div>

            <div class="group rounded-4xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm transition hover:shadow-[0_8px_30px_rgb(16,185,129,0.1)] hover:-translate-y-1">
              <div class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 transition group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900">Historial Clínico</h3>
              <p class="mt-3 text-sm leading-relaxed text-slate-600">Accede a diagnósticos, vacunas y tratamientos pasados en segundos. Toda la información médica centralizada.</p>
            </div>

            <div class="group rounded-4xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm transition hover:shadow-[0_8px_30px_rgb(245,158,11,0.1)] hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <div class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 transition group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900">Gestión de Usuarios</h3>
              <p class="mt-3 text-sm leading-relaxed text-slate-600">Un sistema unificado donde clientes, recepcionistas y veterinarios colaboran en tiempo real sin complicaciones.</p>
            </div>
          </div>

          <footer class="mt-24 pb-8 text-center text-sm font-medium text-slate-500">
            VET CITA — Sistema de Gestión Veterinaria © 2026
          </footer>
        </main>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const role = this.authService.getUserRole();
      // Redirigir según el rol
      if (role === 'VET' || role === 'ROLE_VET') {
        this.router.navigate(['/vet/dashboard']);
      } else if (role === 'CLIENT' || role === 'ROLE_CLIENT') {
        this.router.navigate(['/client/citas']);
      } else {
        // ADMIN, RECEPTIONIST u otros roles
        this.router.navigate(['/admin/dashboard']);
      }
    }
  }
}