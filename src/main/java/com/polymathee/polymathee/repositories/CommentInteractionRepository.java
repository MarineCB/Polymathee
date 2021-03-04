package com.polymathee.polymathee.repositories;

import com.polymathee.polymathee.dao.CommentInteraction;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface CommentInteractionRepository extends CrudRepository<CommentInteraction, Integer>, JpaSpecificationExecutor<CommentInteraction> {


}
