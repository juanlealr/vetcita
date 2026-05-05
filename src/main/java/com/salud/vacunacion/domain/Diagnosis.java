package com.salud.vacunacion.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Diagnosis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fechaDiagnosis;
    private String status;

    @ManyToOne
    @JoinColumn(name = "Patient_id")
    private Patient Patient;

    @ManyToOne
    @JoinColumn(name = "Disease_id")
    private Disease Disease;
}





