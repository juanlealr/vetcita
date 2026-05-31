import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="max-w-4xl mx-auto space-y-6">
      
      <div class="flex items-center gap-4">
        <a routerLink="/admin/clientes" class="p-2 hover:bg-slate-200 rounded-full transition text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </a>
        <h1 class="text-2xl font-bold text-slate-800">
          {{ isEditMode ? 'Editar Cliente' : 'Registrar Nuevo Cliente' }}
        </h1>
      </div>

      <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <form [formGroup]="clientForm" (ngSubmit)="onSubmit()" class="space-y-6">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div class="flex flex-col gap-1">
              <label class="text-sm font-semibold text-slate-700">Nombres *</label>
              <input type="text" formControlName="firstName" 
                (input)="allowOnlyLetters($event, 'firstName')"
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none focus:bg-white transition"
                [ngClass]="{'border-red-400': isFieldInvalid('firstName'), 'border-slate-200 focus:border-sky-400': !isFieldInvalid('firstName')}"
                placeholder="Ej. Juan">
              <span *ngIf="isFieldInvalid('firstName')" class="text-xs text-red-500 font-medium">El nombre es requerido y solo debe contener letras</span>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-sm font-semibold text-slate-700">Apellidos *</label>
              <input type="text" formControlName="lastName" 
                (input)="allowOnlyLetters($event, 'lastName')"
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none focus:bg-white transition"
                [ngClass]="{'border-red-400': isFieldInvalid('lastName'), 'border-slate-200 focus:border-sky-400': !isFieldInvalid('lastName')}"
                placeholder="Ej. Pérez">
              <span *ngIf="isFieldInvalid('lastName')" class="text-xs text-red-500 font-medium">El apellido es requerido y solo debe contener letras</span>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-sm font-semibold text-slate-700">Tipo de Documento *</label>
              <select formControlName="identificationType" 
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none focus:bg-white transition text-slate-700"
                [ngClass]="{'border-red-400': isFieldInvalid('identificationType'), 'border-slate-200 focus:border-sky-400': !isFieldInvalid('identificationType')}">
                <option value="" disabled>Seleccione una opción</option>
                <option value="CC">Cédula de Ciudadanía (CC)</option>
                <option value="CE">Cédula de Extranjería (CE)</option>
                <option value="TI">Tarjeta de Identidad (TI)</option>
                <option value="PASAPORTE">Pasaporte</option>
                <option value="NIT">NIT</option>
              </select>
              <span *ngIf="isFieldInvalid('identificationType')" class="text-xs text-red-500 font-medium">Seleccione un tipo de documento</span>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-sm font-semibold text-slate-700">Número de Documento *</label>
              <input type="text" formControlName="identificationNumber" 
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none focus:bg-white transition"
                [ngClass]="{'border-red-400': isFieldInvalid('identificationNumber'), 'border-slate-200 focus:border-sky-400': !isFieldInvalid('identificationNumber')}"
                placeholder="Ej. 10456789">
              <span *ngIf="isFieldInvalid('identificationNumber')" class="text-xs text-red-500 font-medium">Ingrese un número válido (sin espacios)</span>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-sm font-semibold text-slate-700">Correo Electrónico *</label>
              <input type="email" formControlName="email" 
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none focus:bg-white transition"
                [ngClass]="{'border-red-400': isFieldInvalid('email'), 'border-slate-200 focus:border-sky-400': !isFieldInvalid('email')}"
                placeholder="ejemplo@correo.com">
              <span *ngIf="isFieldInvalid('email')" class="text-xs text-red-500 font-medium">Ingrese un correo electrónico válido</span>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-sm font-semibold text-slate-700">Teléfono Celular *</label>
              <input type="text" formControlName="phone" maxlength="10"
                (input)="allowOnlyNumbers($event, 'phone')"
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none focus:bg-white transition"
                [ngClass]="{'border-red-400': isFieldInvalid('phone'), 'border-slate-200 focus:border-sky-400': !isFieldInvalid('phone')}"
                placeholder="Ej. 3001234567">
              <span *ngIf="isFieldInvalid('phone')" class="text-xs text-red-500 font-medium">Debe empezar por 3 y tener exactamente 10 dígitos numéricos</span>
            </div>
            
          </div>

          <div class="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <a routerLink="/admin/clientes" class="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition cursor-pointer">
              Cancelar
            </a>
            <button type="submit" [disabled]="clientForm.invalid || isSubmitting" ...>
              {{ isSubmitting ? 'Procesando...' : (isEditMode ? 'Guardar Cambios' : 'Registrar Cliente') }}
            </button>
          </div>

        </form>
      </div>
    </div>
  `
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  isEditMode: boolean = false;
  clientId: number | null = null;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.clientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      identificationType: ['', Validators.required],
      identificationNumber: ['', [Validators.required, Validators.pattern('^[0-9A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^3[0-9]{9}$')]], 
      active: [true] 
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.clientId = +id;
        this.loadClientData(this.clientId);
      }
    });
  }

  allowOnlyLetters(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '');
    this.clientForm.get(controlName)?.setValue(sanitizedValue, { emitEvent: false });
  }

  allowOnlyNumbers(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^0-9]/g, '');
    this.clientForm.get(controlName)?.setValue(sanitizedValue, { emitEvent: false });
  }
  
  isFieldInvalid(field: string): boolean {
    const control = this.clientForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  loadClientData(id: number) {
    this.userService.getClientById(id).subscribe({
      next: (clientData) => {
        this.clientForm.patchValue({
          firstName: clientData.firstName,
          lastName: clientData.lastName,
          identificationType: clientData.identificationType,
          identificationNumber: clientData.identificationNumber,
          email: clientData.email,
          phone: clientData.phone,
          active: clientData.active
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información del cliente.',
          confirmButtonColor: '#20b2aa'
        });
        this.router.navigate(['/admin/clientes']);
      }
    });
  }

  onSubmit() {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    const formData = this.clientForm.value;

    if (this.isEditMode && this.clientId) {
      this.userService.updateClient(this.clientId, formData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Actualizado!',
            text: 'El cliente se ha actualizado correctamente.',
            confirmButtonColor: '#20b2aa',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/admin/clientes']);
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al actualizar el cliente. Verifica los datos.',
            confirmButtonColor: '#20b2aa'
          });
        }
      });
    } else {
      this.isSubmitting = true;
      this.userService.createClient(formData).subscribe({
        next: () => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'success',
            title: '¡Registrado!',
            text: 'El cliente ha sido creado exitosamente.',
            confirmButtonColor: '#20b2aa',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/admin/clientes']);
          });
        },
        error: (err) => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al crear el cliente. Es posible que el correo o documento ya existan.',
            confirmButtonColor: '#20b2aa'
          });
        }
      });
    }
  }
}