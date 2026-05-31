import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService, ResetPasswordRequest } from '../../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-sky-100 px-4 py-10">
      <div class="w-full max-w-155 rounded-[40px] border-4 border-sky-400 bg-sky-100 p-4 shadow-[0_35px_90px_rgba(14,165,233,0.20)]">
        
        <div class="rounded-[30px] border-4 border-sky-500 bg-white p-3 shadow-[0_18px_60px_rgba(15,23,42,0.1)]">
          <img
            src="/assets/images/logo.png"
            alt="Vet Cita"
            class="mx-auto h-48 w-full rounded-[20px] object-cover"
          />
        </div>

        <div class="mt-6 rounded-[30px] bg-sky-100 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <h1 class="text-center text-3xl font-semibold text-slate-900">Crear nueva contraseña</h1>
          <p class="mt-4 text-center text-sm text-slate-700 px-2">
            Tu nueva contraseña debe ser diferente a las utilizadas anteriormente.
          </p>

          <div *ngIf="!token && !successMessage" class="mt-6 rounded-3xl border border-rose-200 bg-rose-50 px-4 py-4 text-center text-sm text-rose-700">
            <strong>Enlace inválido.</strong> No se detectó un token de seguridad. Por favor, solicita un nuevo enlace de recuperación.
          </div>

          <form *ngIf="token" [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-5">
            
            <div class="relative">
              <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
                  <path d="M17.25 11.25h-.75V9c0-2.484-2.016-4.5-4.5-4.5s-4.5 2.016-4.5 4.5v2.25H6.75A2.25 2.25 0 0 0 4.5 13.5v6.75c0 1.243 1.007 2.25 2.25 2.25h10.5c1.243 0 2.25-1.007 2.25-2.25V13.5a2.25 2.25 0 0 0-2.25-2.25Zm-8.25-2.25c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25v2.25h-4.5V9Zm8.25 11.25H6.75V13.5h10.5v6.75Z"/>
                </svg>
              </span>
              <input
                type="password"
                formControlName="newPassword"
                placeholder="Nueva contraseña"
                class="w-full rounded-full border border-sky-300 bg-sky-100 px-14 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              />
              <span *ngIf="isFieldInvalid('newPassword')" class="mt-2 pl-4 block text-xs text-rose-500">
                La contraseña debe tener al menos 6 caracteres
              </span>
            </div>

            <div class="relative">
              <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
                  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                </svg>
              </span>
              <input
                type="password"
                formControlName="confirmPassword"
                placeholder="Confirmar nueva contraseña"
                class="w-full rounded-full border border-sky-300 bg-sky-100 px-14 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              />
              <span *ngIf="resetPasswordForm.hasError('passwordMismatch') && resetPasswordForm.get('confirmPassword')?.touched" class="mt-2 pl-4 block text-xs text-rose-500">
                Las contraseñas no coinciden
              </span>
            </div>

            <div *ngIf="successMessage" class="rounded-3xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 text-center">
              {{ successMessage }}
            </div>

            <div *ngIf="errorMessage" class="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 text-center">
              {{ errorMessage }}
            </div>

            <button
              type="submit"
              [disabled]="resetPasswordForm.invalid || loading || !!successMessage"
              class="w-full rounded-full bg-sky-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              {{ loading ? 'Guardando...' : 'Restablecer contraseña' }}
            </button>
          </form>

          <div class="mt-6 text-center text-sm text-slate-900">
            <p>
              <a routerLink="/login" class="font-semibold underline hover:text-sky-700">Volver al inicio de sesión</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      if (!this.token) {
        console.warn('No se detectó token en la URL');
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.resetPasswordForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid || !this.token) return;

    this.loading = true;

    const resetData: ResetPasswordRequest = {
      token: this.token,
      newPassword: this.resetPasswordForm.get('newPassword')?.value
    };

    this.authService.resetPassword(resetData).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: '¡Contraseña actualizada!',
          text: 'Tu contraseña se ha cambiado correctamente.',
          confirmButtonColor: '#0284c7'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        this.loading = false;
        const backendMessage = error.error?.message || 'El enlace es inválido o ha expirado.';
        
        Swal.fire({
          icon: 'error',
          title: 'No se pudo restablecer',
          text: backendMessage,
          confirmButtonColor: '#0284c7'
        });
      }
    });
  }
}