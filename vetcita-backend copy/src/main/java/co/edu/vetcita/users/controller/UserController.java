package co.edu.vetcita.users.controller;

import co.edu.vetcita.users.dto.UpdateUserRequestDTO;
import co.edu.vetcita.users.dto.UserResponseDTO;
import co.edu.vetcita.users.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getCurrentUser(Authentication authentication) {
        return ResponseEntity.ok(userService.getCurrentUser(authentication.getName()));
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponseDTO> updateCurrentUser(
            Authentication authentication,
            @RequestBody UpdateUserRequestDTO request
    ) {
        return ResponseEntity.ok(userService.updateCurrentUser(authentication.getName(), request));
    }
}
