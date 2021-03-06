package com.polymathee.polymathee.services.impl;

import com.polymathee.polymathee.dao.Moderator;
import com.polymathee.polymathee.dto.ModeratorDto;
import com.polymathee.polymathee.repositories.ModeratorRepository;
import com.polymathee.polymathee.services.ModeratorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.List;

@Service
@Slf4j
public class ModeratorServiceImpl implements ModeratorService {

    @Autowired
    private ModeratorRepository moderatorrepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public Moderator saveModerator(ModeratorDto moderatorDto) throws InvalidKeySpecException, NoSuchAlgorithmException {

        Moderator moderator = new Moderator();
        moderator.setUsername(moderatorDto.getUsername());
        moderator.setPassword(passwordEncoder.encode(moderatorDto.getPassword()));

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

        Boolean bool = null;
        List<Moderator> mod;
        mod = moderatorrepository.findAll();

        for (Moderator moderator : mod) {

            if (UserName.equals(moderator.getUsername())) {

                bool = passwordEncoder.matches(password, moderator.getPassword());

            } else if (!UserName.equals(moderator.getUsername())) {
                bool =  false;
            }
        }
        return bool;
    }


}
