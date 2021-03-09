package com.polymathee.polymathee.services.impl;

import com.polymathee.polymathee.dao.CommentInteraction;
import com.polymathee.polymathee.dao.Commentary;
import com.polymathee.polymathee.dao.User;
import com.polymathee.polymathee.dto.CommentInteractionDto;
import com.polymathee.polymathee.repositories.CommentInteractionRepository;
import com.polymathee.polymathee.repositories.CommentaryRepository;
import com.polymathee.polymathee.repositories.UserRepository;
import com.polymathee.polymathee.services.CommentaryInteractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentInteractionImpl implements CommentaryInteractionService {

    @Autowired
    private CommentInteractionRepository commentinteractionrepository;

    @Autowired
    private CommentaryRepository commentaryRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public CommentInteraction saveVote(CommentInteractionDto commentDto) {

        Commentary commentary = commentaryRepository.findCommentaryById(commentDto.getCommentaryId());
        User user = userRepository.findUserById(commentDto.getUserId());

        CommentInteraction commentInteraction = new CommentInteraction();
        commentInteraction.setCommentaryId(commentary);
        commentInteraction.setUserId(user);
        commentInteraction.setVote(commentDto.getVote());

        commentinteractionrepository.save(commentInteraction);
        return commentInteraction;
    }
}
