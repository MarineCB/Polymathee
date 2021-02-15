package com.polymathee.polymathee.controller;

import com.polymathee.polymathee.dao.DBconnect;
import com.polymathee.polymathee.dao.User;
import com.polymathee.polymathee.services.AWSService;
import com.polymathee.polymathee.services.UsersService;
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

import java.util.List;

@Controller
@SwaggerDefinition(tags = {@Tag(name = "/api",description = "doc api polymathee")})
public class PolymatheeController {

    private static final String UPLOAD_FILE = "/upload";
    private static final String GET_FILE = "/download/{fileName}";
    private static final String GET_USER = "/user";
    private static final String GET_PUBLI_USER = "/user/{id}";

    DBconnect conn = new DBconnect();

    @Autowired
    private AWSService awsService;

    @Autowired
    private UsersService usersService;


    @PostMapping(UPLOAD_FILE)
    @ApiOperation(value = "post pdf file", consumes = "application/pdf")
    public ResponseEntity<String> uploadFile(@RequestPart(value = "file") final MultipartFile multipartFile) {
        awsService.uploadFile(multipartFile);
        final String response = "[" + multipartFile.getOriginalFilename() + "] uploaded successfully.";
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(GET_FILE)
    @ApiOperation(value = "download pdf file", consumes = "application/pdf")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String fileName) {
        byte[] data = awsService.downloadFile(fileName);
        ByteArrayResource resource = new ByteArrayResource(data);
        return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }

    @GetMapping(GET_USER)
    @ApiOperation(value = "get Users", consumes = "application/json")
    public ResponseEntity<List<User>> TestFile() {
        List<User> userList = usersService.getUserList();
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }
}
