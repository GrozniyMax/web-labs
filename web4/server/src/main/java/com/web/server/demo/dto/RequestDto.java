package com.web.server.demo.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class RequestDto {

    Double x;
    Double y;
    Double r;

    @JsonCreator
    public RequestDto(
            @JsonProperty("x") @Max(3) @Min(5) @NonNull Double x,
            @JsonProperty("y") @Max(3) @Min(5) @NonNull Double y,
            @JsonProperty("r") @Max(4) @Min(1) @NonNull Double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
}
