package com.salud.vacunacion.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VaccinationRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate administrationDate;
    private String administeredDose;

    @ManyToOne
    @JoinColumn(name = "Patient_id", nullable = false)
    private Patient Patient;

    @ManyToOne
    @JoinColumn(name = "Vaccine_id", nullable = false)
    private Vaccine Vaccine;

    @ManyToOne
    @JoinColumn(name = "Professional_id", nullable = false)
    private Professional Professional;

    @ManyToOne
    @JoinColumn(name = "centro_salud_id", nullable = false)
    private HealthCenter HealthCenter;
}





