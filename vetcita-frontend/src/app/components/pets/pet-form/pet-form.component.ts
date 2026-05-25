import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router'; // <-- Añadido ActivatedRoute
import { PetService } from '../../../services/pet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="max-w-4xl mx-auto">
      
      <div class="flex items-center gap-4 mb-8">
        <a [routerLink]="returnUrl" 
           class="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </a>
        <div>
          <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
            Registrar Mascota 🐾
          </h1>
          <p class="text-slate-500 mt-1">Completa los datos para añadir un nuevo integrante.</p>
        </div>
      </div>

      <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <form [formGroup]="petForm" (ngSubmit)="onSubmit()" class="space-y-6">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-1">
              <label class="block text-sm font-semibold text-slate-700">Nombre de la mascota *</label>
              <input type="text" formControlName="name" placeholder="Ej: Simba"
                     [class.border-rose-500]="isInvalid('name')"
                     class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition bg-slate-50 focus:bg-white">
              <span *ngIf="isInvalid('name')" class="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
                ⚠️ {{ getErrorMessage('name') }}
              </span>
            </div>

            <div class="space-y-1">
              <label class="block text-sm font-semibold text-slate-700">Tipo de mascota *</label>
              <select formControlName="species" 
                      [class.border-rose-500]="isInvalid('species')"
                      class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition bg-slate-50 focus:bg-white">
                <option value="" disabled selected>Selecciona un tipo...</option>
                <option value="CANINO">Perro (Canino)</option>
                <option value="FELINO">Gato (Felino)</option>
                <option value="AVE">Ave</option>
                <option value="OTRO">Otro</option>
              </select>
              <span *ngIf="isInvalid('species')" class="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
                ⚠️ Selecciona el tipo de mascota.
              </span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-1">
              <label class="block text-sm font-semibold text-slate-700">Raza *</label>
              <input type="text" formControlName="breed" placeholder="Ej: Golden Retriever"
                     [class.border-rose-500]="isInvalid('breed')"
                     class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition bg-slate-50 focus:bg-white">
              <span *ngIf="isInvalid('breed')" class="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
                ⚠️ {{ getErrorMessage('breed') }}
              </span>
            </div>

            <div class="space-y-1">
              <label class="block text-sm font-semibold text-slate-700">Color *</label>
              <input type="text" formControlName="color" placeholder="Ej: Blanco con manchas negras"
                     [class.border-rose-500]="isInvalid('color')"
                     class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition bg-slate-50 focus:bg-white">
              <span *ngIf="isInvalid('color')" class="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
                ⚠️ {{ getErrorMessage('color') }}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-slate-700">Género *</label>
              <div class="flex items-center gap-4 mt-2">
                <label class="flex items-center gap-2 cursor-pointer p-2 border border-slate-200 rounded-lg flex-1 hover:bg-sky-50 transition">
                  <input type="radio" formControlName="gender" value="MACHO" class="text-sky-600 focus:ring-sky-500 w-4 h-4"> 
                  <span class="text-sm font-medium text-slate-700">Macho</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer p-2 border border-slate-200 rounded-lg flex-1 hover:bg-rose-50 transition">
                  <input type="radio" formControlName="gender" value="HEMBRA" class="text-rose-500 focus:ring-rose-500 w-4 h-4"> 
                  <span class="text-sm font-medium text-slate-700">Hembra</span>
                </label>
              </div>
            </div>

            <div class="space-y-1">
              <label class="block text-sm font-semibold text-slate-700">Fecha Nacimiento (Aprox) *</label>
              <input type="date" formControlName="birthDate" [max]="maxDate"
                     [class.border-rose-500]="isInvalid('birthDate')"
                     class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition bg-slate-50 focus:bg-white text-slate-600">
              <span *ngIf="isInvalid('birthDate')" class="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
                ⚠️ Fecha inválida.
              </span>
            </div>

            <div class="space-y-1">
               <label class="block text-sm font-semibold text-slate-700">Peso actual (Kg) *</label>
               <input type="number" step="0.1" formControlName="weightKg" placeholder="Ej: 15.5"
                      [class.border-rose-500]="isInvalid('weightKg')"
                      class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition bg-slate-50 focus:bg-white">
               <span *ngIf="isInvalid('weightKg')" class="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
                 ⚠️ {{ getErrorMessage('weightKg') }}
               </span>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-100">
            <label class="flex items-center gap-3 cursor-pointer group w-fit">
               <div class="relative flex items-center justify-center">
                 <input type="checkbox" formControlName="isNeutered" class="peer appearance-none w-6 h-6 border-2 border-slate-300 rounded-md checked:bg-[#0C7489] checked:border-[#0C7489] transition">
                 <svg class="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
               </div>
               <span class="text-sm font-semibold text-slate-700 group-hover:text-[#0C7489] transition">¿La mascota está castrada/esterilizada?</span>
            </label>
          </div>

          <div class="pt-6">
            <button type="submit" [disabled]="petForm.invalid || isSubmitting" 
                    class="w-full md:w-auto md:min-w-62.5 float-right bg-[#0C7489] hover:bg-[#11B0C8] text-white font-bold py-3 px-8 rounded-xl shadow-md transition disabled:opacity-50 disabled:bg-slate-300 disabled:cursor-not-allowed">
              {{ isSubmitting ? 'Registrando...' : 'Guardar Mascota' }}
            </button>
            <div class="clear-both"></div>
          </div>

        </form>
      </div>
    </div>
  `
})
export class PetFormComponent implements OnInit {
  petForm: FormGroup;
  maxDate: string = '';
  isSubmitting = false;

  clientId: number | null = null;
  returnUrl: any[] = ['/client/mascotas'];

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const lettersOnly = '^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$';

    this.petForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(lettersOnly), Validators.minLength(2)]],
      gender: ['MACHO', Validators.required],
      species: ['', Validators.required],
      breed: ['', [Validators.required, Validators.pattern(lettersOnly)]],
      color: ['', [Validators.required, Validators.pattern(lettersOnly)]],
      birthDate: ['', Validators.required],
      weightKg: ['', [Validators.required, Validators.min(0.1), Validators.max(200)]],
      isNeutered: [false]
    });
  }

  ngOnInit() {
    this.maxDate = new Date().toISOString().split('T')[0];

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.clientId = +id;
        this.returnUrl = ['/admin/clientes', this.clientId];
      }
    });
  }

  isInvalid(field: string): boolean {
    const control = this.petForm.get(field);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  getErrorMessage(field: string): string {
    const control = this.petForm.get(field);
    if (!control) return '';
    if (control.hasError('required')) return 'Este campo es obligatorio.';
    if (control.hasError('pattern')) return 'Solo se permiten letras.';
    if (control.hasError('minlength')) return 'Debe tener al menos 2 caracteres.';
    if (control.hasError('min')) return 'El peso debe ser mayor a 0.';
    if (control.hasError('max')) return 'Verifica el peso ingresado.';
    return '';
  }

  onSubmit() {
    if (this.petForm.invalid) {
      this.petForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    
    const request$ = this.clientId 
      ? this.petService.registerPetForClient(this.clientId, this.petForm.value)
      : this.petService.registerPet(this.petForm.value);
    
    request$.subscribe({
      next: (response) => {
        this.isSubmitting = false;
        
        Swal.fire({
          icon: 'success',
          title: '¡Mascota registrada!',
          text: 'Los datos se han guardado correctamente.',
          confirmButtonColor: '#0C7489'
        }).then(() => {
          this.router.navigate(this.returnUrl); 
        });
      },
      error: (error) => {
        this.isSubmitting = false;
        
        if (error.status === 409) {
          Swal.fire({
            icon: 'warning',
            title: 'Mascota duplicada',
            text: error.error?.message || 'Esta mascota ya se encuentra registrada.',
            confirmButtonColor: '#0C7489'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '¡Ups!',
            text: 'Hubo un error al guardar la mascota. Por favor, intenta de nuevo.',
            confirmButtonColor: '#d33'
          });
        }
      }
    });
  }
}