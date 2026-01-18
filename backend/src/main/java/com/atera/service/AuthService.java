package com.atera.service;

import com.atera.dto.auth.LoginRequest;
import com.atera.dto.auth.LoginResponse;
import com.atera.dto.auth.RegisterRequest;
import com.atera.entity.User;
import com.atera.repository.UserRepository;
import com.atera.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    
    @Transactional
    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        
        String token = jwtTokenProvider.generateToken(authentication);
        User user = (User) authentication.getPrincipal();
        
        log.info("User {} logged in successfully", user.getUsername());
        
        return LoginResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .expiresIn(jwtTokenProvider.getExpirationTime())
                .user(LoginResponse.UserInfo.fromUser(user))
                .build();
    }
    
    @Transactional
    public User register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .role(User.Role.USER)
                .isActive(true)
                .build();
        
        User savedUser = userRepository.save(user);
        log.info("New user registered: {}", savedUser.getUsername());
        
        return savedUser;
    }
    
    @Transactional
    public User registerAdmin(RegisterRequest request) {
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .role(User.Role.ADMIN)
                .isActive(true)
                .build();
        
        return userRepository.save(user);
    }
}
