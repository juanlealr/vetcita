package co.edu.vetcita.services;

import co.edu.vetcita.services.repository.MedicalServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MedicalServiceModuleApi {

    private final MedicalServiceRepository serviceRepository;

    public String getServiceName(Long id) {
        return serviceRepository.findById(id)
                .map(service -> service.getName())
                .orElse("Servicio no disponible");
    }
}
