package co.edu.vetcita.pets.controller;

import co.edu.vetcita.pets.dto.PetRequestDTO;
import co.edu.vetcita.pets.dto.PetResponseDTO;
import co.edu.vetcita.pets.service.PetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;

    @PostMapping
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<PetResponseDTO> registerPet(
            @RequestAttribute("userId") Long ownerId, 
            @Valid @RequestBody PetRequestDTO request) {
        
        return new ResponseEntity<>(petService.registerPet(ownerId, request), HttpStatus.CREATED);
    }

    @GetMapping("/my-pets")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<List<PetResponseDTO>> getMyPets(@RequestAttribute("userId") Long ownerId) {

        return ResponseEntity.ok(petService.getMyPets(ownerId));
    }
}
