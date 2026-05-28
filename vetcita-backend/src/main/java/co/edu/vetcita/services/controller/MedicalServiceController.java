package co.edu.vetcita.services.controller;

import co.edu.vetcita.services.dto.MedicalServiceRequest;
import co.edu.vetcita.services.dto.MedicalServiceResponse;
import co.edu.vetcita.services.service.MedicalServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MedicalServiceController {

    private final MedicalServiceService service;

    @GetMapping
    public List<MedicalServiceResponse> getAllServices() {
        return service.getAllServices();
    }

    @GetMapping("/active")
    public List<MedicalServiceResponse> getActiveServices() {
        return service.getActiveServices();
    }

    @GetMapping("/{id}")
    public MedicalServiceResponse getServiceById(@PathVariable Long id) {
        return service.getServiceById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MedicalServiceResponse createService(@RequestBody MedicalServiceRequest request) {
        return service.createService(request);
    }

    @PutMapping("/{id}")
    public MedicalServiceResponse updateService(@PathVariable Long id, @RequestBody MedicalServiceRequest request) {
        return service.updateService(id, request);
    }

    @PatchMapping("/{id}/status")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void toggleServiceStatus(@PathVariable Long id) {
        service.toggleServiceStatus(id);
    }
}
