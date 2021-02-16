package com.polymathee.polymathee.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.polymathee.polymathee.dao.User;
import com.polymathee.polymathee.enums.StateEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PublicationDto implements Serializable {

    @JsonProperty("publication_id")
    private Integer id;
    @JsonProperty("user_id")
    private User user_id;
    @JsonProperty("publication_title")
    private String title;
    @JsonProperty("publication_content")
    private String content;
    @JsonProperty("publication_file")
    private String file;
    @JsonProperty("publication_like_number")
    private String likeNumber;
    @JsonProperty("publication_download_number")
    private String downloadNumber;
    @JsonProperty("publication_status")
    private StateEnum status;
    @JsonProperty("publication_tags")
    private String tags;
    @JsonProperty("publication_report")
    private String report;


}
