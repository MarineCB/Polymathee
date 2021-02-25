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
@SwaggerDefinition(tags = {@Tag(name = "/api",description = "doc api polymathee")})
public class PolymatheeController {

    private static final String UPLOAD_FILE = "/api/upload";
    private static final String GET_FILE = "/api/download/{fileName}";
    private static final String GET_USERS = "/api/users";
    private static final String GET_PUBLICATIONS = "/api/publications";
    private static final String GET_COMMENTARIES = "/api/comments";
    private static final String GET_LIKES = "/api/likes";
    private static final String GET_PUBLICATION = "/api/publication";

    private static final String GET_PUBLICATIONS_ID_USER = "/api/publications/{id}";
    private static final String GET_COMMENTS_BY_ID_PUBLICATION = "/api/comments/{id}";
    private static final String GET_FAVORIS_BY_ID_USER = "/api/favoris/{id}";
    private static final String GET_USER_ID = "/api/user/{id}";

    private static final String POST_PUBLICATION ="/api/publication";
    private static final String POST_COMMENTARY ="/api/commentary";
    private static final String POST_FAVORIS = "/api/favoris";
    private static final String POST_VOTE = "/api/vote";

    private static final String DELETE_PUBLICATION ="/api/publication/{PubliId}";
    private static final String DELETE_FAVORIS ="/api/favoris/{UserId}/{PublicationId}";
    private static final String DELETE_COMMENTARY ="/api/comment/{CommentId)";
    private static final String DELETE_USER = "/api/users/{userId}";
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

    @Autowired
    private CommentaryInteractionService commentinteraction;


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

    //POST

    @PostMapping(POST_PUBLICATION)
    @ApiOperation(value = "add publication", consumes = "application/json")
    public ResponseEntity<Publication> addPubli(@RequestBody PublicationDto publi){
        Publication publication = new Publication();


        Date date = new Date();
        java.sql.Date sqlDate = new java.sql.Date(date.getTime());

        publication.setUserId(publi.getUserId());
        publication.setTitle(publi.getTitle());
        publication.setContent(publi.getContent());
        publication.setFile(publi.getFile());
        publication.setLikeNumber(publi.getLikeNumber());
        publication.setDownloadNumber(publi.getDownloadNumber());
        publication.setStatus(publi.getStatus());
        publication.setTags(publi.getTags());
        publication.setReport(publi.getReport());
        publication.setDate(sqlDate);

        publicationService.savePubli(publication);
        return new ResponseEntity<>(publication, HttpStatus.OK);
    }


    @PostMapping(POST_COMMENTARY)
    @ApiOperation(value = "add commentary", consumes = "application/json")
    public ResponseEntity<Commentary> addComment(@RequestBody CommentaryDto comment){
        Commentary commentary = new Commentary();
        Date date = new Date();
        java.sql.Date sqlDate = new java.sql.Date(date.getTime());

        commentary.setContent(comment.getContent());
        commentary.setUpvote(comment.getUpvote());
        commentary.setDownvote(comment.getDownvote());
        commentary.setReport(comment.getReport());
        commentary.setUserId(comment.getUserId());
        commentary.setDate(sqlDate);
        commentary.setPublicationId(comment.getPubliID());
        commentaryService.saveComment(commentary);
        return new ResponseEntity<>(commentary, HttpStatus.OK);
    }

    @PostMapping(POST_FAVORIS)
    @ApiOperation(value = "add favoris", consumes = "application/json")
    public ResponseEntity<LikeTable> addFavoris(@RequestBody LikeTableDto like){
        LikeTable liketable = new LikeTable();
        liketable.setPublicationId(like.getPubliId());
        liketable.setUserId(like.getUserId());
        likeService.saveLike(liketable);
        return new ResponseEntity<>(liketable, HttpStatus.OK);
    }

    @PostMapping(POST_VOTE)
    @ApiOperation(value = "add vote", consumes = "application/json")
    public ResponseEntity<CommentInteraction> addFavoris(@RequestBody CommentInteractionDto comment){
        CommentInteraction commentInteraction = new CommentInteraction();
        commentInteraction.setCommentaryId(comment.getCommentaryId());
        commentInteraction.setUserId(comment.getUserId());
        commentInteraction.setVote(comment.getVote());
        commentinteraction.saveVote(commentInteraction);
        return new ResponseEntity<>(commentInteraction, HttpStatus.OK);
    }

    //DELETE

    @DeleteMapping(DELETE_PUBLICATION)
    @ApiOperation(value = "delete publication", consumes = "application/json")
    public ResponseEntity<Boolean> deletePubli(@PathVariable("PubliId") int PubliId) {
        commentaryService.deleteComment(PubliId);
        likeService.deleteLikeTable(PubliId);
        publicationService.deletePubli(PubliId);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @DeleteMapping(DELETE_FAVORIS)
    @ApiOperation(value = "delete favoris", consumes = "application/json")
    public void deleteFavoris(@PathVariable("UserId") int UserId,@PathVariable("PublicationId") int PublicationId ) {
        likeService.deleteLikeTable(PublicationId);
    }

    @DeleteMapping(DELETE_COMMENTARY)
    @ApiOperation(value = "delete commentary", consumes = "application/json")
    public ResponseEntity<Boolean> deleteComment(@PathVariable("CommentId") int commentId ) {
        commentaryService.DeleteCommentById(commentId);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @DeleteMapping(DELETE_USER)
    @ApiOperation(value = "delete user", consumes = "application/json")
    public ResponseEntity<Boolean> deleteUser(@PathVariable("userId") int userId ) {
        usersService.DeleteUserById(userId);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }




}