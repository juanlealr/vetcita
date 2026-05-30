import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MedicalServiceService } from '../../services/medical-service.service';
import { VetService } from '../../services/vet.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="max-w-4xl mx-auto space-y-6 pb-10">
      
      <div class="flex items-center gap-4">
        <a routerLink="/admin/veterinarios" class="p-2 hover:bg-slate-200 rounded-full transition text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </a>
        <h1 class="text-2xl font-bold text-slate-800">
          {{ isEditMode ? 'Editar Veterinario' : 'Registrar Nuevo Veterinario' }}
        </h1>
      </div>

      <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <form [formGroup]="vetForm" (ngSubmit)="onSubmit()" class="space-y-6">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div class="flex flex-col gap-1 md:col-span-2">
              <label class="text-sm font-semibold text-slate-700">Nombre Completo *</label>
              <input type="text" formControlName="name" 
                (input)="allowOnlyLetters($event, 'name')"
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none focus:bg-white transition"
                [ngClass]="{'border-red-400': isFieldInvalid('name'), 'border-slate-200 focus:border-sky-400': !isFieldInvalid('name')}"
                placeholder="Ej. Dra. María Gómez">
              <div *ngIf="isFieldInvalid('name')" class="text-xs text-red-500 font-medium">
                <span *ngIf="vetForm.get('name')?.hasError('required')">El nombre es requerido.</span>
                <span *ngIf="vetForm.get('name')?.hasError('minlength')">Debe tener al menos 3 caracteres.</span>
                <span *ngIf="vetForm.get('name')?.hasError('pattern')">Solo se permiten letras.</span>
              </div>
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
              <div *ngIf="isFieldInvalid('identificationType')" class="text-xs text-red-500 font-medium">
                <span *ngIf="vetForm.get('identificationType')?.hasError('required')">Seleccione un tipo de documento.</span>
              </div>
            </div>

            <div class="flex flex-col gap-1" *ngIf="!isEditMode">
              <label class="text-sm font-semibold text-slate-700">Número de Documento *</label>
              <input type="text" formControlName="identificationNumber" 
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none focus:bg-white transition"
                [ngClass]="{'border-red-400': isFieldInvalid('identificationNumber'), 'border-slate-200 focus:border-sky-400': !isFieldInvalid('identificationNumber')}"
                placeholder="Ej. 1020304050">
              <div *ngIf="isFieldInvalid('identificationNumber')" class="text-xs text-red-500 font-medium">
                <span *ngIf="vetForm.get('identificationNumber')?.hasError('required')">El número de documento es requerido.</span>
              </div>
            </div>

            <div class="flex flex-col gap-1" [ngClass]="{'md:col-span-1': !isEditMode, 'md:col-span-2': isEditMode}">
              <label class="text-sm font-semibold text-slate-700">Especialidad Principal *</label>
              <select formControlName="specialty" 
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none focus:bg-white transition text-slate-700"
                [ngClass]="{'border-red-400': isFieldInvalid('specialty'), 'border-slate-200 focus:border-sky-400': !isFieldInvalid('specialty')}">
                <option value="" disabled>Seleccione una especialidad</option>
                <option value="General">Medicina General</option>
                <option value="Cirugía">Cirugía</option>
                <option value="Dermatología">Dermatología</option>
                <option value="Oftalmología">Oftalmología</option>
                <option value="Odontología">Odontología</option>
                <option value="Cardiología">Cardiología</option>
              </select>
              <div *ngIf="isFieldInvalid('specialty')" class="text-xs text-red-500 font-medium">
                <span *ngIf="vetForm.get('specialty')?.hasError('required')">Seleccione una especialidad.</span>
              </div>
            </div>

            <div class="flex flex-col gap-1 md:col-span-2">
              <label class="text-sm font-semibold text-slate-700">Teléfono *</label>
              <input type="text" formControlName="phone" maxlength="10"
                (input)="allowOnlyNumbers($event, 'phone')"
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none focus:bg-white transition"
                [ngClass]="{'border-red-400': isFieldInvalid('phone'), 'border-slate-200 focus:border-sky-400': !isFieldInvalid('phone')}"
                placeholder="Ej. 3001234567">
              <div *ngIf="isFieldInvalid('phone')" class="text-xs text-red-500 font-medium">
                <span *ngIf="vetForm.get('phone')?.hasError('required')">El teléfono es requerido.</span>
                <span *ngIf="vetForm.get('phone')?.hasError('pattern')">Debe empezar con 3 y tener exactamente 10 dígitos.</span>
              </div>
            </div>

            <div class="flex flex-col gap-1 md:col-span-2">
              <label class="text-sm font-semibold text-slate-700">Correo Electrónico *</label>
              <input type="email" formControlName="email" 
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none focus:bg-white transition"
                [ngClass]="{'border-red-400': isFieldInvalid('email'), 'border-slate-200 focus:border-sky-400': !isFieldInvalid('email')}"
                placeholder="doctor@vetcita.com">
              <div *ngIf="isFieldInvalid('email')" class="text-xs text-red-500 font-medium">
                <span *ngIf="vetForm.get('email')?.hasError('required')">El correo es requerido.</span>
                <span *ngIf="vetForm.get('email')?.hasError('email')">Ingrese un formato de correo válido.</span>
              </div>
            </div>

            <div class="flex flex-col gap-1 md:col-span-2" *ngIf="!isEditMode">
              <label class="text-sm font-semibold text-slate-700">Contraseña de Acceso al Sistema *</label>
              <input type="password" formControlName="password" 
                class="w-full px-4 py-3 rounded-xl border bg-slate-50 focus:outline-none focus:bg-white transition"
                [ngClass]="{'border-red-400': isFieldInvalid('password'), 'border-slate-200 focus:border-sky-400': !isFieldInvalid('password')}"
                placeholder="Mínimo 6 caracteres">
              <div *ngIf="isFieldInvalid('password')" class="text-xs text-red-500 font-medium">
                <span *ngIf="vetForm.get('password')?.hasError('required')">La contraseña es requerida.</span>
                <span *ngIf="vetForm.get('password')?.hasError('minlength')">Debe tener un mínimo de 6 caracteres.</span>
              </div>
            </div>
            
            <div class="flex flex-col gap-2 md:col-span-2 pt-4 border-t border-slate-100">
              <label class="text-sm font-semibold text-slate-700">Servicios Asignados</label>
              <p class="text-xs text-slate-500">Selecciona los servicios médicos que este veterinario puede atender.</p>
              
              <div *ngIf="availableServices.length > 0; else noServices" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                <div *ngFor="let service of availableServices" class="flex items-center gap-3 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition cursor-pointer" (click)="toggleService(service.id)">
                  <input type="checkbox" 
                         [id]="'service-' + service.id" 
                         [checked]="isServiceSelected(service.id)"
                         (change)="onServiceChange($event, service.id)"
                         (click)="$event.stopPropagation()"
                         class="w-5 h-5 text-[#0C7489] rounded border-slate-300 focus:ring-[#0C7489] cursor-pointer">
                  <label [for]="'service-' + service.id" class="text-sm font-medium text-slate-700 cursor-pointer select-none w-full">
                    {{ service.name }}
                  </label>
                </div>
              </div>
              <ng-template #noServices>
                <div class="p-4 bg-amber-50 text-amber-700 rounded-xl text-sm border border-amber-100">
                  Cargando servicios o no hay servicios médicos activos registrados en el sistema.
                </div>
              </ng-template>
            </div>

            <div *ngIf="isEditMode" class="flex flex-col gap-1 md:col-span-2 pt-4 border-t border-slate-100">
              <label class="text-sm font-semibold text-slate-700">Estado en el sistema</label>
              <div class="flex items-center gap-2 mt-2">
                <input type="checkbox" formControlName="active" id="activeState" class="w-5 h-5 text-[#0C7489] rounded border-slate-300 focus:ring-[#0C7489] cursor-pointer">
                <label for="activeState" class="text-slate-600 cursor-pointer select-none">El veterinario está activo y disponible para citas</label>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <a routerLink="/admin/veterinarios" class="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition cursor-pointer">
              Cancelar
            </a>
            <button type="submit" [disabled]="vetForm.invalid || isSubmitting" 
              class="px-6 py-3 rounded-xl bg-[#0C7489] text-white font-semibold hover:bg-[#095b6b] transition disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isSubmitting ? 'Procesando...' : (isEditMode ? 'Guardar Cambios' : 'Registrar Veterinario') }}
            </button>
          </div>

        </form>
      </div>
    </div>
  `
})
export class VetFormComponent implements OnInit {
  vetForm: FormGroup;
  isEditMode: boolean = false;
  vetId: number | null = null;
  isSubmitting: boolean = false;

  availableServices: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vetService: VetService,
    private medicalService: MedicalServiceService,
    private cdr: ChangeDetectorRef
  ) {
    this.vetForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ. ]+$')]],
      identificationType: [''],
      identificationNumber: [''],
      specialty: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^3[0-9]{9}$')]], 
      password: [''],
      active: [true],
      serviceIds: [[]]
    });
  }

  ngOnInit(): void {
    this.loadMedicalServices();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.vetId = +id;
        
        this.vetForm.get('identificationType')?.clearValidators();
        this.vetForm.get('identificationNumber')?.clearValidators();
        this.vetForm.get('password')?.clearValidators();
        
        this.loadVetData(this.vetId);
      } else {
        this.vetForm.get('identificationType')?.setValidators([Validators.required]);
        this.vetForm.get('identificationNumber')?.setValidators([Validators.required]);
        this.vetForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      }
      
      this.vetForm.get('identificationType')?.updateValueAndValidity();
      this.vetForm.get('identificationNumber')?.updateValueAndValidity();
      this.vetForm.get('password')?.updateValueAndValidity();
    });
  }

  loadMedicalServices() {
    this.medicalService.getActiveServices().subscribe({
      next: (services) => {
        this.availableServices = services;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar los servicios médicos', err);
      }
    });
  }

  isServiceSelected(serviceId: number): boolean {
    const currentIds = this.vetForm.get('serviceIds')?.value as number[];
    return currentIds.includes(serviceId);
  }

  onServiceChange(event: any, serviceId: number) {
    this.updateServiceSelection(serviceId, event.target.checked);
  }

  toggleService(serviceId: number) {
    const isCurrentlySelected = this.isServiceSelected(serviceId);
    this.updateServiceSelection(serviceId, !isCurrentlySelected);
  }

  private updateServiceSelection(serviceId: number, isSelected: boolean) {
    const currentIds = [...(this.vetForm.get('serviceIds')?.value || [])] as number[];
    
    if (isSelected && !currentIds.includes(serviceId)) {
      currentIds.push(serviceId);
    } else if (!isSelected && currentIds.includes(serviceId)) {
      const index = currentIds.indexOf(serviceId);
      currentIds.splice(index, 1);
    }
    
    this.vetForm.get('serviceIds')?.setValue(currentIds);
    this.vetForm.get('serviceIds')?.markAsDirty();
  }

  allowOnlyLetters(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ. ]/g, '');
    this.vetForm.get(controlName)?.setValue(sanitizedValue, { emitEvent: false });
  }

  allowOnlyNumbers(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^0-9]/g, '');
    this.vetForm.get(controlName)?.setValue(sanitizedValue, { emitEvent: false });
  }
  
  isFieldInvalid(field: string): boolean {
    const control = this.vetForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  loadVetData(id: number) {
    this.vetService.getVetById(id).subscribe({
      next: (vetData: any) => {
        this.vetForm.patchValue({
          name: vetData.name,
          specialty: vetData.specialty,
          email: vetData.email,
          phone: vetData.phone,
          active: vetData.active !== undefined ? vetData.active : vetData.isActive,
          serviceIds: vetData.serviceIds || [] 
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información del veterinario.',
          confirmButtonColor: '#0C7489'
        });
        this.router.navigate(['/admin/veterinarios']);
      }
    });
  }

  onSubmit() {
    if (this.vetForm.invalid) {
      this.vetForm.markAllAsTouched();
      return;
    }

    const formData = { ...this.vetForm.value };

    formData.isActive = formData.active;

    if (this.isEditMode && this.vetId) {
      delete formData.password;
      delete formData.identificationType;
      delete formData.identificationNumber;
      
      this.vetService.updateVet(this.vetId, formData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Actualizado!',
            text: 'El veterinario se ha actualizado correctamente.',
            confirmButtonColor: '#0C7489',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/admin/veterinarios']);
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al actualizar el veterinario.',
            confirmButtonColor: '#0C7489'
          });
        }
      });
    } else {
      this.isSubmitting = true;
      this.vetService.createVet(formData).subscribe({
        next: () => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'success',
            title: '¡Registrado!',
            text: 'El veterinario ha sido creado exitosamente.',
            confirmButtonColor: '#0C7489',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/admin/veterinarios']);
          });
        },
        error: (err) => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al registrar al veterinario. Verifica los datos.',
            confirmButtonColor: '#0C7489'
          });
        }
      });
    }
  }
}