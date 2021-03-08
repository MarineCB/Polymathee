package com.polymathee.polymathee.services.impl;

import com.polymathee.polymathee.dao.Commentary;
import com.polymathee.polymathee.dao.Publication;
import com.polymathee.polymathee.dao.User;
import com.polymathee.polymathee.dto.PublicationDto;

import com.polymathee.polymathee.dto.PublicationUpdateDto;
import com.polymathee.polymathee.enums.StateEnum;

import com.polymathee.polymathee.repositories.PublicationRepository;
import com.polymathee.polymathee.repositories.UserRepository;
import com.polymathee.polymathee.rsql.CustomRsqlVisitor;
import com.polymathee.polymathee.services.PublicationService;
import com.sun.istack.Nullable;
import cz.jirutka.rsql.parser.RSQLParser;
import cz.jirutka.rsql.parser.ast.Node;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.*;

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
    public Publication getPublicationsById(Integer id){
        return publicationRepository.findPublicationById(id);
    }

    @Override
    public List<Publication> getPublicationsFilter(String filter){
        Node rootNode = new RSQLParser().parse(filter);
        Specification<Publication> spec = rootNode.accept(new CustomRsqlVisitor<>());

        return publicationRepository.findAll(spec);
    }

    @Override
    public Publication savePubli(PublicationDto publicationDto) {

        String file = "";
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


    @Override
    public List<Publication> getPublicationsByStatus(StateEnum status){
        return publicationRepository.findPublicationByStatus(status);
    }

    @Override
    public List<Publication> getDESCLikeNumber(){
        return publicationRepository.GetPublicationDESCLikeNumber();
    }

    @Override
    public List<Publication> getDESCDate(){
        return publicationRepository.GetPublicationDESCDate();
    }

    @Override
    public List<String> getAllTags(){

        List<Publication> allPubli = publicationRepository.findAllByStatus(StateEnum.Published);
        List<String> resultTagList = new ArrayList<>();
        List<String> finalTagList = new ArrayList<>();

        for (Publication publication : allPubli) {
            String[] strArray = SplitString(publication.getTags());
            List<String> tagList = Arrays.asList(strArray);
            resultTagList.addAll(tagList);
        }

        finalTagList = removeDuplicates(resultTagList);
        return finalTagList;
    }


    @Override
    public List<Publication> getPubliTagUser(@Nullable String tag, @Nullable String name){

        List<Publication> publiTagList;
        List<Publication> publiTagList2 = new ArrayList<>();

        List<Publication> publiUserList;
        List<Publication> publiUserList2 = new ArrayList<>();

        if (tag != null){
            String[] tags = SplitString(tag);
            List<String> tagList = Arrays.asList(tags);

            for (String t : tagList) {
                String tg = "%" + t + "%";
                publiTagList = publicationRepository.findPubliByTagAndStatus(tg);
                publiTagList2.addAll(publiTagList);
            }
        }

        if (name != null) {
            String[] nameUser = SplitString(name);
            List<String> nameList = Arrays.asList(nameUser);

            for (String n : nameList) {
                String nu = "%" + n + "%";
                publiUserList = publicationRepository.findPubliByUserIdAndStatus(nu);
                publiUserList2.addAll(publiUserList);
            }
        }

        publiTagList2.addAll(publiUserList2);
        return new ArrayList<>(removeDuplicates(publiTagList2));
    }

    @Override
    public List<Publication> getPubliReport(int report){

        List<Publication> publiTagList = publicationRepository.findPubliByReportDesc(report);

        return publiTagList;
    }

    @Override
    public Publication updatePublicationById(Integer id, PublicationUpdateDto publication) {
        Optional<Publication> publicationUpdate = publicationRepository.findById(id);

        Date date = new Date();
        java.sql.Date sqlDate = new java.sql.Date(date.getTime());

        if(publicationUpdate.isPresent()){
            Publication newPublication = publicationUpdate.get();
            newPublication.setContent(publication.getContent());
            newPublication.setTitle(publication.getTitle());
            newPublication.setTags(publication.getTags());
            newPublication.setFile(publication.getFile());
            newPublication.setDate(sqlDate);

            return publicationRepository.save(newPublication);
        } else {
            return null;
        }
    }

    @Override
    public Publication updatePubicationPublished(Integer id,StateEnum status) {
        Optional<Publication> publicationUpdate = publicationRepository.findById(id);

        if(publicationUpdate.isPresent()){
            Publication newPublication = publicationUpdate.get();
            newPublication.setStatus(status);
            return publicationRepository.save(newPublication);
        } else {
            return null;
        }
    }

    @Override
    public Publication updatePubicationDownloadNumber(Integer id) {
        Optional<Publication> publicationUpdate = publicationRepository.findById(id);

        if(publicationUpdate.isPresent()){
            Publication newPublication = publicationUpdate.get();
            newPublication.setDownloadNumber(newPublication.getDownloadNumber()+1);
            return publicationRepository.save(newPublication);
        } else {
            return null;
        }
    }

    @Override
    public Publication updateReport(Integer id) {
        Optional<Publication> publicationUpdate = publicationRepository.findById(id);

        if(publicationUpdate.isPresent()){
            Publication newPublication = publicationUpdate.get();
            newPublication.setReport(newPublication.getReport()+1);
            return publicationRepository.save(newPublication);
        } else {
            return null;
        }
    }

    public String[] SplitString(String tags) {
        String[] strArray = tags.split(",");
        return strArray;
    }

    public <T> List<T> removeDuplicates(List<T> list) {
        List<T> newList = new ArrayList<T>();

        for (T publication : list) {
            if (!newList.contains(publication)) {
                newList.add(publication);
            }
        }
        return newList;
    }


}
