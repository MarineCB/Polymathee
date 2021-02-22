package com.polymathee.polymathee.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.polymathee.polymathee.dao.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommentInteractionDTO {

    @JsonProperty("interaction_id")
    private Integer id;
    @JsonProperty("user_id")
    private User userId;
    @JsonProperty("commentary_id")
    private String commentaryId;
    @JsonProperty("vote")
    private Boolean vote ;
}
