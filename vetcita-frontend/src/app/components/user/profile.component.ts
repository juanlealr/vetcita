import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService, UserProfile, UpdateUserProfileRequest } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-white">
      <!-- Header -->
      <div class="bg-gradient-to-r from-teal-400 to-teal-600 pb-12">
        <div class="max-w-4xl mx-auto px-4 py-8">
          <h1 class="text-4xl font-bold text-white mb-2">MI PERFIL </h1>
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
              <button type="button" class="mt-3 inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium" (click)="photoInput.click()">
                <span></span> Cambiar foto
              </button>
              <input #photoInput type="file" accept="image/*" (change)="onPhotoSelected($event)" class="hidden" />
              <p *ngIf="photoError" class="mt-2 text-sm text-rose-500">{{ photoError }}</p>
            </div>
          </div>
        </div>

        <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Personal Info Card -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-gray-800">Información personal</h3>
              <span class="text-2xl"></span>
            </div>

            <div class="grid gap-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Nombre completo</label>
                  <div *ngIf="!editMode" class="text-gray-800 font-medium py-2">
                    {{ profileForm.get('firstName')?.value }} {{ profileForm.get('lastName')?.value }}
                  </div>
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
                  <div *ngIf="!editMode" class="text-gray-800 font-medium py-2">
                    {{ profileForm.get('identificationType')?.value === 'CC' ? 'Cédula de Ciudadanía' :
                       profileForm.get('identificationType')?.value === 'CE' ? 'Cédula de Extranjería' :
                       profileForm.get('identificationType')?.value === 'PP' ? 'Pasaporte' : 'N/A' }}
                  </div>
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

              <div>
                <label class="block text-sm text-gray-600 mb-1">Número de documento</label>
                <div *ngIf="!editMode" class="text-gray-800 font-medium py-2">
                  {{ profileForm.get('identificationNumber')?.value }}
                </div>
                <input
                  *ngIf="editMode"
                  type="text"
                  formControlName="identificationNumber"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          <!-- Contact Info Card -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-gray-800">Información de contacto</h3>
              <span class="text-2xl"></span>
            </div>

            <div class="grid gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Email</label>
                <div *ngIf="!editMode" class="text-gray-800 font-medium py-2">{{ profileForm.get('email')?.value }}</div>
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
                <div *ngIf="!editMode" class="text-gray-800 font-medium py-2">{{ profileForm.get('phone')?.value }}</div>
                <input
                  *ngIf="editMode"
                  type="tel"
                  formControlName="phone"
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
          </div>
        </form>

        <form [formGroup]="passwordForm" (ngSubmit)="onChangePassword()" class="bg-white rounded-lg shadow-md p-6 mt-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-800">Seguridad</h3>
            <span class="text-2xl"></span>
          </div>

          <p class="text-sm text-gray-500 mb-4">Completa solo si deseas cambiar tu contraseña.</p>

          <div class="grid gap-4 sm:grid-cols-[1.1fr_1.1fr_auto] items-start">
            <div>
              <label class="block text-sm text-gray-600 mb-1">Contraseña actual</label>
              <input
                type="password"
                [value]="currentPasswordMask"
                readonly
                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Nueva contraseña</label>
              <input
                type="password"
                formControlName="newPassword"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Nueva contraseña"
              />
              <span class="mt-2 block text-xs text-rose-500 min-h-[1.25rem]">
                <span *ngIf="passwordForm.get('newPassword')?.touched && passwordForm.get('newPassword')?.invalid">Mínimo 6 caracteres.</span>
              </span>
            </div>

            <div>
              <label class="block text-sm text-gray-600 mb-1">Confirmar contraseña</label>
              <input
                type="password"
                formControlName="confirmPassword"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Repite la contraseña"
              />
              <span class="mt-2 block text-xs text-rose-500 min-h-[1.25rem]">
                <span *ngIf="passwordForm.hasError('passwordMismatch') && passwordForm.get('confirmPassword')?.touched">Las contraseñas no coinciden.</span>
              </span>
            </div>

            <div class="flex flex-col items-stretch sm:items-end gap-3">
              <button
                type="submit"
                [disabled]="passwordForm.invalid || passwordLoading"
                class="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
              >
                {{ passwordLoading ? 'Actualizando...' : 'Cambiar contraseña' }}
              </button>
            </div>
          </div>

          <div class="mt-4">
            <div *ngIf="passwordErrorMessage" class="text-sm text-rose-500">{{ passwordErrorMessage }}</div>
            <div *ngIf="passwordSuccessMessage" class="text-sm text-emerald-600">{{ passwordSuccessMessage }}</div>
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
              Editar información
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
  passwordForm: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';
  passwordLoading = false;
  passwordSuccessMessage = '';
  passwordErrorMessage = '';
  editMode = false;
  avatarUrl: string = '';
  currentPasswordMask = '********';
  photoPreview: string | null = null;
  photoError = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      identificationType: ['', Validators.required],
      identificationNumber: ['', Validators.required]
    });

    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.setUserAvatar(user);
    });

    this.loadProfile();
  }

  setUserAvatar(user: any): void {
    if (!user) {
      this.generateAvatar();
      return;
    }

    const firstName = user.name || user.firstName || user.nombre || '';
    const lastName = user.lastName || user.apellido || '';
    const photo = user.foto || user.photoUrl;

    if (photo) {
      this.avatarUrl = photo;
      return;
    }

    this.avatarUrl = `https://ui-avatars.com/api/?background=14B8A6&color=ffffff&name=${firstName}+${lastName}&bold=true`;
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
      next: (updatedUser) => {
        this.successMessage = 'Perfil actualizado correctamente.';
        this.loading = false;
        this.authService.updateStoredUser({
          name: updatedUser.firstName,
          lastName: updatedUser.lastName
        });
        this.savePhotoToStorage();
        // exit edit mode after successful save
        this.setEditMode(false);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = this.getErrorMessage(error, 'No se pudo actualizar tu perfil. Intenta nuevamente.');
      }
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword && confirmPassword && newPassword !== confirmPassword ? { passwordMismatch: true } : null;
  }

  onChangePassword(): void {
    if (this.passwordForm.invalid) {
      return;
    }

    this.passwordLoading = true;
    this.passwordSuccessMessage = '';
    this.passwordErrorMessage = '';

    const request = {
      newPassword: this.passwordForm.get('newPassword')?.value
    };

    this.authService.changePassword(request).subscribe({
      next: () => {
        this.passwordLoading = false;
        this.passwordSuccessMessage = 'Contraseña actualizada correctamente.';
        this.passwordForm.reset();
      },
      error: (error) => {
        this.passwordLoading = false;
        this.passwordErrorMessage = this.getErrorMessage(error, 'No se pudo actualizar la contraseña. Intenta nuevamente.');
      }
    });
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.item(0);

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.photoError = 'Selecciona una imagen válida.';
      return;
    }

    this.photoError = '';
    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview = reader.result as string;
      this.avatarUrl = this.photoPreview;
    };
    reader.readAsDataURL(file);
  }

  private savePhotoToStorage(): void {
    if (!this.photoPreview) {
      return;
    }

    this.authService.updateStoredUser({ foto: this.photoPreview });
  }

  onCancel(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.setEditMode(false);
    this.photoPreview = null;
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
