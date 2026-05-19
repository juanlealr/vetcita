package co.edu.vetcita; // Ajusta a tu paquete raíz

import org.junit.jupiter.api.Test;
import org.springframework.modulith.core.ApplicationModules;
import org.springframework.modulith.docs.Documenter;

class ModulithVerificationTest {

    private final ApplicationModules modules = ApplicationModules.of(VetcitaApplication.class);

    @Test
    void verifyModularStructure() {
        modules.verify();
    }

    @Test
    void writeDocumentation() {
        new Documenter(modules)
                .writeModulesAsPlantUml()
                .writeIndividualModulesAsPlantUml();
    }
}
