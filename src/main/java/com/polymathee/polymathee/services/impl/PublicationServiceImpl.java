package com.polymathee.polymathee.services.impl;

import com.polymathee.polymathee.dao.Publication;
import com.polymathee.polymathee.dao.User;
import com.polymathee.polymathee.dto.PublicationDto;
import com.polymathee.polymathee.repositories.PublicationRepository;
import com.polymathee.polymathee.repositories.UserRepository;
import com.polymathee.polymathee.rsql.CustomRsqlVisitor;
import com.polymathee.polymathee.services.CommentaryInteractionService;
import com.polymathee.polymathee.services.PublicationService;
import com.polymathee.polymathee.services.UsersService;
import cz.jirutka.rsql.parser.RSQLParser;
import cz.jirutka.rsql.parser.ast.Node;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PublicationServiceImpl implements PublicationService {

    @Autowired
    private PublicationRepository publicationRepository;

    @Autowired
    private UserRepository userRepository;

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
    public Publication savePubli(PublicationDto publicationDto) {

        Publication publication = new Publication();
        User user = userRepository.findUserById(publicationDto.getUserId());

        Date date = new Date();
        java.sql.Date sqlDate = new java.sql.Date(date.getTime());


        publication.setUserId(user);
        publication.setTitle(publicationDto.getTitle());
        publication.setContent(publicationDto.getContent());
        publication.setFile(publicationDto.getFile());
        publication.setLikeNumber(publicationDto.getLikeNumber());
        publication.setDownloadNumber(publicationDto.getDownloadNumber());
        publication.setStatus(publicationDto.getStatus());
        publication.setTags(publicationDto.getTags());
        publication.setReport(publicationDto.getReport());
        publication.setDate(sqlDate);

        publicationRepository.save(publication);
        return publication;
    }

    @Override
    public void deletePubli(int id ){

        publicationRepository.deleteById(id);

    }
}
