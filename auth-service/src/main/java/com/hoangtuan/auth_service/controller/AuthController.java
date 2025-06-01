package com.hoangtuan.auth_service.controller;

import com.hoangtuan.auth_service.dto.request.ApiResponse;
import com.hoangtuan.auth_service.dto.request.AuthRequest;
import com.hoangtuan.auth_service.dto.response.AuthResponse;
import com.hoangtuan.auth_service.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @PostMapping("/token")
    ApiResponse<AuthResponse> authenticate(@RequestBody AuthRequest request) {
        var result = authService.authenticate(request);
        return ApiResponse.<AuthResponse>builder().result(result).build();
    }

    @GetMapping("/test")
    public String test() {
        return "test";
    }

}
