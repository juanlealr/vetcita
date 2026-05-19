package co.edu.vetcita.vets.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "vets")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Vet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String specialty;

    private String phone;
    private String email;

    @Column(nullable = false)
    private boolean isActive;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "vet_services", 
        joinColumns = @JoinColumn(name = "vet_id")
    )
    @Column(name = "service_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<Long> serviceIds = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.isActive = true;
    }
}