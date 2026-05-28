import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReceptionistService } from '../../services/receptionist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receptionist-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="max-w-4xl mx-auto space-y-6 pb-10">
      
      <div class="flex items-center gap-4">
        <a routerLink="/admin/recepcionistas" class="p-2 hover:bg-slate-200 rounded-full transition text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </a>
        <h1 class="text-2xl font-bold text-slate-800">
          {{ isEditMode ? 'Editar Recepcionista' : 'Registrar Nuevo Recepcionista' }}
        </h1>
      </div>

      <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <form [formGroup]="repForm" (ngSubmit)="onSubmit()" class="space-y-6">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div class="flex flex-col gap-1">
              <label class="text-sm font-semibold text-slate-700">Nombres *</label>
              <input type="text" formControlName="firstName" 
                (input)="allowOnlyLetters($event, 'firstName')"
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none focus:bg-white transition"
                [ngClass]="{'border-red-400': isFieldInvalid('firstName'), 'border-slate-200 focus:border-sky-400': !isFieldInvalid('firstName')}">
              <span *ngIf="isFieldInvalid('firstName')" class="text-xs text-red-500 font-medium">El nombre es requerido</span>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-sm font-semibold text-slate-700">Apellidos *</label>
              <input type="text" formControlName="lastName" 
                (input)="allowOnlyLetters($event, 'lastName')"
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none focus:bg-white transition"
                [ngClass]="{'border-red-400': isFieldInvalid('lastName'), 'border-slate-200 focus:border-sky-400': !isFieldInvalid('lastName')}">
              <span *ngIf="isFieldInvalid('lastName')" class="text-xs text-red-500 font-medium">El apellido es requerido</span>
            </div>

            <div class="flex flex-col gap-1" *ngIf="!isEditMode">
              <label class="text-sm font-semibold text-slate-700">Tipo de Documento *</label>
              <select formControlName="identificationType" 
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none focus:bg-white transition text-slate-700"
                [ngClass]="{'border-red-400': isFieldInvalid('identificationType'), 'border-slate-200 focus:border-sky-400': !isFieldInvalid('identificationType')}">
                <option value="" disabled>Seleccione...</option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PASSPORT">Pasaporte</option>
              </select>
            </div>

            <div class="flex flex-col gap-1" *ngIf="!isEditMode">
              <label class="text-sm font-semibold text-slate-700">Número de Documento *</label>
              <input type="text" formControlName="identificationNumber" 
                (input)="allowOnlyNumbers($event, 'identificationNumber')"
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none focus:bg-white transition"
                [ngClass]="{'border-red-400': isFieldInvalid('identificationNumber'), 'border-slate-200 focus:border-sky-400': !isFieldInvalid('identificationNumber')}">
            </div>

            <div class="flex flex-col gap-1 md:col-span-2">
              <label class="text-sm font-semibold text-slate-700">Teléfono *</label>
              <input type="text" formControlName="phone" maxlength="10"
                (input)="allowOnlyNumbers($event, 'phone')"
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none focus:bg-white transition"
                [ngClass]="{'border-red-400': isFieldInvalid('phone'), 'border-slate-200 focus:border-sky-400': !isFieldInvalid('phone')}">
            </div>

            <div class="flex flex-col gap-1 md:col-span-2">
              <label class="text-sm font-semibold text-slate-700">Correo Electrónico *</label>
              <input type="email" formControlName="email" 
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none focus:bg-white transition"
                [ngClass]="{'border-red-400': isFieldInvalid('email'), 'border-slate-200 focus:border-sky-400': !isFieldInvalid('email')}">
            </div>

            <div class="flex flex-col gap-1 md:col-span-2" *ngIf="!isEditMode">
              <label class="text-sm font-semibold text-slate-700">Contraseña Temporal *</label>
              <input type="password" formControlName="password" 
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none focus:bg-white transition"
                [ngClass]="{'border-red-400': isFieldInvalid('password'), 'border-slate-200 focus:border-sky-400': !isFieldInvalid('password')}"
                placeholder="El usuario podrá cambiarla después">
            </div>

            <div *ngIf="isEditMode" class="flex flex-col gap-1 md:col-span-2 pt-4 border-t border-slate-100">
              <label class="text-sm font-semibold text-slate-700">Estado en el sistema</label>
              <div class="flex items-center gap-2 mt-2">
                <input type="checkbox" formControlName="active" id="activeState" class="w-5 h-5 text-[#0C7489] rounded border-slate-300 focus:ring-[#0C7489] cursor-pointer">
                <label for="activeState" class="text-slate-600 cursor-pointer select-none">El recepcionista tiene acceso al sistema</label>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <a routerLink="/admin/recepcionistas" class="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition cursor-pointer">
              Cancelar
            </a>
            <button type="submit" [disabled]="repForm.invalid || isSubmitting" 
              class="px-6 py-3 rounded-xl bg-[#0C7489] text-white font-semibold hover:bg-[#095b6b] transition disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isSubmitting ? 'Procesando...' : (isEditMode ? 'Guardar Cambios' : 'Registrar Recepcionista') }}
            </button>
          </div>

        </form>
      </div>
    </div>
  `
})
export class ReceptionistFormComponent implements OnInit {
  repForm: FormGroup;
  isEditMode: boolean = false;
  repId: number | null = null;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private receptionistService: ReceptionistService,
    private cdr: ChangeDetectorRef
  ) {
    this.repForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ. ]+$')]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ. ]+$')]],
      identificationType: [''],
      identificationNumber: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], 
      password: [''],
      active: [true]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.repId = +id;
        
        this.repForm.get('identificationType')?.clearValidators();
        this.repForm.get('identificationNumber')?.clearValidators();
        this.repForm.get('password')?.clearValidators();
        
        this.loadReceptionistData(this.repId);
      } else {
        this.repForm.get('identificationType')?.setValidators([Validators.required]);
        this.repForm.get('identificationNumber')?.setValidators([Validators.required, Validators.pattern('^[0-9]+$')]);
        this.repForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      }
      
      this.repForm.get('identificationType')?.updateValueAndValidity();
      this.repForm.get('identificationNumber')?.updateValueAndValidity();
      this.repForm.get('password')?.updateValueAndValidity();
    });
  }

  allowOnlyLetters(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ. ]/g, '');
    this.repForm.get(controlName)?.setValue(sanitizedValue, { emitEvent: false });
  }

  allowOnlyNumbers(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^0-9]/g, '');
    this.repForm.get(controlName)?.setValue(sanitizedValue, { emitEvent: false });
  }
  
  isFieldInvalid(field: string): boolean {
    const control = this.repForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  loadReceptionistData(id: number) {
    this.receptionistService.getReceptionistById(id).subscribe({
      next: (data: any) => {
        this.repForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          active: data.active !== undefined ? data.active : data.isActive
        });
        this.cdr.detectChanges();
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar la información.', 'error');
        this.router.navigate(['/admin/recepcionistas']);
      }
    });
  }

  onSubmit() {
    if (this.repForm.invalid) {
      this.repForm.markAllAsTouched();
      return;
    }

    const formData = { ...this.repForm.value };
    formData.isActive = formData.active;

    if (this.isEditMode && this.repId) {
      delete formData.password;
      delete formData.identificationType;
      delete formData.identificationNumber;
      
      this.receptionistService.updateReceptionist(this.repId, formData).subscribe({
        next: () => {
          Swal.fire({ icon: 'success', title: '¡Actualizado!', showConfirmButton: false, timer: 1500 })
            .then(() => this.router.navigate(['/admin/recepcionistas']));
        },
        error: () => Swal.fire('Error', 'Hubo un problema al actualizar.', 'error')
      });
    } else {
      this.isSubmitting = true;
      this.receptionistService.createReceptionist(formData).subscribe({
        next: () => {
          this.isSubmitting = false;
          Swal.fire({ icon: 'success', title: '¡Registrado!', showConfirmButton: false, timer: 1500 })
            .then(() => this.router.navigate(['/admin/recepcionistas']));
        },
        error: () => {
          this.isSubmitting = false;
          Swal.fire('Error', 'Hubo un problema al registrar.', 'error');
        }
      });
    }
  }
}