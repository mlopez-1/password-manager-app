package dev.mlopez.password_manager_backend.controller;

import dev.mlopez.password_manager_backend.entity.User;
import dev.mlopez.password_manager_backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public User register(@RequestBody RegistrationRequest request) {
        return authService.register(request.username(), request.masterPassword());
    }

    record RegistrationRequest(String username, String masterPassword) {}
}