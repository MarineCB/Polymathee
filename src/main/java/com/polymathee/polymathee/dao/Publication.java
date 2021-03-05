package com.polymathee.polymathee.dao;

import com.polymathee.polymathee.enums.StateEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "publication")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Publication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    @Column(name = "publication_id")
    private Integer id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User userId;
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
    private Integer report;
    @Column(name = "publication_date")
    private Date date;

}
