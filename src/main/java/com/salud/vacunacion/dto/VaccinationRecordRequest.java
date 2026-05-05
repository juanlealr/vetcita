package com.salud.vacunacion.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VaccinationRecordRequest {
    private Long patientId;
    private Long vaccineId;
    private Long professionalId;
    private Long healthCenterId;
    private String administeredDose;
    private LocalDate administrationDate;
}





