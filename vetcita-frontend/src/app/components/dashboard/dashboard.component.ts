import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-sky-50">
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <div class="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          <div class="flex items-center gap-4">
            <div class="flex h-14 w-14 items-center justify-center rounded-full bg-sky-600 text-2xl font-bold text-white">V</div>
            <div>
              <p class="text-sm font-semibold text-sky-600 uppercase tracking-wider">Vet Cita</p>
              <p class="text-sm text-slate-700">Sistema de Gestión Veterinaria</p>
            </div>
          </div>

          <div class="flex gap-3">
            <a routerLink="/register" class="px-6 py-2.5 rounded-full bg-sky-600 text-sm font-semibold text-white hover:bg-sky-700 shadow-md hover:shadow-lg transition">
              Crear cuenta
            </a>
            <a routerLink="/login" class="px-6 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-full hover:border-slate-400 transition">
              Iniciar cuenta
            </a>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="mx-auto max-w-7xl px-6 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <!-- Left Section -->
          <div>
            <p class="text-sm font-semibold text-sky-600 mb-4">Plataforma completa para la clínica veterinaria</p>
            <h1 class="text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Gestiona citas, pacientes y el historial clínico desde un solo lugar.
            </h1>
            <p class="text-lg text-slate-600 mb-8">
              Selecciona tu rol y comienza a usar todas las herramientas de gestión veterinaria diseñadas para tu clínica.
            </p>

            <!-- CTA Buttons -->
            <div class="flex gap-4 mb-12">
              <a routerLink="/register" class="px-6 py-3 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 transition">
                Crear cuenta
              </a>
              <a routerLink="/login" class="px-6 py-3 rounded-full border-2 border-slate-300 text-slate-900 font-semibold hover:border-slate-400 transition">
                Iniciar cuenta
              </a>
            </div>

            <!-- Role Cards Grid - 2 columns -->
            <div class="grid grid-cols-2 gap-6">
              <!-- Cliente -->
              <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
                <div class="text-3xl mb-3">🐾</div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">Soy Cliente</h3>
                <p class="text-sm text-slate-600 mb-4">
                  Agenda citas para tus mascotas, revisa historial médico y administra tus perfiles.
                </p>
                <a href="#" class="text-sky-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition">
                  Acceder <span>→</span>
                </a>
              </div>

              <!-- Recepcionista -->
              <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
                <div class="text-3xl mb-3">📋</div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">Soy Recepcionista</h3>
                <p class="text-sm text-slate-600 mb-4">
                  Gestiona citas, organiza el flujo de pacientes y controla la agenda de la clínica.
                </p>
                <a href="#" class="text-sky-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition">
                  Acceder <span>→</span>
                </a>
              </div>

              <!-- Veterinario -->
              <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
                <div class="text-3xl mb-3">🩺</div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">Soy Veterinario</h3>
                <p class="text-sm text-slate-600 mb-4">
                  Consulta tu agenda, atiende pacientes y registra diagnósticos clínicos.
                </p>
                <a href="#" class="text-sky-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition">
                  Acceder <span>→</span>
                </a>
              </div>

              <!-- Administrador -->
              <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
                <div class="text-3xl mb-3">👑</div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">Soy Administrador</h3>
                <p class="text-sm text-slate-600 mb-4">
                  Gestiona usuarios, veterinarios, servicios y supervisa la operación del sistema.
                </p>
                <a href="#" class="text-sky-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition">
                  Acceder <span>→</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Right Section - Features -->
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 h-fit sticky top-6">
            <p class="text-xs font-semibold text-sky-600 uppercase tracking-widest mb-4">Novedades</p>
            <h2 class="text-2xl font-bold text-slate-900 mb-2">Todo tu flujo veterinario centralizado</h2>
            <p class="text-sm text-slate-600 mb-8">
              Controla citas, historial médico, clientes y servicios con una sola vista administrativa.
            </p>

            <!-- Features -->
            <div class="space-y-6">
              <!-- Feature 1 -->
              <div class="flex gap-4">
                <div class="shrink-0">
                  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <span class="text-lg">📅</span>
                  </div>
                </div>
                <div>
                  <h3 class="font-semibold text-slate-900 mb-1">Agenda inteligente</h3>
                  <p class="text-sm text-slate-600">Organiza tus horarios y evita solapamientos.</p>
                </div>
              </div>

              <!-- Feature 2 -->
              <div class="flex gap-4">
                <div class="shrink-0">
                  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <span class="text-lg">📋</span>
                  </div>
                </div>
                <div>
                  <h3 class="font-semibold text-slate-900 mb-1">Historial clínico</h3>
                  <p class="text-sm text-slate-600">Registra diagnósticos y seguimiento de pacientes.</p>
                </div>
              </div>

              <!-- Feature 3 -->
              <div class="flex gap-4">
                <div class="shrink-0">
                  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                    <span class="text-lg">🔒</span>
                  </div>
                </div>
                <div>
                  <h3 class="font-semibold text-slate-900 mb-1">Acceso seguro</h3>
                  <p class="text-sm text-slate-600">Controla permisos según rol y protege la información.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  successMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.successMessage = history.state?.message || null;

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
  }

  selectRole(role: string): void {
    // Aquí puedes manejar la navegación según el rol seleccionado
    console.log('Rol seleccionado:', role);
    // Por ahora, redirige a un dashboard genérico
    this.router.navigate(['/dashboard-role'], { state: { role } });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
