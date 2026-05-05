package com.salud.vacunacion.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VaccinationRecordResponse {
    private Long id;
    private String PatientNombre;
    private String VaccineNombre;
    private String ProfessionalNombre;
    private String HealthCenterNombre;
    private String administeredDose;
    private LocalDate administrationDate;
}





