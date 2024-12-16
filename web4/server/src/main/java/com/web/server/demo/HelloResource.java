package com.web.server.demo;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.io.InputStream;

@Path("/static")
public class HelloResource {


    @GET
    @Path("/index")
    @Produces(MediaType.TEXT_HTML)
    public Response getIndexPage() {
        // Загрузка файла из ресурсов
        InputStream inputStream = getClass().getResourceAsStream("/webapp/index.html");
        if (inputStream == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("File not found").build();
        }
        return Response.ok(inputStream).build();
    }
}
