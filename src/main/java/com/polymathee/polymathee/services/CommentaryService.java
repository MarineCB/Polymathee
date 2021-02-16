package com.polymathee.polymathee.services;

import com.polymathee.polymathee.dao.Commentary;
import com.polymathee.polymathee.dao.Publication;
import io.swagger.models.auth.In;

import java.util.List;

public interface CommentaryService {

    List<Commentary> getCommentaryList();

    List<Commentary> getCommentaryByIdPublication(Integer id);
}
