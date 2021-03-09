package com.polymathee.polymathee.services;

import com.polymathee.polymathee.dao.Moderator;
import com.polymathee.polymathee.dao.User;
import com.polymathee.polymathee.dto.ModeratorDto;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;

public interface ModeratorService {

    Moderator saveModerator(ModeratorDto moderatorDto) throws InvalidKeySpecException, NoSuchAlgorithmException;

    User ComparePassword(String password, String UserName) throws InvalidKeySpecException, NoSuchAlgorithmException;

    List<Moderator> getAllModerator();

    void deleteModerator(int id);
}
