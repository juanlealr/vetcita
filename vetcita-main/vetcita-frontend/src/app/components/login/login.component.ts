import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-sky-100 px-4 py-10">
      <div class="w-full max-w-[620px] rounded-[40px] border-4 border-sky-400 bg-sky-100 p-4 shadow-[0_35px_90px_rgba(14,165,233,0.20)]">
        <div class="rounded-[30px] border-4 border-sky-500 bg-white p-3 shadow-[0_18px_60px_rgba(15,23,42,0.1)]">
          <img
            src="/assets/images/vet-cita-login-banner.png"
            alt="Vet Cita"
            class="mx-auto h-48 w-full rounded-[20px] object-cover"
          />
        </div>

        <div class="mt-6 rounded-[30px] bg-sky-100 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <h1 class="text-center text-3xl font-semibold text-slate-900">Acceder</h1>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-5">
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
              <span *ngIf="isFieldInvalid('email')" class="mt-2 block text-xs text-rose-500">Por favor ingresa un email válido</span>
            </div>

            <div class="relative">
              <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
                  <path d="M17.25 11.25h-.75V9c0-2.484-2.016-4.5-4.5-4.5s-4.5 2.016-4.5 4.5v2.25H6.75A2.25 2.25 0 0 0 4.5 13.5v6.75c0 1.243 1.007 2.25 2.25 2.25h10.5c1.243 0 2.25-1.007 2.25-2.25V13.5a2.25 2.25 0 0 0-2.25-2.25Zm-8.25-2.25c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25v2.25h-4.5V9Zm8.25 11.25H6.75V13.5h10.5v6.75Z"/>
                </svg>
              </span>
              <input
                type="password"
                formControlName="password"
                placeholder="Contraseña"
                class="w-full rounded-full border border-sky-300 bg-sky-100 px-14 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              />
              <span *ngIf="isFieldInvalid('password')" class="mt-2 block text-xs text-rose-500">La contraseña es requerida</span>
            </div>

            <button
              type="submit"
              [disabled]="loginForm.invalid || loading"
              class="w-full rounded-full bg-sky-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {{ loading ? 'Iniciando sesión...' : 'Acceder' }}
            </button>
          </form>

          <div *ngIf="errorMessage" class="mt-5 rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {{ errorMessage }}
          </div>

          <div class="mt-6 text-center text-sm text-slate-900">
            <p>
              ¿No estás registrado?
              <a routerLink="/register" class="font-semibold underline">Registrarse</a>
            </p>
            <p class="mt-2">
              ¿No recuerdas tu contraseña?
              <a routerLink="/forgot-password" class="font-semibold underline">Recuperar Contraseña</a>
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
  errorMessage = '';
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
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

  ngOnInit(): void {
    this.successMessage = history.state?.message || null;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = null;

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.successMessage = 'Inicio de sesión exitoso';
        this.loading = false;

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1200);
      },
      error: (error) => {
        this.loading = false;
        
        // Intenta obtener el mensaje de error del backend
        let errorMessage = 'Error al iniciar sesión. Verifica tu email y contraseña.';
        
        if (error.error) {
          // Si es un objeto con mensaje
          if (error.error.message) {
            errorMessage = error.error.message;
          }
          // Si es texto plano
          else if (typeof error.error === 'string') {
            errorMessage = error.error;
          }
        }
        
        this.errorMessage = errorMessage;
      }
    });
  }
}
