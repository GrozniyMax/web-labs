package com.web.server.demo.endpoints;

import com.web.server.demo.beans.PointService;
import com.web.server.demo.dto.RequestDto;
import jakarta.inject.Inject;
import jakarta.servlet.ServletContext;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.experimental.FieldDefaults;

import java.io.File;
import java.io.InputStream;

@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Path("/points")
public class Validation {

    @Inject
    PointService pointService;

    @POST
    @Path("/validate")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response validate(@Valid RequestDto dto,
                             @Context HttpHeaders headers) {
        try {
            return Response.ok(pointService.apply(dto, headers.getHeaderString("Authorization")))
                    .build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}
