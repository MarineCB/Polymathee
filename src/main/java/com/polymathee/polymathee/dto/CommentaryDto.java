package com.polymathee.polymathee.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.polymathee.polymathee.dao.Publication;
import com.polymathee.polymathee.dao.User;
import com.polymathee.polymathee.enums.StateEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommentaryDto implements Serializable {

    @JsonProperty("commentary_id")
    private Integer id;
    @JsonProperty("commentary_content")
    private User content;
    @JsonProperty("commentary_upvote")
    private String upvote;
    @JsonProperty("commentary_downvote")
    private String downvote;
    @JsonProperty("commentary_report")
    private String report;
    @JsonProperty("user_id")
    private User user_id;
    @JsonProperty("publication_id")
    private Publication status;


}
