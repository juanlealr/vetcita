package co.edu.vetcita.services.service;

import co.edu.vetcita.services.domain.MedicalService;
import co.edu.vetcita.services.dto.MedicalServiceRequest;
import co.edu.vetcita.services.dto.MedicalServiceResponse;
import co.edu.vetcita.services.repository.MedicalServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicalServiceService {

    private final MedicalServiceRepository repository;

    public List<MedicalServiceResponse> getAllServices() {
        return repository.findAll().stream()
            .map(this::mapToResponse)
            .collect(Collectors.toList());
    }

    public List<MedicalServiceResponse> getActiveServices() {
        return repository.findByIsActiveTrue().stream()
            .map(this::mapToResponse)
            .collect(Collectors.toList());
    }

    public MedicalServiceResponse getServiceById(Long id) {
        MedicalService service = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado"));
        return mapToResponse(service);
    }

    public MedicalServiceResponse createService(MedicalServiceRequest request) {
        MedicalService service = MedicalService.builder()
                .name(request.name())
                .description(request.description())
                .price(request.price())
                .estimatedDurationMinutes(request.estimatedDurationMinutes())
                .isActive(true)
                .build();
        return mapToResponse(repository.save(service));
    }

    public MedicalServiceResponse updateService(Long id, MedicalServiceRequest request) {
        MedicalService service = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado"));
        
        service.setName(request.name());
        service.setDescription(request.description());
        service.setPrice(request.price());
        service.setEstimatedDurationMinutes(request.estimatedDurationMinutes());
        
        return mapToResponse(repository.save(service));
    }

    public void toggleServiceStatus(Long id) {
        MedicalService service = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado"));
        service.setActive(!service.isActive());
        repository.save(service);
    }

    private MedicalServiceResponse mapToResponse(MedicalService service) {
        return new MedicalServiceResponse(
                service.getId(),
                service.getName(),
                service.getDescription(),
                service.getPrice(),
                service.getEstimatedDurationMinutes(),
                service.isActive()
        );
    }
}
