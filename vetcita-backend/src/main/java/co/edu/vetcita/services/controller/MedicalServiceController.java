package co.edu.vetcita.services.controller;

import co.edu.vetcita.services.domain.MedicalService;
import co.edu.vetcita.services.repository.MedicalServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MedicalServiceController {

    private final MedicalServiceRepository repository;

    @GetMapping
    public List<MedicalService> getActiveServices() {
        return repository.findByIsActiveTrue();
    }
}
