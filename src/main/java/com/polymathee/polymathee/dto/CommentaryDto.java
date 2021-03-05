package com.polymathee.polymathee.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommentaryDto implements Serializable {

    @JsonProperty("commentary_content")
    private String content;
    @JsonProperty("commentary_upvote")
    private Integer upvote;
    @JsonProperty("commentary_downvote")
    private Integer downvote;
    @JsonProperty("commentary_report")
    private Integer report;
    @JsonProperty("user_id")
    private Integer userId;
    @JsonProperty("publication_id")
    private Integer publiID;
    @JsonProperty("commentary_date")
    private Date date;


}
