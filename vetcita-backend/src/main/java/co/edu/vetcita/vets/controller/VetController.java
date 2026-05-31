package co.edu.vetcita.vets.controller;

import co.edu.vetcita.vets.domain.Vet;
import co.edu.vetcita.vets.repository.VetRepository;
import co.edu.vetcita.vets.VetCreatedEvent;
import co.edu.vetcita.vets.VetStatusChangedEvent;
import co.edu.vetcita.vets.VetUpdatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/vets")
@RequiredArgsConstructor
@CrossOrigin("*")
public class VetController {

    private final VetRepository repository;
    private final ApplicationEventPublisher eventPublisher;

    @GetMapping("/service/{serviceId}")
    public List<Vet> getVetsByService(@PathVariable Long serviceId) {
        return repository.findVetsByServiceId(serviceId);
    }

    @GetMapping
    public List<Vet> getAllVets() {
        return repository.findAll();
    }

    @PatchMapping("/{id}/toggle-status")
    @Transactional
    public Vet toggleVetStatus(@PathVariable Long id) {
        Vet vet = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Veterinario no encontrado"));
        
        vet.setIsActive(!vet.getIsActive());
        Vet savedVet = repository.save(vet);

        eventPublisher.publishEvent(new VetStatusChangedEvent(
            vet.getEmail(), 
            vet.getIsActive()
        ));
        
        return savedVet;
    }

    @GetMapping("/{id}")
    public Vet getVetById(@PathVariable Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Veterinario no encontrado con el ID: " + id));
    }

    @PostMapping
    @Transactional 
    public Vet createVet(@RequestBody Vet vet) {
        Vet savedVet = repository.save(vet);
        
        String[] nameParts = vet.getName().split(" ", 2);
        String firstName = nameParts[0];
        String lastName = (nameParts.length > 1) ? nameParts[1] : "Veterinario";

        eventPublisher.publishEvent(new VetCreatedEvent(
            firstName,
            lastName,
            vet.getEmail(),
            vet.getPhone(),
            vet.getPassword(),
            vet.getIdentificationType(),
            vet.getIdentificationNumber()
        ));

        return savedVet;
    }

    @PutMapping("/{id}")
    @Transactional
    public Vet updateVet(@PathVariable Long id, @RequestBody Vet vetDetails) {
        Vet vet = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Veterinario no encontrado"));

        vet.setName(vetDetails.getName());
        vet.setSpecialty(vetDetails.getSpecialty());
        vet.setPhone(vetDetails.getPhone());
        vet.setEmail(vetDetails.getEmail());
        vet.setIsActive(vetDetails.getIsActive());

        Vet updatedVet = repository.save(vet);

        eventPublisher.publishEvent(new VetUpdatedEvent(
            vet.getEmail(), 
            vet.getIsActive(),
            vet.getPhone()
        ));

        return updatedVet;
    }
}
