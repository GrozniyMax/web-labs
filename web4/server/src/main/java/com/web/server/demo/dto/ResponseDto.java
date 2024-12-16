package com.web.server.demo.dto;

import lombok.Data;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class ResponseDto {

    @NonNull
    RequestDto requestDto;

    @NonNull
    boolean result;
}
