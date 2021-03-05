package com.polymathee.polymathee.controller;

import com.polymathee.polymathee.dao.LikeTable;
import com.polymathee.polymathee.dto.LikeTableDto;
import com.polymathee.polymathee.services.LikeTableService;
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
@SwaggerDefinition(tags = {@Tag(name = "/api",description = "Api Favoris")})
public class FavorisController {

    private static final String GET_LIKES = "/api/favoris";
    private static final String GET_FAVORIS_BY_ID_USER = "/api/favoris/{id}";
    private static final String POST_FAVORIS = "/api/favoris";
    private static final String DELETE_FAVORIS ="/api/favoris/{userId}/{publicationId}";


    @Autowired
    private LikeTableService likeService;

    //GETS

    @GetMapping(GET_FAVORIS_BY_ID_USER)
    @ApiOperation(value = "Get favoris by User Id", consumes = "application/json")
    public ResponseEntity<List<LikeTable>> getAllLikeByUserId(@PathVariable("id") Integer id) {
        List<LikeTable> likelist = likeService.getFavorisByUserId(id);
        return new ResponseEntity<>(likelist, HttpStatus.OK);
    }

    @GetMapping(GET_LIKES)
    @ApiOperation(value = "Get all favoris", consumes = "application/json")
    public ResponseEntity<List<LikeTable>> AllLike() {
        List<LikeTable> likelist = likeService.getLikeTable();
        return new ResponseEntity<>(likelist, HttpStatus.OK);
    }

    //POSTS

    @PostMapping(POST_FAVORIS)
    @ApiOperation(value = "Post favoris", consumes = "application/json")
    public ResponseEntity<LikeTable> addFavoris(@RequestBody LikeTableDto likeTableDto){
        LikeTable liketable = likeService.saveLike(likeTableDto);
        return new ResponseEntity<>(liketable, HttpStatus.OK);
    }

    //DELETES

    @DeleteMapping(DELETE_FAVORIS)
    @ApiOperation(value = "Delete favoris", consumes = "application/json")
    public ResponseEntity<Boolean> deleteFavoris(@PathVariable("userId") int UserId,
        @PathVariable("publicationId") int PublicationId ) {
        likeService.deleteLikeTable(PublicationId);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
