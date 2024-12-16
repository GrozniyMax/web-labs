package com.web.server.demo.endpoints;

import com.web.server.demo.beans.JwtUtil;
import com.web.server.demo.db.repos.UserCredentialsRepo;
import com.web.server.demo.dto.CredentialsDto;
import com.web.server.demo.dto.JwtsDto;
import io.jsonwebtoken.JwtException;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.NewCookie;
import jakarta.ws.rs.core.Response;
import lombok.experimental.UtilityClass;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.HexFormat;
import java.util.Optional;


@Path("/auth")
public class AccessControl {


    @Inject
    private UserCredentialsRepo userCredentialsRepo;

    @Inject
    private JwtUtil jwtUtil;


    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response authenticate(CredentialsDto dto) {
        dto.setPassword(dto.getPassword());
        if (userCredentialsRepo.contains(dto.getUsername(), dto.getPassword())) {
            String token = jwtUtil.generateToken(dto.getUsername());
            String refreshToken = jwtUtil.generateToken(dto.getUsername());
            return Response.ok()
                    .header("Access-Control-Allow-Origin", "http://localhost:5173")
                    .header("Access-Control-Allow-Credentials", "true")
                    .header("Access-Control-Allow-Headers",
                            "origin, content-type, accept, authorization")
                    .header("Access-Control-Allow-Methods",
                            "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                    .header("Authorization", "Bearer " + token)
                    .entity(new JwtsDto(token, refreshToken))
                    .build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("Invalid username or password")
                    .build();
        }
    }


    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response register(CredentialsDto dto) {
        System.out.println("Запрос на регистрацию: " + dto);
        if (userCredentialsRepo.contains(dto.getUsername())) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Such user already exists")
                    .build();
        } else {
            userCredentialsRepo.insert(dto.toEntity());
            String token = jwtUtil.generateToken(dto.getUsername());
            String refreshToken = jwtUtil.createRefreshToken(dto.getUsername());
            return Response.ok()
                    .header("Access-Control-Allow-Origin", "http://localhost:5173")
                    .header("Access-Control-Allow-Credentials", "true")
                    .header("Access-Control-Allow-Headers",
                            "origin, content-type, accept, authorization")
                    .header("Access-Control-Allow-Methods",
                            "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                    .header("Authorization", "Bearer " + token)
                    .entity(new JwtsDto(token, refreshToken))
                    .cookie(new NewCookie.Builder("refresh_token")
                            .value(jwtUtil.createRefreshToken(dto.getUsername()))
                            .path("/")
                            .build())
                    .build();
        }
    }

    @GET
    @Path("/refresh")
    @Produces(MediaType.APPLICATION_JSON)
    public Response refresh(@CookieParam("refresh_token") String refreshToken) {
        String username;
        try {
            username = jwtUtil.validateJwt(refreshToken);
        } catch (JwtException e) {
            System.out.println("invalid token");
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("Invalid refresh token")
                    .build();
        }
        String token = jwtUtil.generateToken(username);
        String newRefreshToken = jwtUtil.createRefreshToken(username);
        return Response.ok()
                .header("Authorization", "Bearer " + jwtUtil.generateToken(username))
                .entity(new JwtsDto(token, newRefreshToken))
                .build();
    }

    @POST
    @Path("/logout")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response logout() {
        return Response.ok()
                .header("Authorization", "Bearer ")
                .entity("Authentication successful")
                .cookie(new NewCookie.Builder("refresh_token")
                        .value(jwtUtil.createAlreadyExpiredRefreshToken())
                        .path("/")
                        .build())
                .build();
    }

    @GET
    @Path("/check")
    public Response check() {
        return Response.ok()
                .entity("Authentication successful")
                .header("Authorization", "Bearer ")
                .build();
    }

}
