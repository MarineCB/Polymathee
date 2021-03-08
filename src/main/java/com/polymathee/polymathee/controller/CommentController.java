package com.polymathee.polymathee.controller;

import com.polymathee.polymathee.dao.CommentInteraction;
import com.polymathee.polymathee.dao.Commentary;
import com.polymathee.polymathee.dao.Publication;
import com.polymathee.polymathee.dto.CommentInteractionDto;
import com.polymathee.polymathee.dto.CommentaryDto;
import com.polymathee.polymathee.dto.PublicationUpdateDto;
import com.polymathee.polymathee.services.CommentaryInteractionService;
import com.polymathee.polymathee.services.CommentaryService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.SwaggerDefinition;
import io.swagger.annotations.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@SwaggerDefinition(tags = {@Tag(name = "/api",description = "Api Polymathee")})
public class CommentController {

    private static final String GET_COMMENTARIES = "/api/comments";
    private static final String GET_COMMENTS_BY_ID_PUBLICATION = "/api/comments/{id}";
    private static final String GET_COMMENTS_BY_ID_USER = "/api/comments/user/{id}";
    private static final String GET_COMMENTS_BY_UPVOTE = "/api/comments/upvote";
    private static final String GET_COMMENTS_BY_REPORT_DESC = "/api/comments/reports/{report}";
    private static final String POST_COMMENT ="/api/comment";
    private static final String DELETE_COMMENT ="/api/comment/{commentId}";
    private static final String POST_VOTE = "/api/vote";
    private static final String PUT_COMMENT_REPORT = "/api/report/comment/{commentId}";

    @Autowired
    private CommentaryService commentaryService;

    @Autowired
    private CommentaryInteractionService commentaryInteractionService;

    //GETS

    @GetMapping(GET_COMMENTS_BY_ID_PUBLICATION)
    @ApiOperation(value = "get commentary by ID Publication", consumes = "application/json")
    public ResponseEntity<List<Commentary>> AllCommentaryByIDPublication(@PathVariable("id") Integer id) {
        List<Commentary> commentlist = commentaryService.getCommentaryByIdPublication(id);

        return new ResponseEntity<>(commentlist, HttpStatus.OK);
    }

    @GetMapping(GET_COMMENTARIES)
    @ApiOperation(value = "Get all commentaries", consumes = "application/json")
    public ResponseEntity<List<Commentary>> AllCommentary() {
        List<Commentary> commentlist = commentaryService.getCommentaryList();
        return new ResponseEntity<>(commentlist, HttpStatus.OK);
    }


    @GetMapping(GET_COMMENTS_BY_ID_USER)
    @ApiOperation(value = "Get all commentaries by ID User", consumes = "application/json")
    public ResponseEntity<List<Commentary>> allCommentaryByIDUser(@PathVariable("id") Integer id) {
        List<Commentary> commentList = commentaryService.getCommentaryByIdUser(id);
        return new ResponseEntity<>(commentList, HttpStatus.OK);
    }

    @GetMapping(GET_COMMENTS_BY_REPORT_DESC)
    @ApiOperation(value = "Get comments report desc", consumes = "application/json")
    public ResponseEntity<List<Commentary>> AllCommentaryByReportDesc(@PathVariable("report") Integer report) {
        List<Commentary> commentlist = commentaryService.GetCommentReport(report);
        return new ResponseEntity<>(commentlist, HttpStatus.OK);

    }


    //POSTS

    @PostMapping(POST_COMMENT)
    @ApiOperation(value = "Post commentary", consumes = "application/json")
    public ResponseEntity<Commentary> addComment(@RequestBody CommentaryDto commentaryDto){
        Commentary commentary = commentaryService.saveComment(commentaryDto);
        return new ResponseEntity<>(commentary, HttpStatus.OK);
    }

    @PostMapping(POST_VOTE)
    @ApiOperation(value = "Post vote", consumes = "application/json")
    public ResponseEntity<CommentInteraction> addFavoris(@RequestBody CommentInteractionDto comment){
        CommentInteraction commentInteraction = commentaryInteractionService.saveVote(comment);
        return new ResponseEntity<>(commentInteraction, HttpStatus.OK);
    }

    @PutMapping(PUT_COMMENT_REPORT)
    @ApiOperation(value = "Put commentary report", consumes = "application/json")
    public ResponseEntity<Commentary> updateCommentReport(@PathVariable("commentId") Integer id){
        Commentary updatedCommentary = commentaryService.updateReport(id);
        return new ResponseEntity<>(updatedCommentary, HttpStatus.OK);
    }
    //DELETES

    @DeleteMapping(DELETE_COMMENT)
    @ApiOperation(value = "Delete commentary", consumes = "application/json")
    public ResponseEntity<Boolean> deleteComment(@PathVariable("commentId") int commentId ) {
        commentaryService.DeleteCommentById(commentId);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
