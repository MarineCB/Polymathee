package com.polymathee.polymathee.controller;

import com.polymathee.polymathee.services.AWSService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.SwaggerDefinition;
import io.swagger.annotations.Tag;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@SwaggerDefinition(tags = {@Tag(name = "/api",description = "doc api polymathee")})
public class AWSController {

    private static final String UPLOAD_FILE = "/upload";
    private static final String GET_FILE = "/download/{fileName}";
    private static final String GET_TEST = "/test";

    @Autowired
    private AWSService service;


    @PostMapping(UPLOAD_FILE)
    @ApiOperation(value = "post pdf file", consumes = "application/pdf")
    public ResponseEntity<String> uploadFile(@RequestPart(value= "file") final MultipartFile multipartFile) {
        service.uploadFile(multipartFile);
        final String response = "[" + multipartFile.getOriginalFilename() + "] uploaded successfully.";
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(GET_FILE)
    @ApiOperation(value = "download pdf file", consumes = "application/pdf")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String fileName) {
        byte[] data = service.downloadFile(fileName);
        ByteArrayResource resource = new ByteArrayResource(data);
        return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }


}
