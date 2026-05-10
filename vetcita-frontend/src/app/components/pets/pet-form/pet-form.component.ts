import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-xl mx-auto bg-sky-100 p-8 rounded-3xl shadow-lg border-2 border-sky-400">
      
      <div class="bg-white rounded-2xl p-4 mb-6 flex justify-center border border-sky-200 shadow-sm">
        <img src="/assets/images/vet-cita-logo.png" alt="Vet Cita" class="h-20">
      </div>

      <h2 class="text-2xl font-bold text-center text-slate-800 mb-6 drop-shadow-sm">Registrar una mascota</h2>

      <form [formGroup]="petForm" (ngSubmit)="onSubmit()" class="space-y-4">
        
        <div>
          <input type="text" formControlName="name" placeholder="🦴 Nombre de la mascota" 
                 class="w-full px-5 py-3 rounded-full border border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500">
          <span *ngIf="isInvalid('name')" class="text-xs text-rose-500 ml-4 mt-1 block">El nombre es requerido.</span>
        </div>

        <div class="flex items-center gap-6 px-4">
          <span class="text-sm font-semibold text-slate-700">Género de la mascota:</span>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" formControlName="gender" value="MACHO" class="text-sky-600 focus:ring-sky-500"> Macho
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" formControlName="gender" value="HEMBRA" class="text-sky-600 focus:ring-sky-500"> Hembra
          </label>
        </div>

        <div>
          <select formControlName="species" class="w-full px-5 py-3 rounded-full border border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white">
            <option value="" disabled>Tipo de mascota</option>
            <option value="CANINO">Perro (Canino)</option>
            <option value="FELINO">Gato (Felino)</option>
            <option value="AVE">Ave</option>
            <option value="OTRO">Otro</option>
          </select>
          <span *ngIf="isInvalid('species')" class="text-xs text-rose-500 ml-4 mt-1 block">Selecciona un tipo.</span>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <input type="text" formControlName="breed" placeholder="Raza" class="w-full px-5 py-3 rounded-full border border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-center">
          <input type="text" formControlName="color" placeholder="Color" class="w-full px-5 py-3 rounded-full border border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-center">
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-600 ml-4 mb-1">Fecha Nacimiento (Aprox)</label>
            <input type="date" formControlName="birthDate" class="w-full px-5 py-3 rounded-full border border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500">
          </div>
          <div>
             <label class="block text-xs font-semibold text-slate-600 ml-4 mb-1">Peso actual (Kg)</label>
             <input type="number" formControlName="weightKg" placeholder="Ej: 15.5" class="w-full px-5 py-3 rounded-full border border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500">
          </div>
        </div>

        <div class="px-4 flex items-center gap-2">
           <input type="checkbox" formControlName="isNeutered" id="neutered" class="rounded text-sky-600 focus:ring-sky-500">
           <label for="neutered" class="text-sm font-semibold text-slate-700 cursor-pointer">¿La mascota está castrada/esterilizada?</label>
        </div>

        <button type="submit" [disabled]="petForm.invalid" 
                class="w-full mt-6 bg-[#6FBDF5] hover:bg-sky-400 text-slate-800 font-bold py-3 rounded-full shadow-md border-2 border-[#5AA8E0] transition disabled:opacity-50 disabled:cursor-not-allowed">
          Registrar mascota
        </button>

      </form>
    </div>
  `,
  styles: []
})
export class PetFormComponent {
  petForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.petForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['MACHO', Validators.required],
      species: ['', Validators.required],
      breed: ['', Validators.required],
      color: ['', Validators.required],
      birthDate: ['', Validators.required],
      weightKg: ['', [Validators.required, Validators.min(0.1)]],
      isNeutered: [false]
    });
  }

  isInvalid(field: string) {
    const control = this.petForm.get(field);
    return control?.invalid && (control?.dirty || control?.touched);
  }

  onSubmit() {
    if (this.petForm.valid) {
      console.log('Datos listos para enviar al backend:', this.petForm.value);
      // Aquí inyectarías this.petService.registerPet(this.petForm.value).subscribe(...)
    }
  }
}