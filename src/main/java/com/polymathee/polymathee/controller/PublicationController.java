package com.polymathee.polymathee.controller;

import com.polymathee.polymathee.dao.CommentInteraction;
import com.polymathee.polymathee.dao.Filter;
import com.polymathee.polymathee.dao.LikeTable;
import com.polymathee.polymathee.dao.Publication;
import com.polymathee.polymathee.dto.CommentInteractionDto;
import com.polymathee.polymathee.dto.PublicationDto;
import com.polymathee.polymathee.services.CommentaryInteractionService;
import com.polymathee.polymathee.services.CommentaryService;
import com.polymathee.polymathee.services.LikeTableService;
import com.polymathee.polymathee.services.PublicationService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.SwaggerDefinition;
import io.swagger.annotations.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

@Controller
@SwaggerDefinition(tags = {@Tag(name = "/api",description = "Api Publication")})
public class PublicationController {

    private static final String GET_PUBLICATION = "/api/publication";
    private static final String GET_PUBLICATIONS = "/api/publications";
    private static final String GET_PUBLICATIONS_ID_USER = "/api/publications/{id}";
    private static final String POST_PUBLICATION ="/api/publication";
    private static final String DELETE_PUBLICATION ="/api/publication/{publiId}";

    @Autowired
    private PublicationService publicationService;

    @Autowired
    private CommentaryService commentaryService;

    @Autowired
    private LikeTableService likeService;

    @GetMapping(GET_PUBLICATIONS)
    @ApiOperation(value = "Get all Publications", consumes = "application/json")
    public ResponseEntity<List<Publication>> getAllPublications() {
        List<Publication> publiList = publicationService.getPublicationList();
        return new ResponseEntity<>(publiList, HttpStatus.OK);
    }

    @GetMapping(GET_PUBLICATION)
    @ApiOperation(value = "Get Publications Filter", consumes = "application/json")
    public ResponseEntity<List<Publication>> getAllPublication(Filter publicationFilter)
            throws UnsupportedEncodingException {
        String filter = URLDecoder.decode(publicationFilter.getFilter(), "utf-8");
        List<Publication> publiList = publicationService.getPublicationsFilter(filter);
        return new ResponseEntity<>(publiList, HttpStatus.OK);
    }

    @GetMapping(GET_PUBLICATIONS_ID_USER)
    @ApiOperation(value = "Get Publication by User ID", consumes = "application/json")
    public ResponseEntity<List<Publication>> getAllPublicationsById(@PathVariable Integer id) {
        List<Publication> publiList = publicationService.getPublicationsByUserId(id);
        return new ResponseEntity<>(publiList, HttpStatus.OK);
    }

    @PostMapping(POST_PUBLICATION)
    @ApiOperation(value = "Post publication", consumes = "application/json")
    public ResponseEntity<Publication> addPubli(@RequestBody PublicationDto publi){
        Publication publication = publicationService.savePubli(publi);
        return new ResponseEntity<>(publication, HttpStatus.OK);
    }


    @DeleteMapping(DELETE_PUBLICATION)
    @ApiOperation(value = "Delete publication by ID", consumes = "application/json")
    public ResponseEntity<Boolean> deletePubli(@PathVariable("publiId") int PubliId) {
        commentaryService.deleteComment(PubliId);
        likeService.deleteLikeTable(PubliId);
        publicationService.deletePubli(PubliId);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }


}
