package com.salud.vacunacion.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Professional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String specialty;
    private String license;

    @ManyToOne
    @JoinColumn(name = "centro_salud_id")
    private HealthCenter HealthCenter;
}





