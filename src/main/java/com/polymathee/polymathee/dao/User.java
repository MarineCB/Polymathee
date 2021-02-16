package com.polymathee.polymathee.dao;

import com.polymathee.polymathee.enums.RoleEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Data
@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    @Column(name = "user_id")
    private Integer id;
    @Column(name = "user_name")
    private String name;
    @Column(name = "user_email")
    private String email;
    @Enumerated(EnumType.STRING)
    @Column(name = "user_role")
    private RoleEnum role;
}
