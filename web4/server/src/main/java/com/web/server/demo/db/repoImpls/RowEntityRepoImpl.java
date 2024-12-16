package com.web.server.demo.db.repoImpls;

import com.web.server.demo.db.entity.RowEntity;
import com.web.server.demo.db.entity.UserCredentials;
import com.web.server.demo.db.repos.RowEntityRepo;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class RowEntityRepoImpl implements RowEntityRepo {

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public List<RowEntity> findByUser(UserCredentials user) {
        return entityManager.createQuery("SELECT r FROM RowEntity r WHERE r.user = :user", RowEntity.class)
                .setParameter("user", user)
                .getResultList();
    }

    @Override
    public List<RowEntity> findByUserAndR(UserCredentials user, Double r) {
        return entityManager.createQuery("SELECT r FROM RowEntity r WHERE r.user = :user AND r.r = :r", RowEntity.class)
                .setParameter("user", user)
                .setParameter("r", r)
                .getResultList();
    }

    @Transactional
    @Override
    public void insert(RowEntity entity) {
        entityManager.persist(entity);
    }

    @Transactional
    @Override
    public void save(RowEntity entity) {
        entityManager.merge(entity);
    }
}
