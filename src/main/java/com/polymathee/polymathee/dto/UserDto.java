package com.polymathee.polymathee.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.polymathee.polymathee.enums.RoleEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDto implements Serializable {

    @JsonProperty("user_name")
    private String name;
    @JsonProperty("user_email")
    private String email;
    @JsonProperty("strike_number")
    private Integer strikeNumber;
    @JsonProperty("user_role")
    private RoleEnum role;
}
