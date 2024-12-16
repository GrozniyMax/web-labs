package com.web.server.demo.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.web.server.demo.db.entity.UserCredentials;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
public class CredentialsDto {

    @NonNull
    @JsonProperty("username")
    private String username;

    @NonNull
    @JsonProperty("password")
    private String password;


    @JsonCreator
    public CredentialsDto(
            @JsonProperty("username") @NonNull String username,
            @JsonProperty("password") @NonNull String password) {
        this.username = username;
        this.password = password;
    }

    public UserCredentials toEntity() {
        UserCredentials userCredentials = new UserCredentials();
        userCredentials.setUsername(username);
        userCredentials.setPassword(password);
        return userCredentials;
    }

}
