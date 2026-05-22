package co.edu.vetcita.pets.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "pets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "owner_id", nullable = false)
    private Long ownerId; 

    @Column(nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Species species;

    @Column(nullable = false, length = 100)
    private String breed;

    @Column(nullable = false, length = 50)
    private String color;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Column(name = "weight_kg", nullable = false)
    private Double weightKg;

    @Column(name = "is_neutered", nullable = false)
    private Boolean isNeutered;
}
