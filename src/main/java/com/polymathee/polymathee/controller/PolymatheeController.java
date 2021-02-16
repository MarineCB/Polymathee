package com.polymathee.polymathee.controller;

import com.polymathee.polymathee.dao.*;
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

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

@Controller
@SwaggerDefinition(tags = {@Tag(name = "/api",description = "doc api polymathee")})
public class PolymatheeController {

    private static final String UPLOAD_FILE = "/api/upload";
    private static final String GET_FILE = "/api/download/{fileName}";
    private static final String GET_USERS = "/api/users";
    private static final String GET_PUBLICATIONS = "/api/publications";
    private static final String GET_COMMENTARIES = "/api/comments";
    private static final String GET_LIKES = "/api/likes";

    private static final String GET_PUBLICATIONS_ID_USER = "/api/publications/{id}";
    private static final String GET_COMMENTS_BY_ID_PUBLICATION = "/api/comments/{id}";
    private static final String GET_FAVORIS_BY_ID_USER = "/api/favoris/{id}";
    private static final String GET_USER_ID = "/api/user/{id}";

    private static final String GET_PUBLICATION = "/api/publication";

    @Autowired
    private AWSService awsService;

    @Autowired
    private UsersService usersService;

    @Autowired
    private PublicationService publicationService;

    @Autowired
    private CommentaryService commentaryService;

    @Autowired
    private LikeTableService likeService;


    //Upload & Download File

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

    //Get All

    @GetMapping(GET_USERS)
    @ApiOperation(value = "get all Users", consumes = "application/json")
    public ResponseEntity<List<User>> getUsers() {
        List<User> userList = usersService.getUserList();
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @GetMapping(GET_PUBLICATIONS)
    @ApiOperation(value = "get all Publications", consumes = "application/json")
    public ResponseEntity<List<Publication>> getAllPublications() {
        List<Publication> publiList = publicationService.getPublicationList();
        return new ResponseEntity<>(publiList, HttpStatus.OK);
    }

    @GetMapping(GET_COMMENTARIES)
    @ApiOperation(value = "get all commentaries", consumes = "application/json")
    public ResponseEntity<List<Commentary>> AllCommentary() {
        List<Commentary> commentlist = commentaryService.getCommentaryList();
        return new ResponseEntity<>(commentlist, HttpStatus.OK);
    }


    @GetMapping(GET_LIKES)
    @ApiOperation(value = "get all likes", consumes = "application/json")
    public ResponseEntity<List<LikeTable>> AllLike() {
        List<LikeTable> likelist = likeService.getLikeTable();
        return new ResponseEntity<>(likelist, HttpStatus.OK);
    }

    //Get w/ Params

    @GetMapping(GET_USER_ID)
    @ApiOperation(value = "get User by ID", consumes = "application/json")
    public ResponseEntity<User> getUserByID(@PathVariable Integer id) {
        User user = usersService.getUserByID(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping(GET_PUBLICATIONS_ID_USER)
    @ApiOperation(value = "get Publication", consumes = "application/json")
    public ResponseEntity<List<Publication>> getAllPublicationsById(@PathVariable Integer id) {
        List<Publication> publiList = publicationService.getPublicationsByUserId(id);
        return new ResponseEntity<>(publiList, HttpStatus.OK);
    }

    @GetMapping(GET_COMMENTS_BY_ID_PUBLICATION)
    @ApiOperation(value = "get commentary by ID Publication", consumes = "application/json")
    public ResponseEntity<List<Commentary>> AllCommentaryByIDPublication(@PathVariable Integer id) {
        List<Commentary> commentlist = commentaryService.getCommentaryByIdPublication(id);
        return new ResponseEntity<>(commentlist, HttpStatus.OK);
    }

    @GetMapping(GET_FAVORIS_BY_ID_USER)
    @ApiOperation(value = "get like by User Id", consumes = "application/json")
    public ResponseEntity<List<LikeTable>> getAllLikeByUserId(@PathVariable Integer id) {
        List<LikeTable> likelist = likeService.getFavorisByUserId(id);
        return new ResponseEntity<>(likelist, HttpStatus.OK);
    }

    @GetMapping(GET_PUBLICATION)
    @ApiOperation(value = "get Publications Filter", consumes = "application/json")
    public ResponseEntity<List<Publication>> getAllPublication(Filter publicationFilter)
            throws UnsupportedEncodingException {
        String filter = URLDecoder.decode(publicationFilter.getFilter(), "utf-8");
        List<Publication> publiList = publicationService.getPublicationsFilter(filter);
        return new ResponseEntity<>(publiList, HttpStatus.OK);
    }
}
