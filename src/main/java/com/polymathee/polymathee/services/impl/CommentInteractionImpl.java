package com.polymathee.polymathee.services.impl;

import com.polymathee.polymathee.dao.CommentInteraction;
import com.polymathee.polymathee.repositories.CommentInteractionRepository;
import com.polymathee.polymathee.repositories.LikeTableRepository;
import com.polymathee.polymathee.services.CommentaryInteractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentInteractionImpl implements CommentaryInteractionService {

    @Autowired
    private CommentInteractionRepository commentinteractionrepository;

    @Override
    public CommentInteraction saveVote(CommentInteraction comment) {
        commentinteractionrepository.save(comment);
        return comment;
    }
}
