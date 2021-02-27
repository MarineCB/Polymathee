package com.polymathee.polymathee.dao;

import com.polymathee.polymathee.enums.StateEnum;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "commentary")
public class Commentary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "commentary_id")
    private Integer id;
    @Column(name = "commentary_content")
    private String content;
    @Column(name = "commentary_upvote")
    private Integer upvote;
    @Column(name = "commentary_downvote")
    private Integer downvote;
    @Column(name = "commentary_report")
    private Integer report;
    @Column(name = "commentary_date")
    private Date date;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User userId;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "publication_id", referencedColumnName = "publication_id")
    private Publication publicationId;


}
