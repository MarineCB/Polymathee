package com.polymathee.polymathee.services;

import com.polymathee.polymathee.dao.LikeTable;
import com.polymathee.polymathee.dto.LikeTableDto;

import java.util.List;

public interface LikeTableService {

    List<LikeTable> getLikeTable();

    List<LikeTable> getFavorisByUserId(Integer id);

    void deleteLikeTable(Integer publicationId, Integer userId);

    LikeTable saveLike(LikeTableDto likeTableDto);
}
