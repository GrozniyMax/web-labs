package com.web.server.demo.beans;

import com.web.server.demo.db.entity.RowEntity;
import com.web.server.demo.db.repos.RowEntityRepo;
import com.web.server.demo.db.repos.UserCredentialsRepo;
import com.web.server.demo.dto.RequestDto;
import com.web.server.demo.dto.ResponseDto;
import io.jsonwebtoken.JwtException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.Id;
import jakarta.ws.rs.InternalServerErrorException;

@ApplicationScoped
public class PointService {

    @Inject
    UserCredentialsRepo userCredentialsRepo;

    @Inject
    RowEntityRepo rowEntityRepo;

    @Inject
    JwtUtil jwtUtil;

    @Inject
    PointValidator pointValidator;


    public ResponseDto apply(RequestDto dto, String header) {
        try {
            System.out.println("Applying point: " + dto);
            String username = jwtUtil.validateTokenHeader(header);
            System.out.println("Username: " + username);
            var user = userCredentialsRepo.findByUsername(username)
                    .orElseThrow(() -> {
                        System.out.println("User not found");
                        return new IllegalArgumentException("User not found");
                    });

            var entity = new RowEntity();
            entity.setX(dto.getX());
            entity.setY(dto.getY());
            entity.setR(dto.getR());
            entity.setHit(pointValidator.validate(dto.getX(), dto.getY(), dto.getR()));
            entity.setUser(user);

            rowEntityRepo.insert(entity);

            return new ResponseDto(dto, entity.getHit());
        }catch (JwtException|IllegalArgumentException e){
            throw new IllegalArgumentException("Invalid token");
        } catch (Exception e) {
            System.out.println("Got exception: " + e);
            throw new InternalServerErrorException(e);
        }
    }
}
