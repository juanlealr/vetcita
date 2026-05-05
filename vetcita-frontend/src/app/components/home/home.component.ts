import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-[#e8f5ff] text-slate-900">
      <div class="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <header class="rounded-[40px] border border-slate-200/70 bg-white/95 px-6 py-5 shadow-[0_25px_70px_rgba(15,23,42,0.08)] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-4">
            <div class="flex h-14 w-14 items-center justify-center rounded-[20px] bg-sky-600 text-2xl font-bold text-white shadow-lg shadow-sky-600/20">V</div>
            <div>
              <p class="text-xs uppercase tracking-[0.5em] text-sky-600">VET CITA</p>
              <p class="text-sm font-semibold text-slate-900">Sistema de Gestión Veterinaria</p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3 justify-end">
            <a routerLink="/register" class="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700">
              Crear cuenta
            </a>
            <a routerLink="/login" class="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50">
              Iniciar cuenta
            </a>
          </div>
        </header>

        <main class="mt-10 rounded-[40px] border border-slate-200/70 bg-white/95 p-8 shadow-[0_25px_70px_rgba(15,23,42,0.08)]">
          <div class="mx-auto max-w-5xl text-center">
            <div class="inline-flex rounded-full border border-sky-200 bg-sky-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-sky-700 shadow-sm">
              Plataforma completa para tu clínica veterinaria
            </div>

            <h1 class="mt-8 text-5xl font-bold leading-tight tracking-[-0.03em] text-slate-900 sm:text-[4.5rem]">
              Gestiona citas, pacientes y el historial<br>
              clínico desde un solo lugar.
            </h1>

            <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Selecciona tu rol y comienza a usar todas las herramientas de gestión veterinaria diseñadas para tu clínica.
            </p>

            <div class="mt-10 flex flex-wrap justify-center gap-3">
              <span class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm">
                <span class="text-sky-600">📅</span> Agendamiento inteligente
              </span>
              <span class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm">
                <span class="text-sky-600">👥</span> Gestión de pacientes
              </span>
              <span class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm">
                <span class="text-sky-600">📄</span> Historial clínico digital
              </span>
            </div>
          </div>

          <div class="mt-14">
            <p class="text-center text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Selecciona tu rol para comenzar</p>

            <div class="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              <div class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40">
                <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-2xl">🐾</div>
                <h2 class="text-xl font-semibold text-slate-900">Soy Cliente</h2>
                <p class="mt-3 text-sm leading-6 text-slate-600">Agenda citas para tus mascotas, revisa su historial médico y administra tus perfiles.</p>
                <button class="mt-6 w-full rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">Acceder</button>
              </div>

              <div class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40">
                <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-orange-100 text-2xl">📋</div>
                <h2 class="text-xl font-semibold text-slate-900">Soy Recepcionista</h2>
                <p class="mt-3 text-sm leading-6 text-slate-600">Gestiona citas, organiza el flujo de pacientes y controla la agenda de la clínica.</p>
                <button class="mt-6 w-full rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">Acceder</button>
              </div>

              <div class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40">
                <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-100 text-2xl">🩺</div>
                <h2 class="text-xl font-semibold text-slate-900">Soy Veterinario</h2>
                <p class="mt-3 text-sm leading-6 text-slate-600">Consulta tu agenda, atiende pacientes y registra diagnósticos clínicos.</p>
                <button class="mt-6 w-full rounded-full bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">Acceder</button>
              </div>

              <div class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40">
                <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-100 text-2xl">🔒</div>
                <h2 class="text-xl font-semibold text-slate-900">Soy Administrador</h2>
                <p class="mt-3 text-sm leading-6 text-slate-600">Gestiona usuarios, veterinarios, servicios y supervisa la operación del sistema.</p>
                <button class="mt-6 w-full rounded-full bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700">Acceder</button>
              </div>
            </div>
          </div>

          <footer class="mt-16 text-center text-sm text-slate-500">VET CITA — Sistema de Gestión Veterinaria © 2026</footer>
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
      this.router.navigate(['/dashboard']);
    }
  }
}