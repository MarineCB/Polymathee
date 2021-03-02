package com.polymathee.polymathee.controller;

import com.polymathee.polymathee.dao.CommentInteraction;
import com.polymathee.polymathee.dao.Commentary;
import com.polymathee.polymathee.dto.CommentInteractionDto;
import com.polymathee.polymathee.dto.CommentaryDto;
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

import java.util.Date;
import java.util.List;

@Controller
@SwaggerDefinition(tags = {@Tag(name = "/api",description = "Api Polymathee")})
public class CommentController {

    private static final String GET_COMMENTARIES = "/api/comments";
    private static final String GET_COMMENTS_BY_ID_PUBLICATION = "/api/comments/{id}";
    private static final String POST_COMMENTARY ="/api/commentary";
    private static final String DELETE_COMMENTARY ="/api/comment/{commentId)";
    private static final String POST_VOTE = "/api/vote";

    @Autowired
    private CommentaryService commentaryService;

    @Autowired
    private CommentaryInteractionService commentaryInteractionService;

    @GetMapping(GET_COMMENTS_BY_ID_PUBLICATION)
    @ApiOperation(value = "get commentary by ID Publication", consumes = "application/json")
    public ResponseEntity<List<Commentary>> AllCommentaryByIDPublication(@PathVariable Integer id) {
        List<Commentary> commentlist = commentaryService.getCommentaryByIdPublication(id);
        return new ResponseEntity<>(commentlist, HttpStatus.OK);
    }

    @PostMapping(POST_COMMENTARY)
    @ApiOperation(value = "Post commentary", consumes = "application/json")
    public ResponseEntity<Commentary> addComment(@RequestBody CommentaryDto commentaryDto){
        Commentary commentary = commentaryService.saveComment(commentaryDto);
        return new ResponseEntity<>(commentary, HttpStatus.OK);
    }

    @DeleteMapping(DELETE_COMMENTARY)
    @ApiOperation(value = "Delete commentary", consumes = "application/json")
    public ResponseEntity<Boolean> deleteComment(@PathVariable("commentId") int commentId ) {
        commentaryService.DeleteCommentById(commentId);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @GetMapping(GET_COMMENTARIES)
    @ApiOperation(value = "Get all commentaries", consumes = "application/json")
    public ResponseEntity<List<Commentary>> AllCommentary() {
        List<Commentary> commentlist = commentaryService.getCommentaryList();
        return new ResponseEntity<>(commentlist, HttpStatus.OK);
    }

    @PostMapping(POST_VOTE)
    @ApiOperation(value = "Post vote", consumes = "application/json")
    public ResponseEntity<CommentInteraction> addFavoris(@RequestBody CommentInteractionDto comment){
        CommentInteraction commentInteraction = commentaryInteractionService.saveVote(comment);
        return new ResponseEntity<>(commentInteraction, HttpStatus.OK);
    }
}
