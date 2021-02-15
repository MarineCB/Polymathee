package com.polymathee.polymathee.services.impl;

import com.polymathee.polymathee.services.UsersService;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

@Service
public class UsersServiceImpl implements UsersService {

    /*public List<User> getUserList(Connection conn) {

        List<User> userList = new ArrayList<>();
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("select * from users");
            while (rs.next()) {
                User user = new User();
                user.setId(rs.getInt(1));
                user.setRole(rs.getString(2));
                user.setName(rs.getString(3));
                user.setEmail(rs.getString(4));
                userList.add(user);
            }
            System.out.println("list is: " + userList.size());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return userList;
    }*/
}
