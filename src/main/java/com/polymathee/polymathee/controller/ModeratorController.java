package com.polymathee.polymathee.controller;

import com.polymathee.polymathee.dao.LikeTable;
import com.polymathee.polymathee.dao.Moderator;
import com.polymathee.polymathee.dao.User;
import com.polymathee.polymathee.dto.LikeTableDto;
import com.polymathee.polymathee.dto.ModeratorDto;
import com.polymathee.polymathee.services.AWSService;
import com.polymathee.polymathee.services.ModeratorService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.SwaggerDefinition;
import io.swagger.annotations.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@Controller
@Slf4j
@SwaggerDefinition(tags = {@Tag(name = "/api",description = "Api File")})
public class ModeratorController {

    @Autowired
    private ModeratorService moderatorService;

    private static final String POST_MODERATOR = "/api/moderator";
    private static final String POST_LOGIN = "/api/login";


    @PostMapping(POST_MODERATOR)
    @ApiOperation(value = "Post moderator", consumes = "application/json")
    public ResponseEntity<Moderator> addModerator(@RequestBody ModeratorDto moderatorDto) throws InvalidKeySpecException, NoSuchAlgorithmException {
        Moderator moderator = moderatorService.saveModerator(moderatorDto);
        return new ResponseEntity<>(moderator, HttpStatus.OK);
    }

    @PostMapping(POST_LOGIN)
    @ApiOperation(value = "Post login", consumes = "application/json")
    public ResponseEntity<User> addLogin(@RequestBody ModeratorDto moderatorDto) throws InvalidKeySpecException, NoSuchAlgorithmException {
        return new ResponseEntity<>(moderatorService.ComparePassword(moderatorDto.getPassword(),moderatorDto.getUsername()), HttpStatus.OK);
    }










}
