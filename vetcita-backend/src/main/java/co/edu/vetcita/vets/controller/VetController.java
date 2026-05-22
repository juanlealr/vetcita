package co.edu.vetcita.vets.controller;

import co.edu.vetcita.vets.domain.Vet;
import co.edu.vetcita.vets.repository.VetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/vets")
@RequiredArgsConstructor
@CrossOrigin("*")
public class VetController {

    private final VetRepository repository;

    @GetMapping("/service/{serviceId}")
    public List<Vet> getVetsByService(@PathVariable Long serviceId) {
        return repository.findVetsByServiceId(serviceId);
    }
}
