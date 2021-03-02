package com.polymathee.polymathee.controller;

import com.polymathee.polymathee.dao.*;
import com.polymathee.polymathee.dto.CommentInteractionDto;
import com.polymathee.polymathee.dto.CommentaryDto;
import com.polymathee.polymathee.dto.LikeTableDto;
import com.polymathee.polymathee.dto.PublicationDto;
import com.polymathee.polymathee.enums.StateEnum;
import com.polymathee.polymathee.services.*;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.SwaggerDefinition;
import io.swagger.annotations.Tag;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@SwaggerDefinition(tags = {@Tag(name = "/api",description = "Api Polymathee")})
public class UserController {

    private static final String GET_USERS = "/api/users";
    private static final String GET_USER_ID = "/api/user/{id}";
    private static final String DELETE_USER = "/api/users/{userId}";

    @Autowired
    private UsersService usersService;

    @GetMapping(GET_USERS)
    @ApiOperation(value = "Get all Users", consumes = "application/json")
    public ResponseEntity<List<User>> getUsers() {
        List<User> userList = usersService.getUserList();
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @GetMapping(GET_USER_ID)
    @ApiOperation(value = "Get User by ID", consumes = "application/json")
    public ResponseEntity<User> getUserByID(@PathVariable Integer id) {
        User user = usersService.getUserByID(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping(DELETE_USER)
    @ApiOperation(value = "Delete User by ID", consumes = "application/json")
    public ResponseEntity<Boolean> deleteUser(@PathVariable("userId") int userId ) {
        usersService.DeleteUserById(userId);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
