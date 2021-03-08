package com.polymathee.polymathee.services.impl;

import com.polymathee.polymathee.dao.Moderator;
import com.polymathee.polymathee.repositories.ModeratorRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.testng.Assert;

import java.util.List;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@ActiveProfiles("test")
@Slf4j
@AutoConfigureMockMvc
public class ModeratorServiceImplTest {

    @Autowired
    private ModeratorRepository moderatorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void comparePasswordTest() {
        String username = "test@gmail.com";
        String password = "test";

        List<Moderator> mod = moderatorRepository.findAll();

        for (Moderator moderator : mod) {

            if (username.equals(moderator.getUsername())) {
                Assert.assertTrue(passwordEncoder.matches(password, moderator.getPassword()));
            }
        }
    }
}
