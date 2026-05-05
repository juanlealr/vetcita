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
    <div class="min-h-screen flex items-center justify-center px-4 py-10 bg-slate-100">
      <div class="relative w-full max-w-md">
        <div class="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-sky-300/40 blur-3xl"></div>
        <div class="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-indigo-300/30 blur-3xl"></div>

        <div class="relative overflow-hidden rounded-[36px] border border-slate-200/80 bg-white shadow-2xl">
          <div class="bg-gradient-to-r from-sky-600 to-indigo-600 px-8 py-10 text-center text-white">
            <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-3xl">🐶</div>
            <p class="text-xs uppercase tracking-[0.35em] text-sky-100/90">Vet Cita</p>
            <h1 class="mt-4 text-3xl font-semibold">Recuperar Contraseña</h1>
            <p class="mt-2 text-sm text-sky-100/85">Recupera el acceso a tu cuenta de forma segura.</p>
          </div>

          <div class="p-8">
            <p class="text-sm text-slate-600 mb-6">Ingresa el correo electrónico asociado a tu cuenta y te enviaremos un enlace para restablecer tu contraseña.</p>

            <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()" class="space-y-5">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-700">Correo electrónico</label>
                <input
                  type="email"
                  formControlName="email"
                  class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-200"
                  placeholder="ejemplo@correo.com"
                />
                <span *ngIf="isFieldInvalid('email')" class="block text-xs text-rose-500">Por favor ingresa un email válido</span>
              </div>

              <div *ngIf="successMessage" class="rounded-3xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {{ successMessage }}
              </div>

              <div *ngIf="errorMessage" class="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {{ errorMessage }}
              </div>

              <button
                type="submit"
                [disabled]="forgotPasswordForm.invalid || loading || !!successMessage"
                class="flex w-full items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {{ loading ? 'Enviando...' : 'Enviar enlace' }}
              </button>
            </form>

            <p class="mt-5 text-center text-xs text-slate-500">Revisa tu bandeja de entrada o carpeta de spam.</p>

            <div class="mt-6 border-t border-slate-200 pt-4 text-center text-sm">
              <a routerLink="/login" class="text-sky-600 hover:text-sky-700 font-medium">Volver al inicio de sesión</a>
            </div>
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
      next: (message) => {
        this.loading = false;
        this.successMessage = message;
        
        // Redirect after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Error al procesar la solicitud. Intenta nuevamente.';
      }
    });
  }
}
