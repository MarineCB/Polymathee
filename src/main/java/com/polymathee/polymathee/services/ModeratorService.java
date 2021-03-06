package com.polymathee.polymathee.services;

import com.polymathee.polymathee.dao.Moderator;
import com.polymathee.polymathee.dto.ModeratorDto;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

public interface ModeratorService {

    Moderator saveModerator(ModeratorDto moderatorDto) throws InvalidKeySpecException, NoSuchAlgorithmException;

    Boolean ComparePassword(String password, String UserName) throws InvalidKeySpecException, NoSuchAlgorithmException;
}
