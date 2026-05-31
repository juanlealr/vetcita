package co.edu.vetcita.appointments.controller;

import co.edu.vetcita.appointments.dto.AppointmentResponseDTO;
import co.edu.vetcita.appointments.dto.MedicalRecordDTO;
import co.edu.vetcita.appointments.dto.MedicalRecordRequestDTO;
import co.edu.vetcita.appointments.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vet")
@RequiredArgsConstructor
public class VetAppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping("/appointments")
    public ResponseEntity<List<AppointmentResponseDTO>> getMyAppointments(
            @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByVet(null, token));
    }

    @GetMapping("/appointments/{appointmentId}/medical-record")
    public ResponseEntity<MedicalRecordDTO> getMedicalRecord(
            @PathVariable Long appointmentId,
            @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(appointmentService.getOrCreateMedicalRecord(appointmentId, token));
    }

    @PutMapping("/appointments/{appointmentId}/medical-record")
    public ResponseEntity<MedicalRecordDTO> saveMedicalRecord(
            @PathVariable Long appointmentId,
            @RequestBody MedicalRecordRequestDTO request,
            @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(appointmentService.saveMedicalRecord(appointmentId, request, token));
    }

    @GetMapping("/pets/{petId}/medical-history")
    public ResponseEntity<List<MedicalRecordDTO>> getPetMedicalHistory(
            @PathVariable Long petId,
            @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(appointmentService.getPetMedicalHistory(petId, token));
    }
}