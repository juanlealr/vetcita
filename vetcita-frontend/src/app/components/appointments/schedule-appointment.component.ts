import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { PetService, Pet } from '../../services/pet.service';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-schedule-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="p-6 max-w-4xl mx-auto">
      
      <div class="mb-8 rounded-[20px] bg-white p-4 shadow-sm border border-slate-100 flex items-center gap-4 relative">
        <button (click)="goToAppointments()" class="absolute left-4 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors" title="Volver a Mis Citas">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <div class="ml-14 flex items-center gap-4">
          <img src="/assets/images/logo.png" alt="Vet Cita" class="h-16 object-contain" onerror="this.src='https://via.placeholder.com/150x50?text=VET+CITA'"/>
          <h1 class="text-2xl font-bold text-slate-800">Agendar nueva cita</h1>
        </div>
      </div>

      <div class="bg-white rounded-[20px] shadow-md border border-slate-200 overflow-hidden">
        
        <div class="bg-[#0e7490] px-6 py-3 flex justify-between items-center text-white">
          <span class="font-medium flex items-center gap-2">
            <button *ngIf="currentStep > 1" (click)="prevStep()" class="hover:bg-white/20 p-1.5 rounded-full transition-colors flex items-center justify-center" title="Paso anterior">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            Paso {{ currentStep }} de 3: 
            <ng-container [ngSwitch]="currentStep">
              <span *ngSwitchCase="1">Selección de Mascota</span>
              <span *ngSwitchCase="2">Detalles del Servicio</span>
              <span *ngSwitchCase="3">Confirmación</span>
            </ng-container>
          </span>
        </div>

        <div class="p-6 md:p-8 bg-slate-50">
          <form [formGroup]="appointmentForm">

            <div *ngIf="currentStep === 1" class="animate-fade-in">
              <h2 class="text-xl font-semibold text-slate-800 mb-6">¿Qué mascota tomará la cita?</h2>
              
              <div *ngIf="isLoadingPets" class="text-center py-8 text-slate-500 font-medium">
                Cargando tus mascotas...
              </div>

              <div *ngIf="!isLoadingPets && myPets.length === 0" class="text-center py-8 text-slate-500 font-medium bg-white rounded-xl border border-slate-200">
                Aún no tienes mascotas registradas. <br>
                <button routerLink="/client/mascotas/nueva" class="mt-4 text-[#0ea5e9] underline hover:text-[#0284c7]">Registrar una mascota</button>
              </div>

              <div *ngIf="!isLoadingPets && myPets.length > 0" class="space-y-4">
                <label *ngFor="let pet of myPets" 
                       class="flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200"
                       [class.border-[#0ea5e9]]="appointmentForm.get('petId')?.value === pet.id"
                       [class.bg-sky-50]="appointmentForm.get('petId')?.value === pet.id"
                       [class.border-slate-200]="appointmentForm.get('petId')?.value !== pet.id"
                       [class.bg-white]="appointmentForm.get('petId')?.value !== pet.id">
                  <input type="radio" formControlName="petId" [value]="pet.id" class="w-5 h-5 text-[#0ea5e9] focus:ring-[#0ea5e9]">
                  <div class="ml-4">
                    <p class="font-bold text-slate-800 text-lg">{{ pet.name }} <span class="text-sm font-normal text-slate-500">({{ pet.species }})</span></p>
                    <p class="text-sm text-slate-600">Raza: {{ pet.breed }} | Edad: {{ calculateAge(pet.birthDate) }}</p>
                  </div>
                </label>
              </div>

              <div class="mt-8 flex justify-between items-center border-t border-slate-200 pt-6">
                <button type="button" (click)="goToAppointments()" class="text-slate-500 hover:text-rose-600 font-semibold transition-colors px-4 py-2">
                  Cancelar
                </button>
                <button type="button" (click)="nextStep()" [disabled]="!appointmentForm.get('petId')?.value"
                        class="bg-[#0ea5e9] hover:bg-[#0284c7] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-full transition-colors">
                  Siguiente →
                </button>
              </div>
            </div>

            <div *ngIf="currentStep === 2" class="animate-fade-in">
              <h2 class="text-xl font-semibold text-slate-800 mb-6">Detalles del Servicio</h2>

              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2">1. ¿Qué servicio necesitas?</label>
                  <select formControlName="serviceId" class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 focus:border-[#0ea5e9] focus:ring-2 focus:ring-sky-200 outline-none">
                    <option value="" disabled selected>Seleccione un servicio</option>
                    <option *ngFor="let s of availableServices" [value]="s.id">{{ s.name }}</option>
                  </select>
                </div>

                <div [class.opacity-50]="!appointmentForm.get('serviceId')?.value">
                  <label class="block text-sm font-medium text-slate-700 mb-2">2. Selecciona el médico veterinario</label>
                  <div class="relative">
                    <select formControlName="vetId" class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-12 text-slate-700 focus:border-[#0ea5e9] focus:ring-2 focus:ring-sky-200 outline-none appearance-none">
                      <option value="" disabled selected>
                        {{ appointmentForm.get('serviceId')?.value ? 'Seleccione un médico' : 'Primero selecciona un servicio' }}
                      </option>
                      <option *ngFor="let vet of availableVets" [value]="vet.id">DR. {{ vet.name }} - {{ vet.specialty }}</option>
                    </select>
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                    </span>
                  </div>
                </div>

                <div [class.opacity-50]="!appointmentForm.get('vetId')?.value">
                  <label class="block text-sm font-medium text-slate-700 mb-2">3. Selecciona fecha y hora</label>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-xl border border-slate-200">
                    <div>
                      <input type="date" formControlName="date" [min]="minDate"
                             class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 focus:border-[#0ea5e9] focus:ring-2 focus:ring-sky-200 outline-none">
                    </div>
                    
                    <div class="grid grid-cols-3 gap-3" *ngIf="appointmentForm.get('date')?.value && appointmentForm.get('vetId')?.value">
                      <div *ngIf="isLoadingTimes" class="col-span-3 text-sm text-slate-500 text-center">Calculando disponibilidad...</div>
                      <div *ngIf="!isLoadingTimes && availableTimes.length === 0" class="col-span-3 text-sm text-rose-500 text-center">No hay horas disponibles este día.</div>
                      
                      <button type="button" *ngFor="let time of availableTimes"
                        (click)="selectTime(time)"
                        class="py-2 px-2 rounded-lg text-sm font-medium transition-colors border"
                        [class.bg-[#0e7490]]="appointmentForm.get('time')?.value === time"
                        [class.text-white]="appointmentForm.get('time')?.value === time"
                        [class.border-[#0e7490]]="appointmentForm.get('time')?.value === time"
                        [class.bg-slate-100]="appointmentForm.get('time')?.value !== time"
                        [class.text-slate-700]="appointmentForm.get('time')?.value !== time"
                        [class.hover:bg-slate-200]="appointmentForm.get('time')?.value !== time">
                        {{ time }}
                      </button>
                    </div>
                    <div *ngIf="!appointmentForm.get('date')?.value || !appointmentForm.get('vetId')?.value" class="text-sm text-slate-500 flex items-center justify-center h-full text-center">
                      Selecciona un médico y una fecha para ver las horas.
                    </div>
                  </div>
                </div>

              </div>

              <div class="mt-8 flex justify-between items-center border-t border-slate-200 pt-6">
                <button type="button" (click)="goToAppointments()" class="text-slate-500 hover:text-rose-600 font-semibold transition-colors px-4 py-2">
                  Cancelar
                </button>
                <button type="button" (click)="nextStep()" [disabled]="!isStep2Valid()"
                        class="bg-[#0ea5e9] hover:bg-[#0284c7] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-full transition-colors">
                  Siguiente →
                </button>
              </div>
            </div>

            <div *ngIf="currentStep === 3" class="animate-fade-in">
              <h2 class="text-xl font-semibold text-slate-800 mb-6">3. Confirmar Cita</h2>

              <div class="bg-slate-200/50 rounded-xl p-6 space-y-4">
                <div class="border-b border-slate-300 pb-4">
                  <p class="text-sm text-slate-600 font-medium">Vas a agendar una cita para el servicio de:</p>
                  <p class="text-lg font-bold text-slate-800">{{ getSelectedServiceName() }}</p>
                </div>

                <div class="border-b border-slate-300 pb-4">
                  <p class="text-sm text-slate-600 font-medium">Médico Veterinario que atenderá a tu mascota ({{ getSelectedPetName() }}):</p>
                  <div class="flex items-center gap-3 mt-2">
                    <div class="bg-[#0e7490] p-2 rounded-full text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                    </div>
                    <div>
                      <p class="font-bold text-slate-800 text-lg">DR. {{ getSelectedVetName() }}</p>
                    </div>
                  </div>
                </div>

                <div class="border-b border-slate-300 pb-4">
                  <p class="text-sm text-slate-600 font-medium mb-2">Día y Hora de la cita:</p>
                  <div class="flex gap-4">
                    <span class="bg-[#0e7490] text-white px-4 py-2 rounded-lg font-medium">{{ appointmentForm.get('date')?.value }}</span>
                    <span class="bg-[#0e7490] text-white px-4 py-2 rounded-lg font-medium">{{ appointmentForm.get('time')?.value }}</span>
                  </div>
                </div>
              </div>

              <div class="mt-8 flex justify-between items-center border-t border-slate-200 pt-6">
                <button type="button" (click)="goToAppointments()" class="text-slate-500 hover:text-rose-600 font-semibold transition-colors px-4 py-2">
                  Cancelar
                </button>
                <button type="button" (click)="confirmAppointment()" [disabled]="loading"
                        class="bg-[#0e7490] hover:bg-cyan-800 disabled:bg-slate-400 text-white font-bold py-3 px-12 rounded-full transition-colors shadow-lg">
                  {{ loading ? 'Procesando...' : 'Confirmar Cita' }}
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.3s ease-in-out; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ScheduleAppointmentComponent implements OnInit, OnDestroy {
  appointmentForm: FormGroup;
  currentStep = 1;
  
  loading = false;
  isLoadingPets = true;
  isLoadingTimes = false;

  minDate: string;
  myPets: Pet[] = [];
  
  availableServices: any[] = [];
  availableVets: any[] = [];
  availableTimes: string[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private petService: PetService,
    private appointmentService: AppointmentService,
    private cdr: ChangeDetectorRef 
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.appointmentForm = this.fb.group({
      petId: ['', Validators.required],
      serviceId: ['', Validators.required],
      vetId: [{value: '', disabled: true}, Validators.required],
      date: [{value: '', disabled: true}, Validators.required],
      time: ['', Validators.required]
    });
  }

  filterValidTimesForToday(times: string[], selectedDate: string): string[] {
    const today = new Date();
    
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;

    if (selectedDate !== todayString) {
      return times; 
    }

    const currentHour = today.getHours();
    const currentMinutes = today.getMinutes();
    const minAllowedMinutes = (currentHour * 60) + currentMinutes + 120;

    return times.filter(time => {
      const [hours, minutes] = time.split(':').map(Number);
      const timeInMinutes = (hours * 60) + minutes;
      
      return timeInMinutes >= minAllowedMinutes;
    });
  }

  ngOnInit(): void {
    this.loadMyPets();
    this.loadServices();
    this.setupFormListeners();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadMyPets() {
    this.isLoadingPets = true;
    this.petService.getMyPets().subscribe({
      next: (pets) => {
        this.myPets = pets;
        this.isLoadingPets = false;
        this.cdr.detectChanges(); 
      },
      error: () => {
        this.isLoadingPets = false;
        this.cdr.detectChanges();
        Swal.fire('Error', 'No se pudieron cargar tus mascotas.', 'error');
      }
    });
  }

  loadServices() {
    this.appointmentService.getServices().subscribe({
      next: (services) => {
        this.availableServices = services;
        this.cdr.detectChanges();
      },
      error: () => console.error('Error cargando servicios')
    });
  }

  setupFormListeners() {
    const sIdControl = this.appointmentForm.get('serviceId');
    const vIdControl = this.appointmentForm.get('vetId');
    const dateControl = this.appointmentForm.get('date');
    const timeControl = this.appointmentForm.get('time');

    this.subscriptions.add(
      sIdControl?.valueChanges.subscribe(serviceId => {
        vIdControl?.setValue('');
        vIdControl?.enable();
        dateControl?.setValue('');
        dateControl?.disable();
        timeControl?.setValue('');
        this.availableVets = [];
        this.availableTimes = [];
        
        this.cdr.detectChanges();
        
        if (serviceId) {
          this.appointmentService.getVetsByService(serviceId).subscribe({
            next: (vets) => {
              this.availableVets = vets;
              this.cdr.detectChanges();
            },
            error: () => this.cdr.detectChanges()
          });
        }
      })
    );

    this.subscriptions.add(
      vIdControl?.valueChanges.subscribe(vetId => {
        dateControl?.setValue('');
        timeControl?.setValue('');
        this.availableTimes = [];
        
        if (vetId) {
          dateControl?.enable();
        } else {
          dateControl?.disable();
        }
        this.cdr.detectChanges();
      })
    );

    this.subscriptions.add(
      dateControl?.valueChanges.subscribe(date => {
        timeControl?.setValue('');
        const vetId = vIdControl?.value;
        
        if (date && vetId) {
          this.isLoadingTimes = true;
          this.cdr.detectChanges();
          
          this.appointmentService.getAvailableTimes(vetId, date).subscribe({
            next: (times) => {
              this.availableTimes = this.filterValidTimesForToday(times, date);
              
              this.isLoadingTimes = false;
              this.cdr.detectChanges();
            },
            error: () => {
              this.isLoadingTimes = false;
              this.availableTimes = [];
              this.cdr.detectChanges();
            }
          });
        }
      })
    );
  }

  selectTime(time: string) {
    this.appointmentForm.patchValue({ time: time });
    this.cdr.detectChanges();
  }

  calculateAge(birthDate: string): string {
    if (!birthDate) return 'Desconocida';
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    if (age === 0) {
      let months = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
      return `${months} meses`;
    }
    return `${age} años`;
  }

  nextStep() {
    if (this.currentStep < 3) this.currentStep++;
    this.cdr.detectChanges();
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
    this.cdr.detectChanges();
  }

  goToAppointments() {
    this.router.navigate(['/client/citas']);
  }

  isStep2Valid(): boolean {
    const f = this.appointmentForm;
    return !!(f.get('serviceId')?.value && f.get('vetId')?.value && f.get('date')?.value && f.get('time')?.value);
  }

  getSelectedPetName(): string {
    const id = this.appointmentForm.get('petId')?.value;
    return this.myPets.find(p => p.id === id)?.name || '';
  }

  getSelectedVetName(): string {
    const id = Number(this.appointmentForm.get('vetId')?.value);
    return this.availableVets.find(v => v.id === id)?.name || '';
  }

  getSelectedServiceName(): string {
    const id = Number(this.appointmentForm.get('serviceId')?.value);
    return this.availableServices.find(s => s.id === id)?.name || '';
  }

  confirmAppointment() {
    this.loading = true;
    this.cdr.detectChanges();
    const formData = this.appointmentForm.getRawValue(); 
    
    this.appointmentService.createAppointment(formData).subscribe({
      next: () => {
        this.loading = false;
        this.cdr.detectChanges();
        Swal.fire({
          icon: 'success',
          title: '¡Cita Agendada!',
          text: 'Tu cita ha sido confirmada con éxito.',
          confirmButtonColor: '#0e7490'
        }).then(() => this.goToAppointments());
      },
      error: (error) => {
        this.loading = false;
        this.cdr.detectChanges();
        const errorMessage = error.error?.message || 'No se pudo agendar la cita. Intenta más tarde.';
        
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
          confirmButtonColor: '#0e7490'
        });
      }
    });
  }
}