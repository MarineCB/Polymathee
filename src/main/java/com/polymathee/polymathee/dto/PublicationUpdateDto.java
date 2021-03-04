package com.polymathee.polymathee.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.polymathee.polymathee.enums.StateEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PublicationUpdateDto {
    @JsonProperty("publication_title")
    private String title;
    @JsonProperty("publication_content")
    private String content;
    @JsonProperty("publication_file")
    private String file;
    @JsonProperty("publication_tags")
    private String tags;
}
