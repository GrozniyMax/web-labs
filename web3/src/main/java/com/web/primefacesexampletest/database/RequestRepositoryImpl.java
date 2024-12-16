package com.web.primefacesexampletest.database;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.stream.Stream;


@ApplicationScoped
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RequestRepositoryImpl implements RequestsRepository {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public Stream<Request> findAll() {
        return entityManager.createQuery("SELECT r FROM Request r", Request.class)
                .getResultStream();
    }


    @Transactional
    @Override
    public void save(Request request) {
        if (request.getId() == null) {
            entityManager.persist(request);
        } else {
            entityManager.merge(request);
        }
    }

    @Override
    public List<Request> findSome(int count) {
        return entityManager.createQuery("SELECT r FROM Request r ORDER BY r.startTime DESC", Request.class)
                .setMaxResults(count)
                .getResultList();
    }

    @Override
    public Stream<Request> findAllHited() {
        return entityManager.createQuery("SELECT r FROM Request r WHERE r.hit = true", Request.class)
                .getResultStream();
    }

    @Override
    public Stream<Request> findAllHitAndR(Float r) {
        return entityManager.createQuery("SELECT r FROM Request r WHERE r.hit = true AND r.r = :radios", Request.class)
                .setParameter("radios", r)
                .getResultStream();
    }
}
