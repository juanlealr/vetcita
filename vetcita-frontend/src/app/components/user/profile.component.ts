import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService, UserProfile, UpdateUserProfileRequest } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-white">
      <div class="bg-linear-to-r from-sky-500 to-sky-700 pb-12">
        <div class="max-w-4xl mx-auto px-4 py-8">
          <h1 class="text-4xl font-bold text-white mb-2">MI PERFIL</h1>
          <p class="text-sky-100">Administra tu información personal y de contacto</p>
        </div>
      </div>

      <div class="max-w-4xl mx-auto px-4 -mt-8 pb-12">
        <div *ngIf="successMessage" class="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg text-sm">
          ✓ {{ successMessage }}
        </div>
        <div *ngIf="errorMessage" class="mb-4 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg text-sm">
          ✗ {{ errorMessage }}
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 mb-6 border border-slate-100">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="flex items-center gap-6">
              <img
                [src]="avatarUrl"
                alt="Foto de perfil"
                class="w-24 h-24 rounded-full border-4 border-sky-200 object-cover"
              />
              <div>
                <h2 class="text-2xl font-bold text-slate-800">{{ profileForm.get('firstName')?.value }} {{ profileForm.get('lastName')?.value }}</h2>
                <p class="text-slate-500 mt-1">Cliente</p>
                <button *ngIf="editMode" type="button" class="mt-3 inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium transition-colors" (click)="photoInput.click()">
                  Cambiar foto
                </button>
                <p *ngIf="photoError" class="mt-2 text-sm text-rose-500">{{ photoError }}</p>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-3 self-stretch sm:self-center">
              <button
                *ngIf="!editMode"
                type="button"
                (click)="setEditMode(true)"
                class="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Editar información
              </button>
              <button
                *ngIf="editMode"
                type="button"
                (click)="onCancel()"
                class="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Cancelar
              </button>
            </div>
          </div>
          <input #photoInput type="file" accept="image/*" (change)="onPhotoSelected($event)" class="hidden" />
        </div>

        <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-lg shadow-md p-6 border border-slate-100">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-slate-800">Información personal</h3>
            </div>

            <div class="grid gap-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-slate-600 mb-1">Nombre completo</label>
                  <div *ngIf="!editMode" class="text-slate-800 font-medium py-2">
                    {{ profileForm.get('firstName')?.value }} {{ profileForm.get('lastName')?.value }}
                  </div>
                  <div *ngIf="editMode" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      formControlName="firstName"
                      class="w-full px-3 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                      placeholder="Nombre"
                    />
                    <input
                      type="text"
                      formControlName="lastName"
                      class="w-full px-3 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                      placeholder="Apellido"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm text-slate-600 mb-1">Tipo de documento</label>
                  <div *ngIf="!editMode" class="text-slate-800 font-medium py-2">
                    {{ getDocumentTypeName(profileForm.get('identificationType')?.value) }}
                  </div>
                  <select
                    *ngIf="editMode"
                    formControlName="identificationType"
                    class="w-full px-3 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                  >
                    <option value="">Selecciona un tipo</option>
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="TI">Tarjeta de Identidad</option>
                    <option value="CE">Cédula de Extranjería</option>
                    <option value="PASAPORTE">Pasaporte</option>
                    <option value="NIT">NIT</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm text-slate-600 mb-1">Número de documento</label>
                <div *ngIf="!editMode" class="text-slate-800 font-medium py-2">
                  {{ profileForm.get('identificationNumber')?.value }}
                </div>
                <input
                  *ngIf="editMode"
                  type="text"
                  formControlName="identificationNumber"
                  class="w-full px-3 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6 border border-slate-100">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-slate-800">Información de contacto</h3>
            </div>

            <div class="grid gap-4">
              <div>
                <label class="block text-sm text-slate-600 mb-1">Email</label>
                <div *ngIf="!editMode" class="text-slate-800 font-medium py-2">{{ profileForm.get('email')?.value }}</div>
                <input
                  *ngIf="editMode"
                  type="email"
                  formControlName="email"
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed text-sm"
                  readonly
                />
              </div>

              <div>
                <label class="block text-sm text-slate-600 mb-1">Teléfono</label>
                <div *ngIf="!editMode" class="text-slate-800 font-medium py-2">{{ profileForm.get('phone')?.value }}</div>
                <input
                  *ngIf="editMode"
                  type="tel"
                  formControlName="phone"
                  class="w-full px-3 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>

              <div class="mt-4" *ngIf="editMode">
                <button
                  type="submit"
                  [disabled]="profileForm.invalid || loading"
                  class="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  {{ loading ? 'Guardando...' : 'Guardar cambios' }}
                </button>
              </div>
            </div>
          </div>
        </form>

        <form [formGroup]="passwordForm" (ngSubmit)="onChangePassword()" class="bg-white rounded-lg shadow-md p-6 mt-6 border border-slate-100">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-slate-800">Seguridad</h3>
          </div>

          <p class="text-sm text-slate-500 mb-4">Completa solo si deseas cambiar tu contraseña.</p>

          <div class="grid gap-4 sm:grid-cols-[1.1fr_1.1fr_auto] items-start">
            <div>
              <label class="block text-sm text-slate-600 mb-1">Contraseña actual</label>
              <input
                type="password"
                formControlName="currentPassword"
                class="w-full px-3 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                placeholder="Tu contraseña actual"
              />
              <span class="mt-2 block text-xs text-rose-500 min-h-5">
                <span *ngIf="passwordForm.get('currentPassword')?.touched && passwordForm.get('currentPassword')?.invalid">Este campo es requerido.</span>
              </span>
            </div>
            <div>
              <label class="block text-sm text-slate-600 mb-1">Nueva contraseña</label>
              <input
                type="password"
                formControlName="newPassword"
                class="w-full px-3 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                placeholder="Nueva contraseña"
              />
              <span class="mt-2 block text-xs text-rose-500 min-h-5">
                <span *ngIf="passwordForm.get('newPassword')?.touched && passwordForm.get('newPassword')?.invalid">Mínimo 6 caracteres.</span>
              </span>
            </div>

            <div>
              <label class="block text-sm text-slate-600 mb-1">Confirmar contraseña</label>
              <input
                type="password"
                formControlName="confirmPassword"
                class="w-full px-3 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                placeholder="Repite la contraseña"
              />
              <span class="mt-2 block text-xs text-rose-500 min-h-5">
                <span *ngIf="passwordForm.hasError('passwordMismatch') && passwordForm.get('confirmPassword')?.touched">Las contraseñas no coinciden.</span>
              </span>
            </div>

            <div class="flex flex-col items-stretch sm:items-end gap-3">
              <button
                type="submit"
                [disabled]="passwordForm.invalid || passwordLoading"
                class="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 disabled:bg-slate-400 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
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

        <div class="bg-white rounded-lg shadow-md p-6 mt-6 border border-slate-100">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-slate-800">Cuenta</h3>
          </div>

          <p class="text-sm text-slate-500 mb-4">
            Puedes desactivar tu cuenta temporalmente o eliminarla permanentemente. Después de la acción se cerrará tu sesión automáticamente.
          </p>

          <div class="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              (click)="onDeactivateAccount()"
              [disabled]="accountLoading"
              class="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              {{ accountLoading ? 'Procesando...' : 'Desactivar cuenta' }}
            </button>
            <button
              type="button"
              (click)="onDeleteAccount()"
              [disabled]="accountLoading"
              class="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-slate-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              {{ accountLoading ? 'Procesando...' : 'Eliminar cuenta' }}
            </button>
          </div>

          <div class="mt-4">
            <div *ngIf="accountSuccessMessage" class="text-sm text-emerald-600">{{ accountSuccessMessage }}</div>
            <div *ngIf="accountErrorMessage" class="text-sm text-rose-500">{{ accountErrorMessage }}</div>
          </div>
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
  accountLoading = false;
  accountSuccessMessage = '';
  accountErrorMessage = '';
  editMode = false;
  avatarUrl: string = '';
  currentPasswordMask = '********';
  photoPreview: string | null = null;
  photoError = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
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
      currentPassword: ['', Validators.required],
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

  getDocumentTypeName(code: string): string {
    const types: { [key: string]: string } = {
      'CC': 'Cédula de Ciudadanía',
      'TI': 'Tarjeta de Identidad',
      'CE': 'Cédula de Extranjería',
      'PASAPORTE': 'Pasaporte',
      'NIT': 'NIT'
    };
    return types[code] || code || 'N/A';
  }

  setUserAvatar(user: any): void {
    if (!user) {
      this.generateAvatar();
      return;
    }

    const firstName = user.name || user.firstName || user.first_name || user.nombre || '';
    const lastName = user.lastName || user.last_name || user.apellido || '';
    const photo = user.foto || user.photoUrl;

    if (photo) {
      this.avatarUrl = photo;
      return;
    }

    this.avatarUrl = `https://ui-avatars.com/api/?background=0284c7&color=ffffff&name=${firstName}+${lastName}&bold=true`;
  }

  generateAvatar(): void {
    const firstName = this.profileForm.get('firstName')?.value || 'U';
    const lastName = this.profileForm.get('lastName')?.value || '';
    this.avatarUrl = `https://ui-avatars.com/api/?background=0284c7&color=ffffff&name=${firstName}+${lastName}&bold=true`;
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
      next: (profile: any) => {
        if (!profile) return;
        
        this.profileForm.patchValue({
          firstName: profile.firstName || profile.first_name || '',
          lastName: profile.lastName || profile.last_name || '',
          email: profile.email || '',
          phone: profile.phone || '',
          identificationType: profile.identificationType || profile.identification_type || '',
          identificationNumber: profile.identificationNumber || profile.identification_number || ''
        });
        
        this.generateAvatar();
        this.setEditMode(false);
      },
      error: (err) => {
        console.error('Error cargando el perfil:', err);
        this.errorMessage = 'No se pudo cargar tu perfil. Revisa tu conexión o vuelve a iniciar sesión.';
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
      next: (updatedUser: any) => {
        this.successMessage = 'Perfil actualizado correctamente.';
        this.loading = false;
        this.authService.updateStoredUser({
          name: updatedUser.firstName || updatedUser.first_name,
          lastName: updatedUser.lastName || updatedUser.last_name
        });
        // Guardar foto si fue seleccionada
        if (this.photoPreview) {
          this.authService.updateStoredUser({ foto: this.photoPreview });
        }
        this.setEditMode(false);
        this.photoPreview = null;
        this.generateAvatar();
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
      currentPassword: this.passwordForm.get('currentPassword')?.value,
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

  onDeactivateAccount(): void {
    const confirmed = window.confirm('¿Estás seguro de que quieres desactivar tu cuenta?');
    if (!confirmed) {
      return;
    }

    this.accountLoading = true;
    this.accountSuccessMessage = '';
    this.accountErrorMessage = '';

    this.userService.deactivateCurrentUser().subscribe({
      next: (message: string) => {
        this.accountLoading = false;
        const successMessage = message || 'Cuenta desactivada correctamente.';
        window.alert(successMessage);
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.accountLoading = false;
        this.accountErrorMessage = this.getErrorMessage(error, 'No se pudo desactivar la cuenta. Intenta nuevamente.');
      }
    });
  }

  onDeleteAccount(): void {
    const confirmed = window.confirm('¿Deseas eliminar tu cuenta permanentemente? Esta acción no se puede deshacer.');
    if (!confirmed) {
      return;
    }

    this.accountLoading = true;
    this.accountSuccessMessage = '';
    this.accountErrorMessage = '';

    this.userService.deleteCurrentUser().subscribe({
      next: (message: string) => {
        this.accountLoading = false;
        window.alert(message || 'Cuenta eliminada correctamente.');
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.accountLoading = false;
        this.accountErrorMessage = this.getErrorMessage(error, 'No se pudo eliminar la cuenta. Intenta nuevamente.');
      }
    });
  }

  onCancel(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.photoError = '';
    this.photoPreview = null;
    this.setEditMode(false);
    this.loadProfile();
  }

  private getErrorMessage(error: any, fallback: string): string {
    console.error('Perfil error:', error);
    if (error?.error?.message) return error.error.message;
    if (typeof error?.error === 'string' && error.error.trim()) return error.error;
    if (error?.message) return error.message;
    return fallback;
  }
}
