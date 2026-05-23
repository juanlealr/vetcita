import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService, UserProfile, UpdateUserProfileRequest } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800">Mi perfil</h1>
          <p class="text-gray-600 mt-2">Actualiza tus datos personales y de contacto</p>
        </div>

        <div *ngIf="successMessage" class="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          {{ successMessage }}
        </div>

        <div *ngIf="errorMessage" class="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {{ errorMessage }}
        </div>

        <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="grid gap-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                formControlName="firstName"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
              <input
                type="text"
                formControlName="lastName"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              formControlName="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
              readonly
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                formControlName="phone"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de identificación</label>
              <select
                formControlName="identificationType"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona un tipo</option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PP">Pasaporte</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Número de identificación</label>
            <input
              type="text"
              formControlName="identificationNumber"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              type="submit"
              [disabled]="profileForm.invalid || loading"
              class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
            >
              {{ loading ? 'Guardando...' : 'Guardar cambios' }}
            </button>
            <a routerLink="/dashboard" class="w-full sm:w-auto inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-lg transition duration-200">
              Volver al dashboard
            </a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';
  editMode = false;
  avatarUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      identificationType: ['', Validators.required],
      identificationNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProfile();
    this.generateAvatar();
  }

  generateAvatar(): void {
    const firstName = this.profileForm.get('firstName')?.value || 'U';
    const lastName = this.profileForm.get('lastName')?.value || '';
    this.avatarUrl = `https://ui-avatars.com/api/?background=14B8A6&color=ffffff&name=${firstName}+${lastName}&bold=true`;
  }

  setEditMode(edit: boolean) {
    this.editMode = edit;
    Object.keys(this.profileForm.controls).forEach(key => {
      if (key === 'email') {
        this.profileForm.get(key)?.disable();
      } else {
        if (edit) this.profileForm.get(key)?.enable();
        else this.profileForm.get(key)?.disable();
      }
    });
  }

  loadProfile(): void {
    this.userService.getCurrentUser().subscribe({
      next: (profile: UserProfile) => {
        this.profileForm.patchValue({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone,
          identificationType: profile.identificationType,
          identificationNumber: profile.identificationNumber
        });
        // start in view mode
        this.setEditMode(false);
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar tu perfil. Vuelve a intentarlo.';
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const updateRequest: UpdateUserProfileRequest = {
      firstName: this.profileForm.get('firstName')?.value,
      lastName: this.profileForm.get('lastName')?.value,
      phone: this.profileForm.get('phone')?.value,
      identificationType: this.profileForm.get('identificationType')?.value,
      identificationNumber: this.profileForm.get('identificationNumber')?.value
    };

    this.userService.updateCurrentUser(updateRequest).subscribe({
      next: () => {
        this.successMessage = 'Perfil actualizado correctamente.';
        this.loading = false;
        // exit edit mode after successful save
        this.setEditMode(false);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = this.getErrorMessage(error, 'No se pudo actualizar tu perfil. Intenta nuevamente.');
      }
    });
  }

  onCancel(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.setEditMode(false);
    this.loadProfile();
  }

  private getErrorMessage(error: any, fallback: string): string {
    console.error('Perfil error:', error);
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
