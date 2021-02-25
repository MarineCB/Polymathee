package com.polymathee.polymathee.services.impl;

import com.polymathee.polymathee.dao.Commentary;
import com.polymathee.polymathee.dao.LikeTable;
import com.polymathee.polymathee.dao.Publication;
import com.polymathee.polymathee.dto.LikeTableDto;
import com.polymathee.polymathee.repositories.CommentaryRepository;
import com.polymathee.polymathee.repositories.LikeTableRepository;
import com.polymathee.polymathee.services.CommentaryService;
import com.polymathee.polymathee.services.LikeTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeTableServiceImpl implements LikeTableService {

    @Autowired
    private LikeTableRepository likeRepository;

    @Override
    public List<LikeTable> getLikeTable() {
        return likeRepository.findAll();
    }

    @Override
    public List<LikeTable> getFavorisByUserId(Integer id) {
        return likeRepository.findAllByUserId(id);
    }

    @Override
    public void deleteLikeTable(int publicationId) {
        likeRepository.deleteFavoris(publicationId);
    }

    @Override
    public LikeTable saveLike(LikeTableDto likeTableDto) {

        LikeTable liketable = new LikeTable();
        liketable.setPublicationId(likeTableDto.getPubliId());
        liketable.setUserId(likeTableDto.getUserId());

        likeRepository.save(liketable);
        return liketable;
    }
}
