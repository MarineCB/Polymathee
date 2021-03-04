package com.polymathee.polymathee.controller;

import com.polymathee.polymathee.services.AWSService;
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

@Controller
@SwaggerDefinition(tags = {@Tag(name = "/api",description = "Api File")})
public class FileController {

    private static final String UPLOAD_FILE = "/api/upload";
    private static final String GET_FILE = "/api/download/{fileName}";

    @Autowired
    private AWSService awsService;

    //GETS

    @GetMapping(GET_FILE)
    @ApiOperation(value = "Download PDF file", consumes = "application/pdf")
    public ResponseEntity<ByteArrayResource> downloadFile(@RequestParam("fileName") String fileName) {
        byte[] data = awsService.downloadFile(fileName);
        ByteArrayResource resource = new ByteArrayResource(data);
        return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }

    //POSTS

    @PostMapping(UPLOAD_FILE)
    @ApiOperation(value = "Post PDF file", consumes = "application/pdf")
    public ResponseEntity<String> uploadFile(@RequestPart(value = "file") final MultipartFile multipartFile) {
        awsService.uploadFile(multipartFile);
        final String response = "[" + multipartFile.getOriginalFilename() + "] uploaded successfully.";
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
