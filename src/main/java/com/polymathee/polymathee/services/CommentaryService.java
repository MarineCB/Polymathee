package com.polymathee.polymathee.services;

import com.polymathee.polymathee.dao.Commentary;
import com.polymathee.polymathee.dao.Publication;
import com.polymathee.polymathee.dto.CommentaryDto;
import io.swagger.models.auth.In;

import java.util.List;

public interface CommentaryService {

    List<Commentary> getCommentaryList();

    List<Commentary> getCommentaryByIdPublication(Integer id);

    Commentary saveComment(CommentaryDto commentaryDto);

    void deleteComment(int comment);

    void DeleteCommentById(int id);
}
