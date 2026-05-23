package co.edu.vetcita.users.controller;

import co.edu.vetcita.users.domain.User;
import co.edu.vetcita.users.dto.ChangePasswordDTO;
import co.edu.vetcita.users.dto.UpdateProfileDTO;
import co.edu.vetcita.users.dto.UserProfileDTO;
import co.edu.vetcita.users.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

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
}
