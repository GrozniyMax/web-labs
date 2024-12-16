package com.web.server.demo.db.repos;

import com.web.server.demo.db.entity.UserCredentials;
import jakarta.data.repository.BasicRepository;
import jakarta.data.repository.CrudRepository;
import jakarta.data.repository.Repository;

import java.util.Optional;

@Repository
public interface UserCredentialsRepo {

    Optional<UserCredentials> findByUsername(String username);

    void insert(UserCredentials userCredentials);

    void save(UserCredentials userCredentials);

    default Boolean contains(UserCredentials userCredentials) {
        return this.findByUsername(userCredentials.getUsername())
                .map(userCredentials1 ->
                        userCredentials1.getPassword().equals(userCredentials.getPassword()))
                .orElse(false);
    }

    default Boolean contains(String username, String password) {
        return this.findByUsername(username)
                .map(userCredentials1 ->
                        userCredentials1.getPassword().equals(password))
                .orElse(false);
    }

    default Boolean contains(String username) {
        System.out.println("Checking if user exists "+username);
        Optional<UserCredentials> userCredentials = this.findByUsername(username);
        System.out.println("User exists: "+userCredentials);
        return userCredentials.isPresent();
//        return this.findByUsername(username).isPresent();
    }
}
