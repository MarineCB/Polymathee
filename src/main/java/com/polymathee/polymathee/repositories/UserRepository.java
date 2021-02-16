package com.polymathee.polymathee.repositories;

import com.polymathee.polymathee.dao.User;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface UserRepository extends CrudRepository<User, Integer>, JpaSpecificationExecutor<User> {
    List<User> findAll();


}
