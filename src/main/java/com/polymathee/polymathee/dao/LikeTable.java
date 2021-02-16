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
    @Column(name = "like_post")
    private String likePost;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User userId;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "publication_id")
    private Publication publicationId;
}
