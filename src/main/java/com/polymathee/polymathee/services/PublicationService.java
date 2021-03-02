package com.polymathee.polymathee.services;

import com.polymathee.polymathee.dao.Publication;
import com.polymathee.polymathee.dto.PublicationDto;
import com.polymathee.polymathee.enums.StateEnum;

import java.util.List;

public interface PublicationService {

    List<Publication> getPublicationList();
    List<Publication> getPublicationsByUserId(Integer id);
    List<Publication> getPublicationsFilter(String filter);
    Publication savePubli(PublicationDto publicationDto);
    Publication getPublicationsById(Integer id);
    void deletePubli(int id);
    List<Publication> getPublicationsByStatus(StateEnum status);
    List<Publication> getDESCLikeNumber();
    List<Publication> getDESCDate();
}
