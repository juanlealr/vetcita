package com.salud.vacunacion.controller;

import com.salud.vacunacion.dto.VaccinationRecordRequest;
import com.salud.vacunacion.dto.VaccinationRecordResponse;
import com.salud.vacunacion.exception.ContraindicationException;
import com.salud.vacunacion.service.VaccinationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vaccination-records")
@RequiredArgsConstructor
public class VaccinationController {

    private final VaccinationService vaccinationService;

    @PostMapping
    public ResponseEntity<?> registerVaccination(@RequestBody VaccinationRecordRequest request) {
        try {
            VaccinationRecordResponse response = vaccinationService.registerVaccination(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (ContraindicationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/Patient/{id}")
    public ResponseEntity<?> getPatientHistory(@PathVariable Long id) {
        return ResponseEntity.ok(vaccinationService.getPatientHistory(id));
    }
}





