package com.polymathee.polymathee.services.impl;

import com.polymathee.polymathee.dao.Commentary;
import com.polymathee.polymathee.dao.Publication;
import com.polymathee.polymathee.dao.User;
import com.polymathee.polymathee.dto.CommentaryDto;
import com.polymathee.polymathee.repositories.CommentaryRepository;
import com.polymathee.polymathee.repositories.PublicationRepository;
import com.polymathee.polymathee.repositories.UserRepository;
import com.polymathee.polymathee.services.CommentaryService;
import com.polymathee.polymathee.services.PublicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CommentaryServiceImpl implements CommentaryService {

    @Autowired
    private CommentaryRepository commentaryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PublicationRepository publicationRepository;

    @Override
    public List<Commentary> getCommentaryList(){
        return commentaryRepository.findAll();
    }

    @Override
    public List<Commentary> getCommentaryByIdPublication(Integer id){return commentaryRepository.findAllByPublicationId(id);}

    @Override
    public Commentary saveComment(CommentaryDto commentaryDto) {
        Commentary commentary = new Commentary();
        User user = userRepository.findUserById(commentaryDto.getUserId());
        Publication publication = publicationRepository.findPublicationById(commentaryDto.getPubliID());

        Date date = new Date();
        java.sql.Date sqlDate = new java.sql.Date(date.getTime());

        commentary.setContent(commentaryDto.getContent());
        commentary.setUpvote(commentaryDto.getUpvote());
        commentary.setDownvote(commentaryDto.getDownvote());
        commentary.setReport(commentaryDto.getReport());
        commentary.setUserId(user);
        commentary.setPublicationId(publication);
        commentary.setDate(sqlDate);

        commentaryRepository.save(commentary);
        return commentary;
    }

    @Override
    public void deleteComment(int comment){
        commentaryRepository.deleteComment(comment);
    }

    @Override
    public void DeleteCommentById(int id){
        commentaryRepository.deleteById(id);
    }
}
