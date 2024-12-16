package com.web.server.demo.beans;

import com.web.server.demo.db.repos.UserCredentialsRepo;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.Id;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@ApplicationScoped
public class JwtUtil {
    private final String SECRET_KEY = "lolypoplolypopolalylolypoppudumtumpumpumlolypop";
    private final long ACCESS_TOKEN_EXPIRATION = 15 * 60 * 1000; // 15 минут
    private final long REFRESH_TOKEN_EXPIRATION = 7 * 24 * 60 * 60 * 1000; // 1 неделя

    @Inject
    private UserCredentialsRepo userCredentialsRepo;


    public String generateToken(String username) {
        System.out.println("Generating token for " + username);
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public  String validateToken(String token) {
        System.out.println("Validating token: " + token);
        try {
            Claims claims =  Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            // Проверка срока действия токена (если он есть)
            if (claims.getExpiration().before(new java.util.Date())) {
                System.out.println("Токен истек");
                throw new JwtException("Invalid token");
            }

            if (!userCredentialsRepo.contains(claims.getSubject())) {
                System.out.println("Пользователь не найден");
                throw new JwtException("Invalid token");
            }

            // Токен валиден, если подпись верна и срок действия не истек
            return claims.getSubject();
        } catch (SignatureException e) {
            System.out.println("Ошибка в подписи токена");
            throw new JwtException("Invalid token");
        } catch (Exception e) {
            System.out.println("Ошибка проверки токена: " + e.getMessage());
            throw new JwtException("Invalid token");
        }
    }




    public String validateJwt(String token) throws JwtException {
        return validateToken(token);
    }

    // Метод для создания refresh токена
    public String createRefreshToken(String username) {
        System.out.println("Generating refresh token for " + username);
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public String createAlreadyExpiredRefreshToken() {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", "");
        claims.put("active", true);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject("")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() - 1000))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }


    public String validateTokenHeader(String header) {
        if (header == null || !header.startsWith("Bearer ")) {
            System.out.println("Неверный формат токена");
            throw new JwtException("Invalid token");
        }
        return validateJwt(header.substring(7));
    }

}
