import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="flex min-h-screen bg-slate-100">
      <aside class="w-72 bg-[#1e293b] text-white flex flex-col shadow-xl fixed h-full z-10">
        
        <div class="p-6 border-b border-white/10 flex items-center gap-4">
          <img 
            [src]="avatarUrl" 
            (error)="onImageError($event)"
            alt="Avatar Admin" 
            class="w-16 h-16 rounded-full border-2 border-sky-400 object-cover bg-slate-800 flex items-center justify-center text-xs">
          
          <div class="overflow-hidden">
            <p class="font-bold text-lg leading-tight text-sky-400">Panel Admin</p>
            <p class="text-sm text-slate-300 truncate" [title]="fullName">{{ fullName }}</p>
          </div>
        </div>

        <nav class="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <a routerLink="/admin/dashboard" routerLinkActive="bg-sky-600 shadow-md text-white" [routerLinkActiveOptions]="{exact: true}" class="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-slate-700 transition text-slate-300">
            <span class="text-xl">📊</span>
            <span class="font-semibold">Dashboard</span>
          </a>

          <a routerLink="/admin/servicios" routerLinkActive="bg-sky-600 shadow-md text-white" class="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-slate-700 transition text-slate-300">
            <span class="text-xl">🛠️</span>
            <span class="font-semibold">Servicios Médicos</span>
          </a>

          <div class="pt-4 pb-2">
            <p class="px-5 text-xs font-bold uppercase tracking-wider text-slate-500">Gestión de Usuarios</p>
          </div>

          <a routerLink="/admin/clientes" routerLinkActive="bg-sky-600 shadow-md text-white" class="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-slate-700 transition text-slate-300">
            <span class="text-xl">👥</span>
            <span class="font-semibold">Clientes</span>
          </a>

          <a routerLink="/admin/veterinarios" routerLinkActive="bg-sky-600 shadow-md text-white" class="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-slate-700 transition text-slate-300">
            <span class="text-xl">🩺</span>
            <span class="font-semibold">Veterinarios</span>
          </a>

          <a routerLink="/admin/recepcionistas" routerLinkActive="bg-sky-600 shadow-md text-white" class="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-slate-700 transition text-slate-300">
            <span class="text-xl">🛎️</span>
            <span class="font-semibold">Recepcionistas</span>
          </a>
        </nav>

        <div class="p-6 border-t border-white/10">
          <button (click)="logout()" class="flex items-center gap-3 px-5 py-3 w-full rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition text-left">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 shrink-0">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4h-2v4H5V5h14v4h2V5c0-1.1-.9-2-2-2zm-2 8h-8v2h8v3l5-4-5-4v3z"/>
            </svg>
            <span class="font-semibold">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      <main class="flex-1 ml-72 relative">
        <div class="p-10">
          <router-outlet></router-outlet> 
        </div>
      </main>
    </div>
  `
})
export class AdminLayoutComponent implements OnInit {
  fullName: string = 'Cargando...';
  defaultAvatar: string = 'https://ui-avatars.com/api/?background=0ea5e9&color=fff&name=Admin';
  avatarUrl: string = this.defaultAvatar;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        const firstName = user.name || user.nombre || 'Admin';
        const lastName = user.lastName || user.apellido || '';
        this.fullName = `${firstName} ${lastName}`.trim();
      } else {
        this.fullName = 'Administrador';
      }
    });
  }

  onImageError(event: any) {
    event.target.src = this.defaultAvatar;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}