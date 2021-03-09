package com.polymathee.polymathee.services.impl;

import com.polymathee.polymathee.dao.Moderator;
import com.polymathee.polymathee.dao.User;
import com.polymathee.polymathee.dto.ModeratorDto;
import com.polymathee.polymathee.repositories.ModeratorRepository;
import com.polymathee.polymathee.repositories.UserRepository;
import com.polymathee.polymathee.services.ModeratorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ModeratorServiceImpl implements ModeratorService {

    @Autowired
    private ModeratorRepository moderatorrepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public Moderator saveModerator(ModeratorDto moderatorDto) {

        Moderator moderator = new Moderator();
        moderator.setUsername(moderatorDto.getUsername());
        moderator.setPassword(passwordEncoder.encode(moderatorDto.getPassword()));

        moderatorrepository.save(moderator);
        return moderator;
    }

    public User ComparePassword(String password, String UserName) {

        List<Moderator> mod;
        mod = moderatorrepository.findAll();

        User user = new User();

        log.info(UserName);

        for (Moderator moderator : mod) {
            log.info(moderator.getUsername());
            if (UserName.equals(moderator.getUsername())) {
                if(passwordEncoder.matches(password, moderator.getPassword())) {
                    log.info(moderator.getUsername());
                    user = userRepository.findUserByEmail(moderator.getUsername());
                    log.info(user.getEmail());
                } else {
                    return null;
                }
            }
        }
        return user;
    }

    public List<Moderator> getAllModerator(){
 
        return moderatorrepository.findAll();
    }

    public void deleteModerator(int id){
        moderatorrepository.deleteById(id);
    }


}
