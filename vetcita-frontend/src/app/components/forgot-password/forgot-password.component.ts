import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-sky-100 px-4 py-10">
      <div class="w-full max-w-155 rounded-[40px] border-4 border-sky-400 bg-sky-100 p-4 shadow-[0_35px_90px_rgba(14,165,233,0.20)]">
        
        <div class="rounded-[30px] border-4 border-sky-500 bg-white p-3 shadow-[0_18px_60px_rgba(15,23,42,0.1)]">
          <img
            src="/assets/images/vet-cita-login-banner.png"
            alt="Vet Cita"
            class="mx-auto h-48 w-full rounded-[20px] object-cover"
          />
        </div>

        <div class="mt-6 rounded-[30px] bg-sky-100 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <h1 class="text-center text-3xl font-semibold text-slate-900">Recuperar Contraseña</h1>
          <p class="mt-4 text-center text-sm text-slate-700 px-2">
            Ingresa el correo electrónico asociado a tu cuenta y te enviaremos un enlace para restablecerla.
          </p>

          <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-5">
            
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
              <span *ngIf="isFieldInvalid('email')" class="mt-2 pl-4 block text-xs text-rose-500">Por favor ingresa un email válido</span>
            </div>

            <div *ngIf="successMessage" class="rounded-3xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 text-center">
              {{ successMessage }}
            </div>

            <div *ngIf="errorMessage" class="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 text-center">
              {{ errorMessage }}
            </div>

            <button
              type="submit"
              [disabled]="forgotPasswordForm.invalid || loading || !!successMessage"
              class="w-full rounded-full bg-sky-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              {{ loading ? 'Enviando enlace...' : 'Enviar enlace' }}
            </button>
          </form>

          <div class="mt-6 text-center text-sm text-slate-900">
            <p>
              ¿Recordaste tu contraseña?
              <br class="sm:hidden">
              <a routerLink="/login" class="font-semibold underline hover:text-sky-700">Volver al inicio de sesión</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.forgotPasswordForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (res) => {
        this.successMessage = "Si el correo existe, recibirás un enlace pronto.";
      },
      error: (err) => {
        this.errorMessage = err.error?.message || "El correo no está registrado en nuestro sistema.";
      }
    });
  }
}
