import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="flex min-h-screen bg-sky-50"> <aside class="w-72 bg-[#0C7489] text-white flex flex-col shadow-xl fixed h-full z-10">
        
        <div class="p-6 border-b border-white/20 flex items-center gap-4">
          <img src="/assets/images/dog-avatar.png" alt="Avatar" class="w-16 h-16 rounded-full border-2 border-white object-cover">
          <div>
            <p class="font-bold text-lg leading-tight">Bienvenido</p>
            <p class="text-sm text-sky-100">(usuario)</p>
          </div>
        </div>

        <nav class="flex-1 px-4 py-8 space-y-3">
          <a routerLink="/client/agendar" routerLinkActive="bg-[#11B0C8] shadow-md" class="flex items-center gap-3 px-5 py-3 rounded-full hover:bg-[#11B0C8]/80 transition">
            <span class="text-xl">📅</span> <span class="font-semibold">Agendar cita</span>
          </a>

          <a routerLink="/client/citas" routerLinkActive="bg-[#11B0C8] shadow-md" class="flex items-center gap-3 px-5 py-3 rounded-full hover:bg-[#11B0C8]/80 transition">
            <span class="text-xl">🗓️</span>
            <span class="font-semibold">Mis citas</span>
          </a>

          <a routerLink="/client/mascotas" routerLinkActive="bg-[#11B0C8] shadow-md" class="flex items-center gap-3 px-5 py-3 rounded-full hover:bg-[#11B0C8]/80 transition">
            <span class="text-xl">🐾</span>
            <span class="font-semibold">Mis mascotas</span>
          </a>

          <a routerLink="/client/perfil" routerLinkActive="bg-[#11B0C8] shadow-md" class="flex items-center gap-3 px-5 py-3 rounded-full hover:bg-[#11B0C8]/80 transition">
            <span class="text-xl">👤</span>
            <span class="font-semibold">Mi perfil</span>
          </a>
        </nav>

        <div class="p-6">
          <button (click)="logout()" class="flex items-center gap-3 px-5 py-3 w-full rounded-full bg-slate-900/30 hover:bg-slate-900/50 transition">
            <span class="text-rose-400 text-xl">🚪</span>
            <span class="font-semibold">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      <main class="flex-1 ml-72 relative overflow-hidden">
        <div class="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-sky-200/50 to-transparent -z-10 pointer-events-none"></div>
        
        <div class="p-10">
          <router-outlet></router-outlet> </div>
      </main>
    </div>
  `,
  styles: []
})
export class ClientLayoutComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}