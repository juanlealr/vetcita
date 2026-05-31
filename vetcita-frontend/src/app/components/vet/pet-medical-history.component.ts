import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VetWorkService } from '../../services/vet-work.service';

@Component({
  selector: 'app-pet-medical-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-6 max-w-4xl mx-auto">
      <div class="flex items-center gap-4 mb-6">
        <a routerLink="/vet/dashboard" class="text-sky-600 hover:text-sky-700">← Volver a mis citas</a>
        <h2 class="text-2xl font-bold text-slate-800">Historial clínico de la mascota</h2>
      </div>

      @if (records.length === 0) {
        <div class="text-center py-10 text-slate-500">No hay registros clínicos para esta mascota.</div>
      } @else {
        <div class="space-y-4">
          @for (rec of records; track rec.id) {
            <div class="bg-white rounded-xl shadow p-4 border-l-4 border-sky-500">
              <p class="font-semibold text-slate-800">Cita: {{ rec.appointmentDate }} {{ rec.appointmentTime }}</p>
              <p class="mt-2"><span class="font-medium">Diagnóstico:</span> {{ rec.diagnosis }}</p>
              <p><span class="font-medium">Tratamiento:</span> {{ rec.treatment }}</p>
              <p><span class="font-medium">Observaciones:</span> {{ rec.observations }}</p>
              <p><span class="font-medium">Notas del veterinario:</span> {{ rec.vetNotes }}</p>
            </div>
          }
        </div>
      }
    </div>
  `
})
export class PetMedicalHistoryComponent implements OnInit {
  records: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private vetWorkService: VetWorkService
  ) {}

  ngOnInit(): void {
    const petId = this.route.snapshot.paramMap.get('petId');
    if (petId) {
      this.vetWorkService.getPetMedicalHistory(+petId).subscribe(data => this.records = data);
    }
  }
}