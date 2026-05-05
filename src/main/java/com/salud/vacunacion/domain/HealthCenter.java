package com.salud.vacunacion.domain;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HealthCenter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private String careLevel;

    @OneToMany(mappedBy = "HealthCenter")
    private List<Professional> Professionales;
}





