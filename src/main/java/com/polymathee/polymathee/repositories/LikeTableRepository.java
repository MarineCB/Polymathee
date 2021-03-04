package com.polymathee.polymathee.repositories;

import com.polymathee.polymathee.dao.LikeTable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface LikeTableRepository extends CrudRepository<LikeTable, Integer>, JpaSpecificationExecutor<LikeTable> {

    List<LikeTable> findAll();

    @Query("SELECT sdto FROM LikeTable sdto WHERE sdto.userId.id=:id")
    List<LikeTable> findAllByUserId(Integer id);


    @Modifying
    @Query("DELETE FROM LikeTable stfo  WHERE stfo.publicationId.id =:publicationId ")
    void deleteFavoris(Integer publicationId );


}
