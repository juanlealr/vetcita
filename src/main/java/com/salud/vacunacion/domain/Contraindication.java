package com.salud.vacunacion.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contraindication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private String type;
    private String criterio;

    @ManyToOne
    @JoinColumn(name = "Vaccine_id")
    private Vaccine Vaccine;
}





