package com.web.server.demo.db.entity;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.*;
import lombok.*;


@Setter
@Getter
@Entity
public class RowEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "x", nullable = false, updatable = false)
    private Double x;

    @Column(name = "y", nullable = false, updatable = false)
    private Double y;

    @Column(name = "r", nullable = false, updatable = false)
    private Double r;

    @Column(name = "hit", nullable = false, updatable = false)
    private Boolean hit;

    @ManyToOne
    private UserCredentials user;


}
