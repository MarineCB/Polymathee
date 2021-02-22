package com.polymathee.polymathee.services.impl;

import com.polymathee.polymathee.dao.Publication;
import com.polymathee.polymathee.dao.User;
import com.polymathee.polymathee.repositories.PublicationRepository;
import com.polymathee.polymathee.repositories.UserRepository;
import com.polymathee.polymathee.rsql.CustomRsqlVisitor;
import com.polymathee.polymathee.services.PublicationService;
import com.polymathee.polymathee.services.UsersService;
import cz.jirutka.rsql.parser.RSQLParser;
import cz.jirutka.rsql.parser.ast.Node;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublicationServiceImpl implements PublicationService {

    @Autowired
    private PublicationRepository publicationRepository;

    @Override
    public List<Publication> getPublicationList(){
        return publicationRepository.findAll();
    }

    @Override
    public List<Publication> getPublicationsByUserId(Integer id){
        return publicationRepository.findPublicationByIdUser(id);
    }

    @Override
    public List<Publication> getPublicationsFilter(String filter){
        Node rootNode = new RSQLParser().parse(filter);
        Specification<Publication> spec = rootNode.accept(new CustomRsqlVisitor<>());

        return publicationRepository.findAll(spec);
    }

    @Override
    public Publication savePubli(Publication publication) {
        publicationRepository.save(publication);
        return publication;
    }

    @Override
    public void deletePubli(int id ){

        publicationRepository.deleteById(id);

    }
}
