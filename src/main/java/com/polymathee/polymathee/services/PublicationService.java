package com.polymathee.polymathee.services;

import com.polymathee.polymathee.dao.Publication;
import com.polymathee.polymathee.dao.User;

import java.util.List;

public interface PublicationService {

    List<Publication> getPublicationList();
    List<Publication> getPublicationsByUserId(Integer id);
}
