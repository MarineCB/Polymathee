package com.polymathee.polymathee.dao;

import com.polymathee.polymathee.enums.RoleEnum;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer id;
    @Column(name = "user_name")
    private String name;
    @Column(name = "user_email")
    private String email;
    @Column(name = "user_role")
    private String role;
}
