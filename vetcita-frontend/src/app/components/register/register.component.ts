import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
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
          <h1 class="text-center text-3xl font-semibold text-slate-900">Crear una cuenta nueva</h1>

          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-5">
            <div class="relative">
              <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
                  <path d="M12 12c1.933 0 3.5-1.567 3.5-3.5S13.933 5 12 5 8.5 6.567 8.5 8.5 10.067 12 12 12Zm0 2c-2.621 0-7.833 1.313-7.833 3.917V21h15.666v-3.083C19.833 15.313 14.621 14 12 14Z"/>
                </svg>
              </span>
              <input
                type="text"
                formControlName="fullName"
                placeholder="Nombre completo"
                class="w-full rounded-full border border-sky-300 bg-sky-100 px-14 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              />
              <span *ngIf="isFieldInvalid('fullName')" class="mt-2 block text-xs text-rose-500">El nombre completo es requerido</span>
            </div>

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
                  <path d="M21 6.75H3v-1.5h18v1.5Zm0 4.5H3V9h18v2.25Zm0 4.5H3v-1.5h18v1.5ZM3 19.5h18v-1.5H3v1.5Z"/>
                </svg>
              </span>
              <input
                type="tel"
                formControlName="phone"
                placeholder="Número telefónico"
                class="w-full rounded-full border border-sky-300 bg-sky-100 px-14 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              />
              <span *ngIf="isFieldInvalid('phone')" class="mt-2 block text-xs text-rose-500">El teléfono es requerido</span>
            </div>

            <div class="grid grid-cols-2 gap-4">
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
                <span *ngIf="isFieldInvalid('password')" class="mt-2 block text-xs text-rose-500">Mínimo 6 caracteres</span>
              </div>

              <div class="relative">
                <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
                    <path d="M17.25 11.25h-.75V9c0-2.484-2.016-4.5-4.5-4.5s-4.5 2.016-4.5 4.5v2.25H6.75A2.25 2.25 0 0 0 4.5 13.5v6.75c0 1.243 1.007 2.25 2.25 2.25h10.5c1.243 0 2.25-1.007 2.25-2.25V13.5a2.25 2.25 0 0 0-2.25-2.25Zm-8.25-2.25c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25v2.25h-4.5V9Zm8.25 11.25H6.75V13.5h10.5v6.75Z"/>
                  </svg>
                </span>
                <input
                  type="password"
                  formControlName="confirmPassword"
                  placeholder="Confirmar contraseña"
                  class="w-full rounded-full border border-sky-300 bg-sky-100 px-14 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
                <span *ngIf="isFieldInvalid('confirmPassword')" class="mt-2 block text-xs text-rose-500">Las contraseñas no coinciden</span>
              </div>
            </div>

            <div *ngIf="errorMessage" class="mt-5 rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {{ errorMessage }}
            </div>

            <button
              type="submit"
              [disabled]="registerForm.invalid || loading"
              class="w-full rounded-full bg-sky-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {{ loading ? 'Registrando...' : 'Registrarse' }}
            </button>
          </form>

          <div class="mt-6 text-center text-sm text-slate-900">
            <p>
              ¿Ya eres miembro?
              <a routerLink="/login" class="font-semibold underline">Iniciar sesión</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    if (password && confirmPassword && password !== confirmPassword) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const { confirmPassword, ...registerData } = this.registerForm.value;

    this.authService.register(registerData).subscribe({
      next: () => {
        this.router.navigate(['/login'], {
          state: { message: 'Registro exitoso. Por favor inicia sesión.' }
        });
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = this.getErrorMessage(error, 'Error al registrarse. Intenta nuevamente.');
      }
    });
  }

  private getErrorMessage(error: any, fallback: string): string {
    console.error('Registro error:', error);
    if (error?.error?.message) {
      return error.error.message;
    }
    if (typeof error?.error === 'string' && error.error.trim()) {
      return error.error;
    }
    if (error?.message) {
      return error.message;
    }
    return fallback;
  }
}
