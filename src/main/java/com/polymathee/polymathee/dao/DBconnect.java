package com.polymathee.polymathee.dao;



import java.sql.Connection;
import java.sql.DriverManager;

public class DBconnect {

    Connection con = null;

    public Connection RetriveConnection () {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection(
                    "jdbc:mysql://polymatheedb.cgrqkcye8otn.eu-west-3.rds.amazonaws.com:3306/polymatheedb", "admin", "polymatheedb");
        } catch (Exception e) {
            System.out.println(e);
        }
        return con;
    }


}











