package com.salud.vacunacion.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dose {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int doseNumber;
    private int recommendedIntervalDays;
    private String description;

    @ManyToOne
    @JoinColumn(name = "Vaccine_id")
    private Vaccine Vaccine;
}





