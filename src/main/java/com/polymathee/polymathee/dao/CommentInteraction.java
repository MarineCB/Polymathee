package com.polymathee.polymathee.dao;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "commentinteraction")
public class CommentInteraction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interaction_id")
    private Integer id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User userId;
    @Column(name = "vote")
    private Boolean vote;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "commentary_id")
    private Commentary commentaryId;




}
