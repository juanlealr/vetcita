package com.salud.vacunacion.domain;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vaccine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String laboratory;
    private String type;
    private String description;

    @OneToMany(mappedBy = "vaccine", cascade = CascadeType.ALL)
    private List<Dose> doses;

    @OneToMany(mappedBy = "vaccine", cascade = CascadeType.ALL)
    private List<Contraindication> contraindications;

    @ManyToMany
    @JoinTable(
        name = "Vaccine_Disease",
        joinColumns = @JoinColumn(name = "vaccine_id"),
        inverseJoinColumns = @JoinColumn(name = "disease_id")
    )
    private List<Disease> preventedDiseases;
}





