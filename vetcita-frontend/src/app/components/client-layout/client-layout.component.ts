import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="flex min-h-screen bg-sky-50">
      <aside class="w-72 bg-[#0C7489] text-white flex flex-col shadow-xl fixed h-full z-10">
        
        <div class="p-6 border-b border-white/20 flex items-center gap-4">
          <img 
            [src]="avatarUrl" 
            (error)="onImageError($event)"
            alt="Avatar del usuario" 
            class="w-16 h-16 rounded-full border-2 border-white object-cover bg-slate-300 flex items-center justify-center text-xs">
          
          <div class="overflow-hidden">
            <p class="font-bold text-lg leading-tight">Bienvenido</p>
            <p class="text-sm text-sky-100 truncate" [title]="fullName">{{ fullName }}</p>
          </div>
        </div>

        <nav class="flex-1 px-4 py-8 space-y-3">
          <a routerLink="/client/citas" routerLinkActive="bg-[#11B0C8] shadow-md text-white" class="flex items-center gap-3 px-5 py-3 rounded-full hover:bg-[#11B0C8]/80 transition text-sky-100 group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 shrink-0 group-hover:text-white transition-colors">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            <span class="font-semibold">Mis citas</span>
          </a>

          <a routerLink="/client/mascotas" routerLinkActive="bg-[#11B0C8] shadow-md text-white" class="flex items-center gap-3 px-5 py-3 rounded-full hover:bg-[#11B0C8]/80 transition text-sky-100 group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 shrink-0 group-hover:text-white transition-colors">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 12.75c-2.5 0-4.5 1.8-4.5 4.05s2.0 4.05 4.5 4.05 4.5-1.8 4.5-4.05-2.0-4.05-4.5-4.05zM7.125 9c1.035 0 1.875-1.007 1.875-2.25s-.84-2.25-1.875-2.25S5.25 5.507 5.25 6.75s.84 2.25 1.875 2.25zM16.875 9c1.035 0 1.875-1.007 1.875-2.25S17.91 4.5 16.875 4.5 15 5.507 15 6.75s.84 2.25 1.875 2.25zM4.125 13.5c1.035 0 1.875-1.007 1.875-2.25s-.84-2.25-1.875-2.25S2.25 10.007 2.25 11.25s.84 2.25 1.875 2.25zM19.875 13.5c1.035 0 1.875-1.007 1.875-2.25s-.84-2.25-1.875-2.25S18 10.007 18 11.25s.84 2.25 1.875 2.25z" />
            </svg>
            <span class="font-semibold">Mis mascotas</span>
          </a>

          <a routerLink="/client/perfil" routerLinkActive="bg-[#11B0C8] shadow-md text-white" class="flex items-center gap-3 px-5 py-3 rounded-full hover:bg-[#11B0C8]/80 transition text-sky-100 group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 shrink-0 group-hover:text-white transition-colors">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <span class="font-semibold">Mi perfil</span>
          </a>
        </nav>

        <div class="p-6">
          <button (click)="logout()" class="flex items-center gap-3 px-5 py-3 w-full rounded-full bg-slate-900/30 hover:bg-slate-900/50 transition text-left group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-rose-400 shrink-0 group-hover:scale-105 transition-transform">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4h-2v4H5V5h14v4h2V5c0-1.1-.9-2-2-2zm-2 8h-8v2h8v3l5-4-5-4v3z"/>
            </svg>
            <span class="font-semibold text-white">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      <main class="flex-1 ml-72 relative overflow-hidden">
        <div class="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-sky-200/50 to-transparent -z-10 pointer-events-none"></div>
        <div class="p-10">
          <router-outlet></router-outlet> 
        </div>
      </main>
    </div>
  `,
  styles: []
})
export class ClientLayoutComponent implements OnInit {
  fullName: string = 'Cargando...';
  
  defaultAvatar: string = 'https://ui-avatars.com/api/?background=cbd5e1&color=334155&name=U';
  avatarUrl: string = this.defaultAvatar;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.setUserData(user);
    });
  }

  setUserData(user: any) {
    if (!user) {
      this.fullName = 'Usuario';
      this.avatarUrl = this.defaultAvatar;
      return;
    }

    const firstName = user.name || user.nombre || '';
    const lastName = user.lastName || user.apellido || '';
    this.fullName = `${firstName} ${lastName}`.trim() || 'Cliente';

    if (user.photoUrl || user.foto) {
      this.avatarUrl = user.photoUrl || user.foto;
    } else {
      this.avatarUrl = `https://ui-avatars.com/api/?background=cbd5e1&color=334155&name=${firstName}+${lastName}`;
    }
  }

  onImageError(event: any) {
    event.target.src = this.defaultAvatar;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}