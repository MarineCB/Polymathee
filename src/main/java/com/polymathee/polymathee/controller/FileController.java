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

    private static final String UPLOAD_FILE = "/api/upload/{id}";
    private static final String GET_FILE = "/api/download/{fileName}";
    private static final String DELETE_FILE = "/api/delete/{id}";


    @Autowired
    private AWSService awsService;

    //GETS

    @GetMapping(GET_FILE)
    @ApiOperation(value = "Download PDF file", consumes = "application/pdf")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable("fileName") String fileName) {
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
    @ApiOperation(value = "Post PDF file with publication_id param", consumes = "application/pdf")
    public ResponseEntity<String> uploadFile(@RequestPart(value = "file") final MultipartFile multipartFile,
        @PathVariable("id") int id) {
        try {
            awsService.uploadFile(multipartFile,id);
            final String response = "[" + multipartFile.getOriginalFilename() + "] uploaded successfully.";
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch(Throwable t) {
            System.out.println(t);
            return new ResponseEntity<>(t.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(DELETE_FILE)
    @ApiOperation(value = "Delete file on S3", consumes = "application/json")
    public ResponseEntity<Boolean> deleteComment(@PathVariable("id") int id ) {
        awsService.deleteFile(id);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
