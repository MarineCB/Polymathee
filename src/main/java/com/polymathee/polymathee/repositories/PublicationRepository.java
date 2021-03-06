package com.polymathee.polymathee.repositories;

import com.polymathee.polymathee.dao.Publication;

import com.polymathee.polymathee.enums.StateEnum;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

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

    @Query("SELECT s FROM Publication s WHERE s.tags LIKE :tag AND s.status = 'Published'")
    List<Publication> findPubliByTagAndStatus(String tag);

    @Query("SELECT s FROM Publication s LEFT JOIN User u ON s.userId.id = u.id WHERE u.name LIKE :name AND s.status = 'Published'")
    List<Publication> findPubliByUserIdAndStatus(String name);

    List<Publication> findAllByStatus(StateEnum status);

    @Modifying
    @Query("UPDATE Publication p SET  p.file = :file  WHERE p.id = :id")
    void updateFileById(int id, String file);









}
