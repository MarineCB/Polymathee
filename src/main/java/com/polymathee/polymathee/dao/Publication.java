package com.polymathee.polymathee.dao;


import com.polymathee.polymathee.enums.StateEnum;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "publication")
public class Publication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "publication_id")
    private Integer id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User User_id;
    @Column(name = "publication_title")
    private String title;
    @Column(name = "publication_content")
    private String content;
    @Column(name = "publication_file")
    private String file;
    @Column(name = "publication_like_number")
    private Integer likeNumber;
    @Column(name = "publication_download_number")
    private Integer downloadNumber;
    @Enumerated(EnumType.STRING)
    @Column(name = "publication_status")
    private StateEnum status;
    @Column(name = "publication_tags")
    private String tags;
    @Column(name = "publication_report")
    private String report;

}
