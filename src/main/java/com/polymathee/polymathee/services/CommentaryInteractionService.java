package com.polymathee.polymathee.services;


import com.polymathee.polymathee.dao.CommentInteraction;
import com.polymathee.polymathee.dto.CommentInteractionDto;

public interface CommentaryInteractionService {

    CommentInteraction saveVote(CommentInteractionDto comment);
}
