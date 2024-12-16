package com.web.server.demo.dto;

import lombok.Data;

@Data
public class JwtsDto {

    private final String jwts;

    private final String refreshToken;
}
