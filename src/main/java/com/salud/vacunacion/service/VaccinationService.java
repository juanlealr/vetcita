package com.salud.vacunacion.service;

import com.salud.vacunacion.domain.*;
import com.salud.vacunacion.dto.*;
import com.salud.vacunacion.exception.ContraindicationException;
import com.salud.vacunacion.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VaccinationService {

    private final PatientRepository PatientRepository;
    private final VaccineRepository VaccineRepository;
    private final ProfessionalRepository ProfessionalRepository;
    private final HealthCenterRepository HealthCenterRepository;
    private final VaccinationRecordRepository registroRepository;

    @Transactional
    public VaccinationRecordResponse registerVaccination(VaccinationRecordRequest request) {
        Patient Patient = PatientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Vaccine Vaccine = VaccineRepository.findById(request.getVaccineId())
                .orElseThrow(() -> new RuntimeException("Vaccine not found"));

        Professional Professional = ProfessionalRepository.findById(request.getProfessionalId())
                .orElseThrow(() -> new RuntimeException("Professional not found"));

        HealthCenter centro = HealthCenterRepository.findById(request.getHealthCenterId())
                .orElseThrow(() -> new RuntimeException("Health center not found"));

        verifyContraindications(Patient, Vaccine);

        VaccinationRecord registro = new VaccinationRecord();
        registro.setPatient(Patient);
        registro.setVaccine(Vaccine);
        registro.setProfessional(Professional);
        registro.setHealthCenter(centro);
        registro.setAdministeredDose(request.getAdministeredDose());
        registro.setAdministrationDate(request.getAdministrationDate());

        VaccinationRecord guardado = registroRepository.save(registro);

        return toResponse(guardado);
    }

    private void verifyContraindications(Patient Patient, Vaccine Vaccine) {
        List<Contraindication> contraindications = Vaccine.getcontraindications();
        List<Diagnosis> diagnoses = Patient.getdiagnoses();

        for (Contraindication c : contraindications) {
            if ("enfermedad_preexistente".equals(c.getTipo())) {
                boolean tieneDisease = diagnoses.stream()
                        .anyMatch(d -> "activo".equals(d.getEstado())
                                && d.getDisease().getName().equalsIgnoreCase(c.getCriterio()));
                if (tieneDisease) {
                    throw new ContraindicationException(
                            "The patient has an active contraindication: " + c.getdescription());
                }
            }
        }
    }

    public List<VaccinationRecord> getgetPatientHistory(Long patientId) {
        return registroRepository.findByPatientId(patientId);
    }

    private VaccinationRecordResponse toResponse(VaccinationRecord r) {
        return new VaccinationRecordResponse(
                r.getId(),
                r.getPatient().getName(),
                r.getVaccine().getName(),
                r.getProfessional().getName(),
                r.getHealthCenter().getName(),
                r.getAdministeredDose(),
                r.getAdministrationDate()
        );
    }
}





