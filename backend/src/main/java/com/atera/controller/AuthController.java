package com.atera.controller;

import com.atera.dto.ApiResponse;
import com.atera.dto.auth.LoginRequest;
import com.atera.dto.auth.LoginResponse;
import com.atera.dto.auth.RegisterRequest;
import com.atera.entity.User;
import com.atera.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    
    /**
     * POST /api/v1/auth/login
     * Public endpoint - Login with username and password
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Đăng nhập thành công", response));
    }
    
    /**
     * POST /api/v1/auth/register
     * Public endpoint - Register new user
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<LoginResponse.UserInfo>> register(@Valid @RequestBody RegisterRequest request) {
        User user = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success(
                "Đăng ký thành công", 
                LoginResponse.UserInfo.fromUser(user)
        ));
    }
    
    /**
     * POST /api/v1/auth/refresh
     * Refresh JWT token (requires valid token)
     */
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<String>> refreshToken() {
        // TODO: Implement token refresh logic
        return ResponseEntity.ok(ApiResponse.success("Token refreshed", null));
    }
}
