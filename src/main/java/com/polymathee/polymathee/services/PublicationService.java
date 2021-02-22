package com.polymathee.polymathee.services;

import com.polymathee.polymathee.dao.Publication;

import java.util.List;

public interface PublicationService {

    List<Publication> getPublicationList();
    List<Publication> getPublicationsByUserId(Integer id);
    List<Publication> getPublicationsFilter(String filter);
    Publication savePubli(Publication publication);
    void deletePubli(int id);
}
