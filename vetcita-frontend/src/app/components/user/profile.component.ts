import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService, UserProfile, UpdateUserProfileRequest } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-white">
      <!-- Header -->
      <div class="bg-gradient-to-r from-teal-400 to-teal-600 pb-12">
        <div class="max-w-4xl mx-auto px-4 py-8">
          <h1 class="text-4xl font-bold text-white mb-2">MI PERFIL 👤</h1>
          <p class="text-teal-100">Administra tu información personal y de contacto</p>
        </div>
      </div>

      <div class="max-w-4xl mx-auto px-4 -mt-8 pb-12">
        <!-- Messages -->
        <div *ngIf="successMessage" class="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          ✓ {{ successMessage }}
        </div>
        <div *ngIf="errorMessage" class="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          ✗ {{ errorMessage }}
        </div>

        <!-- Photo Card -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex items-center gap-6">
            <img
              [src]="avatarUrl"
              alt="Foto de perfil"
              class="w-24 h-24 rounded-full border-4 border-teal-200 object-cover"
            />
            <div>
              <h2 class="text-2xl font-bold text-gray-800">{{ profileForm.get('firstName')?.value }} {{ profileForm.get('lastName')?.value }}</h2>
              <p class="text-gray-500 mt-1">Cliente</p>
              <button type="button" class="mt-3 inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium">
                <span>🔄</span> Cambiar foto
              </button>
            </div>
          </div>
        </div>

        <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="grid gap-6">
          <!-- Personal Info Card -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-gray-800">Información personal</h3>
              <span class="text-2xl">→</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Nombre completo</label>
                <p *ngIf="!editMode" class="text-gray-800 font-medium py-2">{{ profileForm.get('firstName')?.value }} {{ profileForm.get('lastName')?.value }}</p>
                <div *ngIf="editMode" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    formControlName="firstName"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Nombre"
                  />
                  <input
                    type="text"
                    formControlName="lastName"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Apellido"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm text-gray-600 mb-1">Tipo de documento</label>
                <p *ngIf="!editMode" class="text-gray-800 font-medium py-2">
                  {{ profileForm.get('identificationType')?.value === 'CC' ? 'Cédula de Ciudadanía' :
                     profileForm.get('identificationType')?.value === 'CE' ? 'Cédula de Extranjería' :
                     profileForm.get('identificationType')?.value === 'PP' ? 'Pasaporte' : 'N/A' }}
                </p>
                <select
                  *ngIf="editMode"
                  formControlName="identificationType"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="PP">Pasaporte</option>
                </select>
              </div>
            </div>

            <div class="mt-4">
              <label class="block text-sm text-gray-600 mb-1">Número de documento</label>
              <p *ngIf="!editMode" class="text-gray-800 font-medium py-2">{{ profileForm.get('identificationNumber')?.value }}</p>
              <input
                *ngIf="editMode"
                type="text"
                formControlName="identificationNumber"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div class="mt-4" *ngIf="editMode">
              <button
                type="submit"
                [disabled]="profileForm.invalid || loading"
                class="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              >
                {{ loading ? 'Guardando...' : 'Guardar cambios' }}
              </button>
            </div>
          </div>

          <!-- Contact Info Card -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-gray-800">Información de contacto</h3>
              <span class="text-2xl">→</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Email</label>
                <p *ngIf="!editMode" class="text-gray-800 font-medium py-2">{{ profileForm.get('email')?.value }}</p>
                <input
                  *ngIf="editMode"
                  type="email"
                  formControlName="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                  readonly
                />
              </div>

              <div>
                <label class="block text-sm text-gray-600 mb-1">Teléfono</label>
                <p *ngIf="!editMode" class="text-gray-800 font-medium py-2">{{ profileForm.get('phone')?.value }}</p>
                <input
                  *ngIf="editMode"
                  type="tel"
                  formControlName="phone"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div class="mt-4" *ngIf="editMode">
              <button
                type="submit"
                [disabled]="profileForm.invalid || loading"
                class="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              >
                {{ loading ? 'Guardando...' : 'Guardar cambios' }}
              </button>
            </div>
          </div>
        </form>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
          <ng-container *ngIf="!editMode">
            <button
              type="button"
              (click)="setEditMode(true)"
              class="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
            >
              ✎ Editar información
            </button>
          </ng-container>

          <ng-container *ngIf="editMode">
            <button
              type="button"
              (click)="onCancel()"
              class="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-8 rounded-lg transition duration-200"
            >
              ✕ Cancelar
            </button>
          </ng-container>
        </div>
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
