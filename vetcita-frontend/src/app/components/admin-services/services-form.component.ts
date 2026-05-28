import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MedicalServiceService } from '../../services/medical-service.service';

@Component({
  selector: 'app-services-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
      <h1 class="text-2xl font-bold text-slate-800 mb-2">{{ isEditMode ? 'Editar' : 'Nuevo' }} Servicio</h1>
      <p class="text-sm text-slate-500 mb-6">Por favor, completa los campos del servicio. Los campos marcados con (*) son obligatorios.</p>
      
      <form [formGroup]="serviceForm" (ngSubmit)="onSubmit()" class="space-y-5">
        
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1">Nombre del Servicio *</label>
          <input 
            type="text" 
            formControlName="name" 
            [class.border-rose-400]="isFieldInvalid('name')"
            [class.focus:border-rose-400]="isFieldInvalid('name')"
            class="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 focus:outline-none focus:border-sky-400 text-sm transition-colors"
            placeholder="Ej. Consulta General Veterinaria">
          
          <div *ngIf="isFieldInvalid('name')" class="text-rose-500 text-xs mt-1 flex items-center gap-1 font-medium animate-fadeIn">
            <span *ngIf="serviceForm.get('name')?.errors?.['required']">⚠ El nombre es obligatorio.</span>
            <span *ngIf="serviceForm.get('name')?.errors?.['pattern']">⚠ Prohibido: El nombre solo puede contener letras y espacios (sin números ni caracteres especiales).</span>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1">Descripción *</label>
          <textarea 
            formControlName="description" 
            rows="3" 
            [class.border-rose-400]="isFieldInvalid('description')"
            [class.focus:border-rose-400]="isFieldInvalid('description')"
            class="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 focus:outline-none focus:border-sky-400 text-sm transition-colors"
            placeholder="Describe brevemente de qué trata el servicio médico..."></textarea>
          
          <div *ngIf="isFieldInvalid('description')" class="text-rose-500 text-xs mt-1 font-medium">
            ⚠ La descripción es obligatoria para informar al cliente.
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Precio ($) *</label>
            <input 
              type="number" 
              formControlName="price" 
              min="0"
              [class.border-rose-400]="isFieldInvalid('price')"
              [class.focus:border-rose-400]="isFieldInvalid('price')"
              class="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 focus:outline-none focus:border-sky-400 text-sm transition-colors">
            
            <div *ngIf="isFieldInvalid('price')" class="text-rose-500 text-xs mt-1 flex flex-col gap-0.5 font-medium">
              <span *ngIf="serviceForm.get('price')?.errors?.['required']">⚠ El precio es obligatorio.</span>
              <span *ngIf="serviceForm.get('price')?.errors?.['min']">⚠ El precio no puede ser un número negativo.</span>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Duración Mínima (minutos) *</label>
            <input 
              type="number" 
              formControlName="estimatedDurationMinutes" 
              min="5"
              [class.border-rose-400]="isFieldInvalid('estimatedDurationMinutes')"
              [class.focus:border-rose-400]="isFieldInvalid('estimatedDurationMinutes')"
              class="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 focus:outline-none focus:border-sky-400 text-sm transition-colors">
            
            <div *ngIf="isFieldInvalid('estimatedDurationMinutes')" class="text-rose-500 text-xs mt-1 flex flex-col gap-0.5 font-medium">
              <span *ngIf="serviceForm.get('estimatedDurationMinutes')?.errors?.['required']">⚠ La duración es obligatoria.</span>
              <span *ngIf="serviceForm.get('estimatedDurationMinutes')?.errors?.['min']">⚠ La duración mínima permitida es de 5 minutos.</span>
            </div>
          </div>

        </div>

        <div class="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
          <a routerLink="/admin/servicios" class="px-6 py-3 rounded-full font-semibold text-slate-500 hover:bg-slate-100 transition cursor-pointer">
            Cancelar
          </a>
          <button 
            type="submit" 
            [disabled]="isLoading" 
            class="bg-[#0C7489] hover:bg-[#095b6b] disabled:opacity-50 text-white px-6 py-3 rounded-full font-semibold transition shadow-md flex items-center gap-2 cursor-pointer">
            <span *ngIf="isLoading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            {{ isLoading ? 'Guardando...' : 'Guardar Servicio' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class ServicesFormComponent implements OnInit {
  serviceForm: FormGroup;
  isEditMode = false;
  serviceId?: number;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private medicalService: MedicalServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.serviceForm = this.fb.group({
      name: ['', [
        Validators.required, 
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      estimatedDurationMinutes: [30, [Validators.required, Validators.min(5)]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.serviceId = +id;
        this.loadServiceData();
      }
    });
  }

  loadServiceData() {
    this.medicalService.getServiceById(this.serviceId!).subscribe(data => {
      this.serviceForm.patchValue(data);
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.serviceForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      Swal.fire({
        title: 'Formulario Incompleto',
        text: 'Por favor revisa los campos en rojo antes de guardar el servicio.',
        icon: 'error',
        confirmButtonColor: '#0C7489'
      });
      return;
    }
    
    this.isLoading = true;
    const formData = this.serviceForm.value;

    const request$ = this.isEditMode 
      ? this.medicalService.updateService(this.serviceId!, formData)
      : this.medicalService.createService(formData);

    request$.subscribe({
      next: () => {
        Swal.fire({
          title: '¡Éxito!',
          text: `Servicio ${this.isEditMode ? 'actualizado' : 'creado'} correctamente`,
          icon: 'success',
          confirmButtonColor: '#0C7489'
        });
        this.router.navigate(['/admin/servicios']);
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un problema en el servidor al intentar guardar.',
          icon: 'error',
          confirmButtonColor: '#0C7489'
        });
        this.isLoading = false;
      }
    });
  }
}