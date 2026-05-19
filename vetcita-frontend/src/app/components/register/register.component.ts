import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-sky-100 px-4 py-10">
      <div class="w-full max-w-155 rounded-[40px] border-4 border-sky-400 bg-sky-100 p-4 shadow-[0_35px_90px_rgba(14,165,233,0.20)]">
        
        <div class="rounded-[30px] border-4 border-sky-500 bg-white p-3 shadow-[0_18px_60px_rgba(15,23,42,0.1)]">
          <img
            src="/assets/images/vet-cita-login-banner.png"
            class="mx-auto h-48 w-full rounded-[20px] object-cover"
            alt="Banner de registro"
          />
        </div>

        <div class="mt-6 rounded-[30px] bg-sky-100 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <h1 class="text-center text-3xl font-semibold text-slate-900">Crear una cuenta nueva</h1>

          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-5">

            <div>
              <div class="relative">
                <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
                    <path d="M12 12c1.933 0 3.5-1.567 3.5-3.5S13.933 5 12 5 8.5 6.567 8.5 8.5 10.067 12 12 12Zm0 2c-2.621 0-7.833 1.313-7.833 3.917V21h15.666v-3.083C19.833 15.313 14.621 14 12 14Z"/>
                  </svg>
                </span>
                <input type="text" formControlName="first_name" placeholder="Nombre" (keypress)="allowOnlyLetters($event)"
                  class="w-full rounded-full border border-sky-300 bg-sky-100 px-14 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"/>
              </div>
              <div *ngIf="isFieldInvalid('first_name')" class="mt-2 pl-4 block text-xs text-rose-500">
                <span *ngIf="registerForm.get('first_name')?.hasError('required')">El nombre es requerido</span>
                <span *ngIf="registerForm.get('first_name')?.hasError('pattern')">Solo se permiten letras</span>
                <span *ngIf="registerForm.get('first_name')?.hasError('minlength')">Mínimo 2 caracteres</span>
              </div>
            </div>

            <div>
              <div class="relative">
                <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
                    <path d="M12 12c1.933 0 3.5-1.567 3.5-3.5S13.933 5 12 5 8.5 6.567 8.5 8.5 10.067 12 12 12Zm0 2c-2.621 0-7.833 1.313-7.833 3.917V21h15.666v-3.083C19.833 15.313 14.621 14 12 14Z"/>
                  </svg>
                </span>
                <input type="text" formControlName="last_name" placeholder="Apellido" (keypress)="allowOnlyLetters($event)"
                  class="w-full rounded-full border border-sky-300 bg-sky-100 px-14 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"/>
              </div>
              <div *ngIf="isFieldInvalid('last_name')" class="mt-2 pl-4 block text-xs text-rose-500">
                <span *ngIf="registerForm.get('last_name')?.hasError('required')">El apellido es requerido</span>
                <span *ngIf="registerForm.get('last_name')?.hasError('pattern')">Solo se permiten letras</span>
                <span *ngIf="registerForm.get('last_name')?.hasError('minlength')">Mínimo 2 caracteres</span>
              </div>
            </div>

            <div>
              <div class="relative">
                <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
                    <path d="M2.25 6.75C2.25 5.507 3.257 4.5 4.5 4.5h15c1.243 0 2.25 1.007 2.25 2.25v10.5c0 1.243-1.007 2.25-2.25 2.25h-15c-1.243 0-2.25-1.007-2.25-2.25V6.75Zm1.5.446v8.304l6.825-4.152L3.75 7.196Zm7.181 4.638 8.319 5.068V7.196l-8.319 5.068Zm-1.181.181L3.75 16.11V7.89l6.5 3.9Z"/>
                  </svg>
                </span>
                <input type="email" formControlName="email" placeholder="Correo electrónico"
                  class="w-full rounded-full border border-sky-300 bg-sky-100 px-14 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"/>
              </div>
              <div *ngIf="isFieldInvalid('email')" class="mt-2 pl-4 block text-xs text-rose-500">
                <span *ngIf="registerForm.get('email')?.hasError('required')">El email es requerido</span>
                <span *ngIf="registerForm.get('email')?.hasError('email')">Ingresa un email válido</span>
              </div>
            </div>

            <div>
              <div class="relative">
                <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
                    <path d="M21 6.75H3v-1.5h18v1.5Zm0 4.5H3V9h18v2.25Zm0 4.5H3v-1.5h18v1.5ZM3 19.5h18v-1.5H3v1.5Z"/>
                  </svg>
                </span>
                <input type="tel" formControlName="phone" placeholder="Número telefónico" (keypress)="allowOnlyNumbers($event)"
                  class="w-full rounded-full border border-sky-300 bg-sky-100 px-14 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"/>
              </div>
              <div *ngIf="isFieldInvalid('phone')" class="mt-2 pl-4 block text-xs text-rose-500">
                <div *ngIf="isFieldInvalid('phone')" class="mt-2 pl-4 block text-xs text-rose-500">
                  <span *ngIf="registerForm.get('phone')?.hasError('required')">El teléfono es requerido</span>
                  <span *ngIf="registerForm.get('phone')?.hasError('pattern')">Debe empezar por 3 y tener 10 dígitos</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              
              <div>
                <div class="relative">
                  <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M4 4h16v16H4z"/>
                    </svg>
                  </span>
                  <select formControlName="identification_type"
                    class="w-full rounded-full border border-sky-300 bg-sky-100 px-14 py-4 text-xs text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 cursor-pointer">
                    <option value="" disabled selected>Tipo de documento</option>
                    <option *ngFor="let doc of documentTypes" [value]="doc.code">
                      {{ doc.name }}
                    </option>
                  </select>
                </div>
                <div *ngIf="isFieldInvalid('identification_type')" class="mt-2 pl-4 block text-xs text-rose-500">
                  Requerido
                </div>
              </div>

              <div>
                <div class="relative">
                  <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky-600">#</span>
                  <input type="text" formControlName="identification_number" placeholder="Número" (keypress)="allowAlphaNumeric($event)"
                    class="w-full rounded-full border border-sky-300 bg-sky-100 px-10 py-4 text-sm placeholder:text-xs text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"/>
                </div>
                <div *ngIf="isFieldInvalid('identification_number')" class="mt-2 pl-4 block text-xs text-rose-500">
                  <span *ngIf="registerForm.get('identification_number')?.hasError('required')">Requerido</span>
                  <span *ngIf="registerForm.get('identification_number')?.hasError('minlength')">Mínimo 5 caracteres</span>
                  <span *ngIf="registerForm.get('identification_number')?.hasError('pattern')">Inválido</span>
                </div>
              </div>

            </div>

            <div class="grid grid-cols-2 gap-4">
              
              <div>
                <div class="relative">
                  <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
                      <path d="M17.25 11.25h-.75V9c0-2.484-2.016-4.5-4.5-4.5s-4.5 2.016-4.5 4.5v2.25H6.75A2.25 2.25 0 0 0 4.5 13.5v6.75c0 1.243 1.007 2.25 2.25 2.25h10.5c1.243 0 2.25-1.007 2.25-2.25V13.5a2.25 2.25 0 0 0-2.25-2.25Zm-8.25-2.25c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25v2.25h-4.5V9Zm8.25 11.25H6.75V13.5h10.5v6.75Z"/>
                    </svg>
                  </span>
                  <input [type]="showPassword ? 'text' : 'password'" formControlName="password" placeholder="Contraseña"
                    class="w-full rounded-full border border-sky-300 bg-sky-100 pl-14 pr-12 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"/>
                  <button type="button" (click)="showPassword = !showPassword" 
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-sky-600 hover:text-sky-800 focus:outline-none">
                    <svg *ngIf="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <svg *ngIf="showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  </button>
                </div>
                <div *ngIf="isFieldInvalid('password')" class="mt-2 pl-4 block text-xs text-rose-500">
                  <span *ngIf="registerForm.get('password')?.hasError('required')">Requerido</span>
                  <span *ngIf="registerForm.get('password')?.hasError('minlength')">Mínimo 6 caracteres</span>
                </div>
              </div>

              <div>
                <div class="relative">
                  <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
                      <path d="M17.25 11.25h-.75V9c0-2.484-2.016-4.5-4.5-4.5s-4.5 2.016-4.5 4.5v2.25H6.75A2.25 2.25 0 0 0 4.5 13.5v6.75c0 1.243 1.007 2.25 2.25 2.25h10.5c1.243 0 2.25-1.007 2.25-2.25V13.5a2.25 2.25 0 0 0-2.25-2.25Zm-8.25-2.25c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25v2.25h-4.5V9Zm8.25 11.25H6.75V13.5h10.5v6.75Z"/>
                    </svg>
                  </span>
                  <input [type]="showConfirmPassword ? 'text' : 'password'" formControlName="confirmPassword" placeholder="Confirmar"
                    class="w-full rounded-full border border-sky-300 bg-sky-100 pl-14 pr-12 py-4 text-sm placeholder:text-xs text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"/>
                  <button type="button" (click)="showConfirmPassword = !showConfirmPassword" 
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-sky-600 hover:text-sky-800 focus:outline-none">
                    <svg *ngIf="!showConfirmPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <svg *ngIf="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  </button>
                </div>
                <div *ngIf="registerForm.hasError('passwordMismatch') && registerForm.get('confirmPassword')?.touched" class="mt-2 pl-4 block text-xs text-rose-500">
                  No coinciden
                </div>
              </div>

            </div>

            <div *ngIf="errorMessage" class="mt-5 text-rose-500 text-sm text-center font-medium">
              {{ errorMessage }}
            </div>

            <button type="submit"
              [disabled]="registerForm.invalid || loading"
              class="w-full rounded-full px-6 py-4 text-white font-semibold transition-all duration-300
                    bg-sky-600 hover:bg-sky-700 
                    disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-none">
              {{ loading ? 'Registrando...' : 'Registrarse' }}
            </button>

          </form>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';
  
  // Variables para ocultar/mostrar las contraseñas
  showPassword = false;
  showConfirmPassword = false;

  documentTypes = [
    { code: 'CC', name: 'Cédula de ciudadanía' },
    { code: 'TI', name: 'Tarjeta de identidad' },
    { code: 'CE', name: 'Cédula de extranjería' },
    { code: 'PAS', name: 'Pasaporte' },
    { code: 'NIT', name: 'NIT' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      first_name: ['', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(50), 
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      last_name: ['', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(50), 
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      identification_type: ['', Validators.required],
      identification_number: ['', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9]+$/)
      ]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required, 
        Validators.pattern(/^3[0-9]{9}$/)
      ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  passwordMatchValidator(form: FormGroup) {
    const p = form.get('password')?.value;
    const c = form.get('confirmPassword')?.value;
    return p === c ? null : { passwordMismatch: true };
  }

  allowOnlyLetters(event: KeyboardEvent): void {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const regex = /^[0-9]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  allowAlphaNumeric(event: KeyboardEvent): void {
    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  onSubmit(): void {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const registerData = {
      firstName: this.registerForm.get('first_name')?.value,
      lastName: this.registerForm.get('last_name')?.value,
      identificationType: this.registerForm.get('identification_type')?.value,
      identificationNumber: this.registerForm.get('identification_number')?.value,
      email: this.registerForm.get('email')?.value,
      phone: this.registerForm.get('phone')?.value,
      password: this.registerForm.get('password')?.value
    };

    this.authService.register(registerData).subscribe({
      next: () => {
        this.router.navigate(['/login'], {
          state: { message: 'Registro exitoso. Por favor inicia sesión.' }
        });
      },
      error: (err) => {
        this.loading = false;
        const errorMsg = err?.error?.message || 'Error al registrar. Verifica los datos.';
        
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMsg,
          confirmButtonColor: '#0284c7'
        });
      }
    });
  }
}