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
          <a routerLink="/admin/dashboard" routerLinkActive="bg-sky-600 shadow-md text-white" [routerLinkActiveOptions]="{exact: true}" class="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-slate-700 transition text-slate-300 group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 shrink-0 group-hover:text-white transition-colors">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
            <span class="font-semibold">Dashboard</span>
          </a>

          <a routerLink="/admin/servicios" routerLinkActive="bg-sky-600 shadow-md text-white" class="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-slate-700 transition text-slate-300 group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 shrink-0 group-hover:text-white transition-colors">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
            </svg>
            <span class="font-semibold">Servicios Médicos</span>
          </a>

          <div class="pt-4 pb-2">
            <p class="px-5 text-xs font-bold uppercase tracking-wider text-slate-500">Gestión de Usuarios</p>
          </div>

          <a routerLink="/admin/clientes" routerLinkActive="bg-sky-600 shadow-md text-white" class="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-slate-700 transition text-slate-300 group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 shrink-0 group-hover:text-white transition-colors">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
            <span class="font-semibold">Clientes</span>
          </a>

          <a routerLink="/admin/veterinarios" routerLinkActive="bg-sky-600 shadow-md text-white" class="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-slate-700 transition text-slate-300 group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 shrink-0 group-hover:text-white transition-colors">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
            </svg>
            <span class="font-semibold">Veterinarios</span>
          </a>

          <a routerLink="/admin/recepcionistas" routerLinkActive="bg-sky-600 shadow-md text-white" class="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-slate-700 transition text-slate-300 group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 shrink-0 group-hover:text-white transition-colors">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
            </svg>
            <span class="font-semibold">Recepcionistas</span>
          </a>
        </nav>

        <div class="p-6 border-t border-white/10">
          <button (click)="logout()" class="flex items-center gap-3 px-5 py-3 w-full rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition text-left group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 shrink-0 group-hover:scale-105 transition-transform">
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