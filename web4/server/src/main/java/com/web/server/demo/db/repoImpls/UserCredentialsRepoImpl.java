package com.web.server.demo.db.repoImpls;

import com.web.server.demo.db.entity.UserCredentials;
import com.web.server.demo.db.repos.UserCredentialsRepo;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;


import java.util.Optional;

@ApplicationScoped
public class UserCredentialsRepoImpl implements UserCredentialsRepo {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    @Override
    public Optional<UserCredentials> findByUsername(String username) {
        return entityManager.createQuery("SELECT u FROM UserCredentials u WHERE u.username = :username", UserCredentials.class)
                .setParameter("username", username)
                .getResultList()
                .stream()
                .findFirst();

    }

    @Transactional
    @Override
    public void insert(UserCredentials userCredentials) {
        entityManager.persist(userCredentials);
    }

    @Transactional
    @Override
    public void save(UserCredentials userCredentials) {
        entityManager.merge(userCredentials);
    }
}
