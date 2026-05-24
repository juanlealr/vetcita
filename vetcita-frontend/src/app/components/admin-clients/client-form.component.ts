import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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
              <input type="text" formControlName="firstName" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-sky-400 focus:bg-white transition" placeholder="Ej. Juan">
              <span *ngIf="clientForm.get('firstName')?.invalid && clientForm.get('firstName')?.touched" class="text-xs text-red-500">El nombre es requerido</span>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-sm font-semibold text-slate-700">Apellidos *</label>
              <input type="text" formControlName="lastName" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-sky-400 focus:bg-white transition" placeholder="Ej. Pérez">
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-sm font-semibold text-slate-700">Tipo de Documento *</label>
              <select formControlName="identificationType" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-sky-400 focus:bg-white transition text-slate-700">
                <option value="" disabled>Seleccione una opción</option>
                <option value="CC">Cédula de Ciudadanía (CC)</option>
                <option value="CE">Cédula de Extranjería (CE)</option>
                <option value="TI">Tarjeta de Identidad (TI)</option>
                <option value="PASSPORT">Pasaporte</option>
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-sm font-semibold text-slate-700">Número de Documento *</label>
              <input type="text" formControlName="identificationNumber" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-sky-400 focus:bg-white transition" placeholder="Ej. 10456789">
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-sm font-semibold text-slate-700">Correo Electrónico *</label>
              <input type="email" formControlName="email" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-sky-400 focus:bg-white transition" placeholder="ejemplo@correo.com">
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-sm font-semibold text-slate-700">Teléfono *</label>
              <input type="text" formControlName="phone" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-sky-400 focus:bg-white transition" placeholder="Ej. 300 123 4567">
            </div>
            
            <div *ngIf="isEditMode" class="flex flex-col gap-1 md:col-span-2">
              <label class="text-sm font-semibold text-slate-700">Estado de la cuenta</label>
              <div class="flex items-center gap-2 mt-2">
                <input type="checkbox" formControlName="active" id="activeState" class="w-5 h-5 text-sky-500 rounded border-slate-300 focus:ring-sky-500">
                <label for="activeState" class="text-slate-600">El cliente está activo y puede iniciar sesión</label>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <a routerLink="/admin/clientes" class="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition cursor-pointer">
              Cancelar
            </a>
            <button type="submit" [disabled]="clientForm.invalid" class="bg-[#20b2aa] hover:bg-[#1c9c95] disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition shadow-sm">
              {{ isEditMode ? 'Guardar Cambios' : 'Registrar Cliente' }}
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Inicializamos el formulario con validaciones
    this.clientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      identificationType: ['', Validators.required],
      identificationNumber: ['', [Validators.required, Validators.pattern('^[0-9A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9 ]+$')]],
      active: [true] // Por defecto activo al crear
    });
  }

  ngOnInit(): void {
    // Revisamos si en la URL viene un parámetro 'id'
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.clientId = +id;
        this.loadClientData(this.clientId);
      }
    });
  }

  loadClientData(id: number) {
    // Aquí llamarías a tu UserService para obtener los datos del cliente
    // this.userService.getClientById(id).subscribe(...)
    
    // Simulación de carga de datos para llenar el formulario en modo edición
    const mockData = {
      firstName: 'Juan',
      lastName: 'Perez',
      identificationType: 'CC',
      identificationNumber: '10456789',
      email: 'juan.perez@email.com',
      phone: '3001234567',
      active: true
    };
    
    this.clientForm.patchValue(mockData);
  }

  onSubmit() {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched(); // Marca todos para mostrar errores
      return;
    }

    const formData = this.clientForm.value;

    if (this.isEditMode) {
      console.log('Actualizando cliente con ID:', this.clientId, formData);
      // this.userService.updateClient(this.clientId, formData).subscribe(...)
    } else {
      // Nota: Al backend probablemente debas enviarle un password temporal
      // o el backend debería generarlo y enviarlo por correo.
      console.log('Creando nuevo cliente:', formData);
      // this.userService.createClient(formData).subscribe(...)
    }

    // Redirigimos a la tabla después de guardar
    // this.router.navigate(['/admin/clientes']);
    alert(this.isEditMode ? 'Cliente actualizado (Mock)' : 'Cliente creado (Mock)');
  }
}