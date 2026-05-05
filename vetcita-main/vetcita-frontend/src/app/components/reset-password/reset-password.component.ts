import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800">Vetcita</h1>
          <p class="text-gray-600 mt-2">Establecer nueva contraseña</p>
        </div>

        <form [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nueva contraseña
            </label>
            <input
              type="password"
              formControlName="password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
            <span *ngIf="isFieldInvalid('password')" class="text-red-500 text-sm mt-1">
              La contraseña debe tener al menos 6 caracteres
            </span>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              formControlName="confirmPassword"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
            <span *ngIf="isFieldInvalid('confirmPassword')" class="text-red-500 text-sm mt-1">
              Las contraseñas no coinciden
            </span>
          </div>

          <!-- Success Message -->
          <div *ngIf="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            {{ successMessage }}
          </div>

          <!-- Error Message -->
          <div *ngIf="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {{ errorMessage }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="resetPasswordForm.invalid || loading || !!successMessage"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            {{ loading ? 'Guardando...' : 'Guardar nueva contraseña' }}
          </button>
        </form>

        <!-- Back to Login Link -->
        <div class="text-center mt-4 pt-4 border-t border-gray-200">
          <a routerLink="/login" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Volver a iniciar sesión
          </a>
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
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      if (!this.token) {
        this.errorMessage = 'Token inválido o expirado';
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.resetPasswordForm.get(fieldName);
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
    if (this.resetPasswordForm.invalid || !this.token) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const resetData = {
      token: this.token,
      password: this.resetPasswordForm.get('password')?.value,
      confirmPassword: this.resetPasswordForm.get('confirmPassword')?.value
    };

    this.authService.resetPassword(resetData).subscribe({
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
        this.errorMessage = error.error?.message || 'Error al resetear la contraseña. El token puede estar expirado.';
      }
    });
  }
}
