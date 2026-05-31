import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VetWorkService } from '../../services/vet-work.service';
import { ModalService } from '../../services/modal.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medical-record-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex justify-center items-center z-50 transition-all" (click)="close()">
      <div class="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl border border-gray-100 animate-fadeIn" (click)="$event.stopPropagation()">
        
        <div class="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
          <h2 class="text-2xl font-bold text-gray-800">📋 Historial clínico</h2>
          <button (click)="close()" class="text-gray-400 hover:text-gray-600 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        @if (loading) {
          <div class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600"></div>
          </div>
        } @else {
          <div class="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">🩺 Diagnóstico</label>
              <textarea [(ngModel)]="record.diagnosis" rows="3" class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"></textarea>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">💊 Tratamiento / Medicación</label>
              <textarea [(ngModel)]="record.treatment" rows="3" class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"></textarea>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">📝 Observaciones generales</label>
              <textarea [(ngModel)]="record.observations" rows="3" class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"></textarea>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">👨‍⚕️ Notas del veterinario</label>
              <textarea [(ngModel)]="record.vetNotes" rows="2" class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"></textarea>
            </div>
          </div>
        }

        <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
          <button (click)="close()" class="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition">
            Cancelar
          </button>
          <button (click)="save()" [disabled]="saving" class="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold shadow-md transition disabled:opacity-50">
            {{ saving ? 'Guardando...' : 'Guardar cambios' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-fadeIn {
      animation: fadeIn 0.2s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `]
})
export class MedicalRecordModalComponent implements OnInit {
  @Input() appointmentId!: number;
  @Output() closed = new EventEmitter<void>();
  record = { diagnosis: '', treatment: '', observations: '', vetNotes: '' };
  loading = true;
  saving = false;

  constructor(
    private vetWorkService: VetWorkService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.vetWorkService.getMedicalRecord(this.appointmentId).subscribe({
      next: (data) => {
        this.record = data;
        this.loading = false;
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar el historial', 'error');
        this.loading = false;
      }
    });
  }

  save(): void {
    this.saving = true;
    this.vetWorkService.saveMedicalRecord(this.appointmentId, this.record).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Historial clínico guardado', 'success');
        this.close();
      },
      error: () => {
        Swal.fire('Error', 'No se pudo guardar', 'error');
        this.saving = false;
      }
    });
  }

  close(): void {
    this.modalService.close();
    this.closed.emit();
  }
}