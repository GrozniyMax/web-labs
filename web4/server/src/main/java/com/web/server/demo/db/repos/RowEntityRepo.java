package com.web.server.demo.db.repos;


import com.web.server.demo.db.entity.RowEntity;
import com.web.server.demo.db.entity.UserCredentials;
import jakarta.data.repository.CrudRepository;
import jakarta.data.repository.Repository;

import java.util.List;

@Repository
public interface RowEntityRepo {

    List<RowEntity> findByUser(UserCredentials user);

    List<RowEntity> findByUserAndR(UserCredentials user, Double r);

    void insert(RowEntity entity);

    void save(RowEntity entity);
}
