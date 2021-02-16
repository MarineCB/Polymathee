package com.polymathee.polymathee.services.impl;

import com.polymathee.polymathee.dao.Commentary;
import com.polymathee.polymathee.dao.Publication;
import com.polymathee.polymathee.repositories.CommentaryRepository;
import com.polymathee.polymathee.repositories.PublicationRepository;
import com.polymathee.polymathee.services.CommentaryService;
import com.polymathee.polymathee.services.PublicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentaryServiceImpl implements CommentaryService {

    @Autowired
    private CommentaryRepository commentaryRepository;

    @Override
    public List<Commentary> getCommentaryList(){
        return commentaryRepository.findAll();
    }

    @Override
    public List<Commentary> getCommentaryByIdPublication(Integer id){return commentaryRepository.findAllByPublicationId(id);}
}
