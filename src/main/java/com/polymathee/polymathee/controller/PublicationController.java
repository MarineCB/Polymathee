package com.polymathee.polymathee.controller;


import com.polymathee.polymathee.dao.Publication;
import com.polymathee.polymathee.dto.PublicationDto;
import com.polymathee.polymathee.dto.PublicationUpdateDto;
import com.polymathee.polymathee.enums.StateEnum;
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
import java.util.List;

@Controller
@SwaggerDefinition(tags = {@Tag(name = "/api",description = "Api Publication")})
public class PublicationController {

    private static final String GET_PUBLICATIONS = "/api/publications";

    private static final String GET_PUBLICATIONS_ID_USER = "/api/publications/user/{id}";
    private static final String GET_PUBLICATIONS_BY_ID = "/api/publications/{id}";
    private static final String GET_PUBLICATIONS_BY_LIKE_NUMBER_DESC = "/api/publications/like";
    private static final String GET_PUBLICATIONS_BY_DATE = "/api/publications/date";
    private static final String GET_PUBLICATIONS_BY_USER_AND_TAG = "/api/publications/filter/{user_name}/{tags}";
    private static final String GET_ALL_TAGS = "/api/publication/tags";



    private static final String POST_PUBLICATION ="/api/publication";

    private static final String PUT_PUBLICATION ="/api/publication/{publiId}";
    private static final String PUT_PUBLICATION_STATUS ="/api/status/publication/{publiId}/{status}";

    private static final String DELETE_PUBLICATION ="/api/publication/{publiId}";


    @Autowired
    private PublicationService publicationService;

    @Autowired
    private CommentaryService commentaryService;

    @Autowired
    private LikeTableService likeService;

    @GetMapping(GET_PUBLICATIONS)
    @ApiOperation(value = "Get all Publications", consumes = "application/json")
    public ResponseEntity<List<Publication>> getAllPublications(@RequestParam(value="status",required = false) StateEnum status) {

        List<Publication> publiList = null;
        if(status !=  null) {
            publiList = publicationService.getPublicationsByStatus(status);
        } else {
            publiList = publicationService.getPublicationList();
        }
        return new ResponseEntity<>(publiList, HttpStatus.OK);
    }




    @GetMapping(GET_PUBLICATIONS_BY_ID)
    @ApiOperation(value = "Get Publication by  ID", consumes = "application/json")
    public ResponseEntity<Publication> getPublicationsById(@PathVariable(value="id") int id) {
        Publication publi = publicationService.getPublicationsById(id);
        return new ResponseEntity<>(publi, HttpStatus.OK);
    }


    @GetMapping(GET_PUBLICATIONS_ID_USER)
    @ApiOperation(value = "Get Publication by User ID", consumes = "application/json")
    public ResponseEntity<List<Publication>> getAllPublicationsById(@PathVariable Integer id) {
        List<Publication> publiList = publicationService.getPublicationsByUserId(id);
        return new ResponseEntity<>(publiList, HttpStatus.OK);
    }

/*
    @GetMapping(GET_PUBLICATIONS_BY_STATUS)
    @ApiOperation(value = "Get Publication by status", consumes = "application/json")
    public ResponseEntity<List<Publication>> getPublicationsByStatus(@PathVariable(value="status") StateEnum status) {
        List<Publication> listPubli = publicationService.getPublicationsByStatus(status);
        return new ResponseEntity<>(listPubli, HttpStatus.OK);
    }

 */

    @GetMapping(GET_PUBLICATIONS_BY_LIKE_NUMBER_DESC)
    @ApiOperation(value = "Get Publication by like number desc", consumes = "application/json")
    public ResponseEntity<List<Publication>> getLikeNumberDesc() {
        List<Publication> listPubli = publicationService.getDESCLikeNumber();
        return new ResponseEntity<>(listPubli, HttpStatus.OK);
    }

    @GetMapping(GET_PUBLICATIONS_BY_DATE)
    @ApiOperation(value = "Get Publication by date desc", consumes = "application/json")
    public ResponseEntity<List<Publication>> getDateDesc() {
        List<Publication> listPubli = publicationService.getDESCDate();
        return new ResponseEntity<>(listPubli, HttpStatus.OK);
    }

    @GetMapping(GET_PUBLICATIONS_BY_USER_AND_TAG)
    @ApiOperation(value = "Get Publication by tags", consumes = "application/json")
    public ResponseEntity<List<Publication>> getPublicationsByTags(@PathVariable(value="user_name",required = false)
           String user, @PathVariable(value="tags", required = false) String tag) {
        List<Publication> publi = publicationService.getPubliTagUser(tag,user);
        return new ResponseEntity<>(publi, HttpStatus.OK);
    }

    @GetMapping(GET_ALL_TAGS)
    @ApiOperation(value = "Get all tags", consumes = "application/json")
    public ResponseEntity<List<String>> getAllTags() {
        List<String> tagsList = publicationService.getAllTags();
        return new ResponseEntity<>(tagsList, HttpStatus.OK);
    }


    @PostMapping(POST_PUBLICATION)
    @ApiOperation(value = "Post publication", consumes = "application/json")
    public ResponseEntity<Publication> addPubli(@RequestBody PublicationDto publi){
        Publication publication = publicationService.savePubli(publi);
        return new ResponseEntity<>(publication, HttpStatus.OK);
    }

    @PutMapping(PUT_PUBLICATION)
    @ApiOperation(value = "Put publication", consumes = "application/json")
    public ResponseEntity<Publication> updatePubli(@PathVariable("publiId") Integer id,
           @RequestBody PublicationUpdateDto publi){
        Publication updatedPublication = publicationService.updatePublicationById(id, publi);
        return new ResponseEntity<>(updatedPublication, HttpStatus.OK);
    }

    @PutMapping(PUT_PUBLICATION_STATUS)
    @ApiOperation(value = "Put publication status", consumes = "application/json")
    public ResponseEntity<Publication> updatePubliStatus(@PathVariable(value="publiId")
           int publiId, @PathVariable(value="status") StateEnum status){
        Publication updatedPublication = publicationService.updatePubicationPublished(publiId,status);
        return new ResponseEntity<>(updatedPublication, HttpStatus.OK);
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
