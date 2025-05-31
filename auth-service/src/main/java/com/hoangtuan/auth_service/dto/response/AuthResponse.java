package com.hoangtuan.auth_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthResponse {
    Long userId;
    String token;
    Date expiryTime;
    String userName;
    String email;
    boolean authenticated;
}
