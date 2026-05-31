package co.edu.vetcita.users;

import co.edu.vetcita.users.service.ProfileService;
import co.edu.vetcita.vets.VetCreatedEvent;
import co.edu.vetcita.vets.VetStatusChangedEvent;
import co.edu.vetcita.vets.VetUpdatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class VetModuleEventListener {

    private final ProfileService profileService;

    @ApplicationModuleListener
    public void onVetCreated(VetCreatedEvent event) {
        System.out.println("✅ Evento recibido: Creando cuenta de usuario para Vet -> " + event.email());
        profileService.createVetAccount(
            event.firstName(),
            event.lastName(),
            event.email(),
            event.phone(),
            event.password(),
            event.identificationType(),
            event.identificationNumber()
        );
    }

    @ApplicationModuleListener
    public void onVetStatusChanged(VetStatusChangedEvent event) {
        System.out.println("🔄 Evento recibido: Actualizando estado de Vet -> " + event.email());
        profileService.updateUserStatusByEmail(event.email(), event.isActive());
    }

    @ApplicationModuleListener
    public void onVetUpdated(VetUpdatedEvent event) {
        System.out.println("📝 Evento recibido: Actualizando perfil de Vet -> " + event.email());
        profileService.updateUserDetailsByEmail(event.email(), event.phone(), event.isActive());
    }
}