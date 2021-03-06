package com.polymathee.polymathee.repositories;

import com.polymathee.polymathee.dao.Commentary;
import com.polymathee.polymathee.dao.LikeTable;
import com.polymathee.polymathee.dao.Moderator;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface ModeratorRepository extends CrudRepository<Moderator, Integer>, JpaSpecificationExecutor<Moderator> {

    Moderator findModeratorById(Integer id);

    List<Moderator> findAll();


}
