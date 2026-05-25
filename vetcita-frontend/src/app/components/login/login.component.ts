import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="relative min-h-screen flex items-center justify-center bg-sky-100 px-4 py-10">
      
      <a routerLink="/" class="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-sky-800 bg-white/60 hover:bg-white px-4 py-2.5 rounded-full shadow-sm backdrop-blur-md transition-all border border-sky-200 font-semibold text-sm z-10 hover:shadow-md hover:-translate-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        <span class="hidden sm:inline">Home</span>
      </a>

      <div class="w-full max-w-155 rounded-[40px] border-4 border-sky-400 bg-sky-100 p-4 shadow-[0_35px_90px_rgba(14,165,233,0.20)]">
        <div class="rounded-[30px] border-4 border-sky-500 bg-white p-3 shadow-[0_18px_60px_rgba(15,23,42,0.1)]">
          <img
            src="/assets/images/logo.png"
            alt="Vet Cita"
            class="mx-auto h-48 w-full rounded-[20px] object-cover"
          />
        </div>

        <div class="mt-6 rounded-[30px] bg-sky-100 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <h1 class="text-center text-3xl font-semibold text-slate-900">Acceder</h1>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-5">
            <div>
              <div class="relative">
                <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
                    <path d="M2.25 6.75C2.25 5.507 3.257 4.5 4.5 4.5h15c1.243 0 2.25 1.007 2.25 2.25v10.5c0 1.243-1.007 2.25-2.25 2.25h-15c-1.243 0-2.25-1.007-2.25-2.25V6.75Zm1.5.446v8.304l6.825-4.152L3.75 7.196Zm7.181 4.638 8.319 5.068V7.196l-8.319 5.068Zm-1.181.181L3.75 16.11V7.89l6.5 3.9Z"/>
                  </svg>
                </span>
                <input
                  type="email"
                  formControlName="email"
                  placeholder="Correo electrónico"
                  class="w-full rounded-full border border-sky-300 bg-sky-100 px-14 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
              </div>
              <span *ngIf="isFieldInvalid('email')" class="mt-2 block text-xs text-rose-500 pl-4">Por favor ingresa un email válido</span>
            </div>

            <div>
              <div class="relative">
                <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
                    <path d="M17.25 11.25h-.75V9c0-2.484-2.016-4.5-4.5-4.5s-4.5 2.016-4.5 4.5v2.25H6.75A2.25 2.25 0 0 0 4.5 13.5v6.75c0 1.243 1.007 2.25 2.25 2.25h10.5c1.243 0 2.25-1.007 2.25-2.25V13.5a2.25 2.25 0 0 0-2.25-2.25Zm-8.25-2.25c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25v2.25h-4.5V9Zm8.25 11.25H6.75V13.5h10.5v6.75Z"/>
                  </svg>
                </span>
                <input
                  [type]="showPassword ? 'text' : 'password'"
                  formControlName="password"
                  placeholder="Contraseña"
                  class="w-full rounded-full border border-sky-300 bg-sky-100 pl-14 pr-12 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
                <button
                  type="button"
                  (click)="togglePasswordVisibility()"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-sky-600 hover:text-sky-800 focus:outline-none"
                >
                  <svg *ngIf="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  <svg *ngIf="showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                </button>
              </div>
              <span *ngIf="isFieldInvalid('password')" class="mt-2 block text-xs text-rose-500 pl-4">La contraseña es requerida</span>
            </div>

            <button
              type="submit"
              [disabled]="loginForm.invalid || loading"
              class="w-full rounded-full bg-sky-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {{ loading ? 'Iniciando sesión...' : 'Acceder' }}
            </button>
          </form>

          <div class="mt-6 text-center text-sm text-slate-900">
            <p>
              ¿No estás registrado?
              <a routerLink="/register" class="font-semibold underline hover:text-sky-700">Registrarse</a>
            </p>
            <p class="mt-2">
              ¿No recuerdas tu contraseña?
              <a routerLink="/forgot-password" class="font-semibold underline hover:text-sky-700">Recuperar Contraseña</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    const message = history.state?.message;
    if (message) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 3000
      });

      window.history.replaceState({}, '');
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loading = false;
    
        const role = this.authService.getUserRole();

        if (role === 'ROLE_CLIENT' || role === 'CLIENT') {
           this.router.navigate(['/client/citas']);
        } else if (role === 'ROLE_ADMIN' || role === 'ADMIN') {
           this.router.navigate(['/admin/dashboard']);
        } else if (role === 'ROLE_VET' || role === 'VET') {
           this.router.navigate(['/vet/agenda']);
        } else {
           this.router.navigate(['/recepcionist/dashboard']);
        }
      },
      error: (error) => {
        this.loading = false; 
      
        this.cdr.detectChanges(); 

        const backendMessage = error.error?.message || 'Error al iniciar sesión. Verifica tu email y contraseña.';
        
        Swal.fire({
          icon: 'error',
          title: 'Acceso Denegado',
          text: backendMessage,
          confirmButtonColor: '#0284c7'
        });
      }
    });
  }
}
