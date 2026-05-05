package com.salud.vacunacion.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String identification;

    private String name;
    private LocalDate birthDate;
    private String gender;

    @OneToMany(mappedBy = "Patient", cascade = CascadeType.ALL)
    private List<VaccinationRecord> records;

    @OneToMany(mappedBy = "Patient", cascade = CascadeType.ALL)
    private List<Diagnosis> diagnoses;
}





