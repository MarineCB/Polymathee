package com.polymathee.polymathee.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.polymathee.polymathee.enums.StateEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PublicationDto implements Serializable {

    @JsonProperty("user_id")
    private Integer userId;
    @JsonProperty("publication_title")
    private String title;
    @JsonProperty("publication_content")
    private String content;
    @JsonProperty("publication_file")
    private String file;
    @JsonProperty("publication_like_number")
    private Integer likeNumber;
    @JsonProperty("publication_download_number")
    private Integer downloadNumber;
    @JsonProperty("publication_status")
    private StateEnum status;
    @JsonProperty("publication_tags")
    private String tags;
    @JsonProperty("publication_report")
    private Integer report;
    @JsonProperty("publication_date")
    private Date date;


}
