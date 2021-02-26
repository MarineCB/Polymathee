package com.polymathee.polymathee.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.polymathee.polymathee.dao.Commentary;
import com.polymathee.polymathee.dao.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommentInteractionDto {

    @JsonProperty("user_id")
    private Integer userId;
    @JsonProperty("commentary_id")
    private Integer commentaryId;
    @JsonProperty("vote")
    private Boolean vote ;
}
