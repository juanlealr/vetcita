import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-vet-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white shadow-sm border-b border-gray-200">
        <div class="px-6 py-3 flex items-center gap-3">
          <img src="/assets/images/logo.png" alt="VetCita" class="h-8 w-auto">
          <h1 class="text-xl font-semibold text-gray-800">VetCita - Veterinario</h1>
        </div>
      </nav>

      <div class="flex">
        <aside class="w-64 bg-sky-800 text-white shadow-lg h-[calc(100vh-56px)]">
          <nav class="p-4 space-y-2">
            <a routerLink="/vet/dashboard" routerLinkActive="bg-sky-900" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sky-700 transition-colors">
              <span>📋</span> Mis citas
            </a>
            <button (click)="logout()" class="w-full flex items-center gap-3 px-3 py-2 text-rose-200 hover:text-white hover:bg-rose-600 rounded-lg transition-colors mt-8">
              <span>🚪</span> Cerrar sesión
            </button>
          </nav>
        </aside>

        <main class="flex-1 p-6">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class VetLayoutComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}