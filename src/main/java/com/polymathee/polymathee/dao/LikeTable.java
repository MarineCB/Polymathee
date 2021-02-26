package com.polymathee.polymathee.dao;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "liketable")
public class LikeTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Integer id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User userId;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "publication_id", referencedColumnName = "publication_id")
    private Publication publicationId;
}
