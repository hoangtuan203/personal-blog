package com.hoangtuan.auth_service.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hoangtuan.auth_service.dto.request.AuthRequest;
import com.hoangtuan.auth_service.dto.response.AuthResponse;
import com.hoangtuan.auth_service.entities.User;
import com.hoangtuan.auth_service.exception.AppException;
import com.hoangtuan.auth_service.exception.ErrorCode;
import com.hoangtuan.auth_service.repository.UserRepository;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;

import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
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
        log.info("authenticate request: {}", request);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        var user = userRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
//        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
//        if (!authenticated) {
//            throw new AppException(ErrorCode.UNAUTHENTICATED);
//        }
        var userId = user.getId();
        var username = user.getUsername();
        var email = user.getEmail();
        var token = generateToken(user);

        return AuthResponse.builder()
                .userId(userId)
                .token(String.valueOf(token.token))
                .email(email)
                .userName(username)
                .expiryTime(token.expireTime)
                .authenticated(true)
                .build();
    }
    //decode token


}
