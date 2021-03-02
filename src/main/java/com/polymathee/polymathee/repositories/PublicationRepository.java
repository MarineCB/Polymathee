package com.polymathee.polymathee.repositories;

import com.polymathee.polymathee.dao.Publication;
import com.polymathee.polymathee.dao.User;

import com.polymathee.polymathee.enums.StateEnum;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface PublicationRepository extends CrudRepository<Publication, Integer>, JpaSpecificationExecutor<Publication> {

    List<Publication> findAll();


    @Query("SELECT p FROM Publication p ORDER BY p.date DESC")
    List<Publication> GetPublicationDESCDate();

    @Query("SELECT p FROM Publication p ORDER BY p.likeNumber DESC")
    List<Publication> GetPublicationDESCLikeNumber();

    void deleteById(Integer id);

    Publication findPublicationById(Integer id);

    @Query("SELECT sdto FROM Publication sdto WHERE sdto.userId.id=:id")
    List<Publication> findPublicationByIdUser(Integer id);

    List<Publication> findPublicationByStatus(StateEnum Status);



}
