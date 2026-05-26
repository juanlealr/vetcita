package co.edu.vetcita.users.controller;

import co.edu.vetcita.users.domain.Role;
import co.edu.vetcita.users.domain.User;
import co.edu.vetcita.users.dto.ChangePasswordDTO;
import co.edu.vetcita.users.dto.CreateClientRequestDTO;
import co.edu.vetcita.users.dto.UpdateProfileDTO;
import co.edu.vetcita.users.dto.UserProfileDTO;
import co.edu.vetcita.users.service.ProfileService;
import co.edu.vetcita.pets.PetModuleApi; 

import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final PetModuleApi petModuleApi;

    @GetMapping("/me")
    public ResponseEntity<UserProfileDTO> me(@AuthenticationPrincipal User currentUser) {
        var user = profileService.getByEmail(currentUser.getEmail());
        return ResponseEntity.ok(UserProfileDTO.from(user)); 
    }

    @PutMapping("/me")
    public ResponseEntity<UserProfileDTO> updateMe(
            @AuthenticationPrincipal User currentUser,
            @RequestBody UpdateProfileDTO dto
    ) {
        var updated = profileService.updateProfile(currentUser.getId(), dto);
        return ResponseEntity.ok(UserProfileDTO.from(updated));
    }

    @PostMapping("/me/change-password")
    public ResponseEntity<String> changePassword(
            @AuthenticationPrincipal User currentUser,
            @RequestBody ChangePasswordDTO dto
    ) {
        profileService.changePassword(currentUser.getId(), dto.getNewPassword());
        return ResponseEntity.ok("Contraseña actualizada correctamente");
    }

    @GetMapping
    public ResponseEntity<List<UserProfileDTO>> getAllUsers(
            @RequestParam(required = false) Role role
    ) {
        List<User> users = profileService.getUsersByRole(role);
        
        List<UserProfileDTO> response = users.stream()
                .map(user -> {
                    int totalPets = petModuleApi.countPetsByOwnerId(user.getId());
                    return UserProfileDTO.from(user, totalPets); 
                })
                .collect(Collectors.toList());
                
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfileDTO> getUserById(@PathVariable Long id) {
        User user = profileService.getById(id);
        
        int totalPets = petModuleApi.countPetsByOwnerId(user.getId());
        
        return ResponseEntity.ok(UserProfileDTO.from(user, totalPets));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProfileDTO> updateUserById(
            @PathVariable Long id,
            @RequestBody UpdateProfileDTO dto
    ) {
        User updated = profileService.updateProfile(id, dto);
        return ResponseEntity.ok(UserProfileDTO.from(updated));
    }

    @PostMapping("/clients")
    public ResponseEntity<UserProfileDTO> createClient(@RequestBody CreateClientRequestDTO dto) {
        User newClient = profileService.createClient(dto);
        return ResponseEntity.ok(UserProfileDTO.from(newClient));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> toggleUserStatus(@PathVariable Long id) {
        profileService.toggleUserStatus(id);
        return ResponseEntity.ok().build();
    }
}
