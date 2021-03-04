package com.polymathee.polymathee.services.impl;

import com.polymathee.polymathee.dao.LikeTable;
import com.polymathee.polymathee.dao.Publication;
import com.polymathee.polymathee.dao.User;
import com.polymathee.polymathee.dto.LikeTableDto;
import com.polymathee.polymathee.repositories.LikeTableRepository;
import com.polymathee.polymathee.repositories.PublicationRepository;
import com.polymathee.polymathee.repositories.UserRepository;
import com.polymathee.polymathee.services.LikeTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeTableServiceImpl implements LikeTableService {

    @Autowired
    private LikeTableRepository likeRepository;

    @Autowired
    private PublicationRepository publicationRepository;

    @Autowired
    private UserRepository userRepository;


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

        Publication publication = publicationRepository.findPublicationById(likeTableDto.getPubliId());
        User user = userRepository.findUserById(likeTableDto.getUserId());

        LikeTable liketable = new LikeTable();
        liketable.setPublicationId(publication);
        liketable.setUserId(user);

        likeRepository.save(liketable);
        return liketable;
    }
}
