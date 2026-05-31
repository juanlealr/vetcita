import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ModalData { appointmentId: number; }

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalSource = new Subject<ModalData | null>();
  modalState$ = this.modalSource.asObservable();
  open(data: ModalData) { this.modalSource.next(data); }
  close() { this.modalSource.next(null); }
}