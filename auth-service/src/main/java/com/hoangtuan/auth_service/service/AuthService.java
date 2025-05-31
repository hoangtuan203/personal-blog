package com.hoangtuan.auth_service.service;

import com.hoangtuan.auth_service.dto.request.AuthRequest;
import com.hoangtuan.auth_service.dto.response.AuthResponse;
import com.hoangtuan.auth_service.entities.User;
import com.hoangtuan.auth_service.exception.AppException;
import com.hoangtuan.auth_service.exception.ErrorCode;
import com.hoangtuan.auth_service.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
@Slf4j
@Service
public class AuthService {

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    public record TokenInfo(String token, Date expireTime) {
    }
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public TokenInfo generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        Date issueTime = new Date();
        Date expireTime = new Date(Instant.ofEpochMilli(issueTime.getTime()).plus(2, ChronoUnit.HOURS).toEpochMilli());
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("hoangtuan.com")
                .issueTime(issueTime)
                .expirationTime(expireTime)
                .jwtID(UUID.randomUUID().toString())
                .claim("user_id", user.getId())
                .claim("username", user.getUsername())
                .claim("email", user.getEmail())
                .build();

        JWSObject jwsObject = new JWSObject(header, new Payload(jwtClaimsSet.toJSONObject()));

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return new TokenInfo(jwsObject.serialize(), expireTime);
        } catch (JOSEException e) {
            log.error("cannot create token", e);
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }

    public AuthResponse authenticate(AuthRequest request) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        var user = userRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!authenticated) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        var token = generateToken(user);
        return AuthResponse.builder().token(String.valueOf(token)).build();
    }

//    private String buildScope(User user) {
//        StringJoiner stringJoiner = new StringJoiner("");
//        if (!CollectionUtils.isEmpty(user.getRoles()))
//            user.getRoles().forEach(role -> {
//                stringJoiner.add("ROLE_" + role.getName());
//                if (!CollectionUtils.isEmpty(role.getPermissions()))
//                    role.getPermissions().forEach(permission -> stringJoiner.add(permission.getName()));
//            });
//
//        return stringJoiner.toString();
//
//    }
}
