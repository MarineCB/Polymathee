package com.polymathee.polymathee.services.impl;

import com.polymathee.polymathee.dao.User;
import com.polymathee.polymathee.repositories.UserRepository;
import com.polymathee.polymathee.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsersServiceImpl implements UsersService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getUserList(){
       return userRepository.findAll();
    }

    @Override
    public User getUserByID(Integer id){
        return userRepository.findUserById(id);
    }


}
