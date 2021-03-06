package com.polymathee.polymathee.services.impl;

import com.polymathee.polymathee.dao.CommentInteraction;
import com.polymathee.polymathee.dao.Commentary;
import com.polymathee.polymathee.dao.Moderator;
import com.polymathee.polymathee.dao.User;
import com.polymathee.polymathee.dto.CommentInteractionDto;
import com.polymathee.polymathee.dto.ModeratorDto;
import com.polymathee.polymathee.repositories.LikeTableRepository;
import com.polymathee.polymathee.repositories.ModeratorRepository;
import com.polymathee.polymathee.services.ModeratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.ArrayList;
import java.util.List;

@Service
public class ModeratorServiceImpl implements ModeratorService {

    @Autowired
    private ModeratorRepository moderatorrepository;


    @Override
    public Moderator saveModerator(ModeratorDto moderatorDto) throws InvalidKeySpecException, NoSuchAlgorithmException {

        byte[] bytes = ModeratorHash(moderatorDto.getPassword());
        String s = new String(bytes, StandardCharsets.UTF_8);
        Moderator moderator = new Moderator();
        moderator.setUsername(moderatorDto.getUsername());
        moderator.setPassword(s);

        moderatorrepository.save(moderator);
        return moderator;
    }


    public byte[] ModeratorHash(String password) throws InvalidKeySpecException, NoSuchAlgorithmException {

        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 128);
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
        byte[] hash = factory.generateSecret(spec).getEncoded();
        return hash;
    }


    public Boolean ComparePassword(String password, String UserName) throws InvalidKeySpecException, NoSuchAlgorithmException {

        byte[] bytes;
        Boolean bool = null;
        List<Moderator> mod;
        bytes = ModeratorHash(password);
        String s = new String(bytes, StandardCharsets.UTF_8);
        mod = moderatorrepository.findAll();

        for (Moderator moderator : mod) {

            if (UserName.equals(moderator.getUsername()) == true) {

                if (s.equals(moderator.getPassword()) == true) {
                    bool = true;

                } else if (s.equals(moderator.getPassword()) == false) {
                    bool =  false;
                }

            } else if (UserName.equals(moderator.getUsername()) == false) {
                bool =  false;
            }
        }

        return bool;
    }


}
