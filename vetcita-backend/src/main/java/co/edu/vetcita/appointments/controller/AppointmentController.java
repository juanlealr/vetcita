package co.edu.vetcita.appointments.controller;

import co.edu.vetcita.appointments.dto.AppointmentRequestDTO;
import co.edu.vetcita.appointments.dto.AppointmentResponseDTO;
import co.edu.vetcita.appointments.dto.AppointmentUpdateDTO;
import co.edu.vetcita.appointments.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<AppointmentResponseDTO> createAppointment(
            @RequestBody @Valid AppointmentRequestDTO request,
            @RequestHeader("Authorization") String token) {
        AppointmentResponseDTO response = appointmentService.createAppointment(request, token);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/my-appointments")
    public ResponseEntity<List<AppointmentResponseDTO>> getMyAppointments(
            @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(appointmentService.getMyClientAppointments(token));
    }

    @GetMapping("/available-times")
    public ResponseEntity<List<String>> getAvailableTimes(
            @RequestParam Long vetId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) Long excludeAppointmentId) {
        return ResponseEntity.ok(appointmentService.getAvailableTimes(vetId, date, excludeAppointmentId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentResponseDTO> updateAppointment(
            @PathVariable Long id,
            @RequestBody @Valid AppointmentUpdateDTO updateDTO,
            @RequestHeader("Authorization") String token) {
        updateDTO.setId(id);
        AppointmentResponseDTO response = appointmentService.updateAppointment(updateDTO, token);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelAppointment(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token) {
        appointmentService.cancelAppointment(id, token);
        return ResponseEntity.ok().build();
    }
}