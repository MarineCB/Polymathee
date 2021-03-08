package com.polymathee.polymathee;

import com.polymathee.polymathee.dao.Moderator;
import com.polymathee.polymathee.repositories.ModeratorRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
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
