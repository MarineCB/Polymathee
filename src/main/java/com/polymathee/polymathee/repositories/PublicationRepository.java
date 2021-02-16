package com.polymathee.polymathee.repositories;

import com.polymathee.polymathee.dao.Publication;
import com.polymathee.polymathee.dao.User;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface PublicationRepository extends CrudRepository<Publication, Integer>, JpaSpecificationExecutor<Publication> {

    List<Publication> findAll();

}
