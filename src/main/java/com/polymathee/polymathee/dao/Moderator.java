package com.polymathee.polymathee.dao;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Moderator")
public class Moderator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "moderator_id")
    private Integer id;
    @Column(name = "moderator_password")
    private String password;
    @Column(name = "moderator_username")
    private String username;


}

