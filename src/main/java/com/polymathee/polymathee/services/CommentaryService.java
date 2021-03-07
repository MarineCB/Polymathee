package com.polymathee.polymathee.services;

import com.polymathee.polymathee.dao.Commentary;
import com.polymathee.polymathee.dto.CommentaryDto;

import java.util.List;

public interface CommentaryService {

    List<Commentary> getCommentaryList();

    List<Commentary> getCommentaryByIdPublication(Integer id);

    List<Commentary> getCommentaryByIdUser(Integer id);

    Commentary saveComment(CommentaryDto commentaryDto);

    void deleteComment(int comment);

    void DeleteCommentById(int id);

    Commentary updateReport(Integer id);

    List<Commentary> SortByCommentUpvote(Integer id);
}
