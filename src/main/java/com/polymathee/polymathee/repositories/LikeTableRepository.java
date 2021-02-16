package com.polymathee.polymathee.repositories;

import com.polymathee.polymathee.dao.Commentary;
import com.polymathee.polymathee.dao.LikeTable;
import com.polymathee.polymathee.dao.Publication;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface LikeTableRepository extends CrudRepository<LikeTable, Integer>, JpaSpecificationExecutor<LikeTable> {

    List<LikeTable> findAll();
}
