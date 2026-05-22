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
          <button (click)="logout()" class="flex items-center gap-3 px-5 py-3 w-full rounded-full bg-slate-900/30 hover:bg-slate-900/50 transition text-left">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-rose-400 shrink-0">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4h-2v4H5V5h14v4h2V5c0-1.1-.9-2-2-2zm-2 8h-8v2h8v3l5-4-5-4v3z"/>
            </svg>
            <span class="font-semibold text-white">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      <main class="flex-1 ml-72 relative overflow-hidden">
        <div class="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-sky-200/50 to-transparent -z-10 pointer-events-none"></div>
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