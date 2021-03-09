package com.polymathee.polymathee;

import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
@Slf4j
@AutoConfigureMockMvc
public class UsersServiceImplTest {

    @Autowired
    private MockMvc mockMvc;


    @Test
    public void getUserListTest() throws Exception {

        this.mockMvc.perform(get("/api/users"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":1,\"name\":\"Nicolas Thong\"," +
                    "\"email\":\"nazukai94550@gmail.com\",\"strikeNumber\":\"69\",\"role\":\"Student\"},{\"id\":2," +
                    "\"name\":\"Julien Quach\",\"email\":\"quachjulien@gmail.com\",\"strikeNumber\":\"42\"," +
                    "\"role\":\"Student\"},{\"id\":3,\"name\":\"Ambre Millot\",\"email\":\"ambre.millot@efrei.net\"," +
                    "\"strikeNumber\":\"0\",\"role\":\"Student\"},{\"id\":4,\"name\":\"Burg Marion\"," +
                    "\"email\":\"burg.marion@efrei.net\",\"strikeNumber\":\"35\",\"role\":\"Moderator\"}," +
                    "{\"id\":5,\"name\":\"Mohammed sayed\",\"email\":\"sayed.moha@efrei.net\"," +
                    "\"strikeNumber\":\"36\",\"role\":\"Moderator\"},{\"id\":6,\"name\":\"viguier theo\"," +
                    "\"email\":\"viguier.theo@efrei.net\",\"strikeNumber\":\"17\",\"role\":\"Administrator\"}," +
                    "{\"id\":7,\"name\":\"alexis. R\",\"email\":\"alexis.ribat@efrei.net\",\"strikeNumber\":\"2\"," +
                    "\"role\":\"Student\"}]"));
    }

    @Test
    public void getUserByIDTest() throws Exception {

        Integer idUser = 1;

        this.mockMvc.perform(get("/api/user/{id}", idUser))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().json("{\"id\":1,\"name\":\"Nicolas Thong\"," +
                        "\"email\":\"nazukai94550@gmail.com\",\"strikeNumber\":\"69\",\"role\":\"Student\"}\n"));
    }

    @Test
    public void FindUserByEmailTest() throws Exception {

        String email = "quachjulien@gmail.com";

        this.mockMvc.perform(get("/api/user/email")
                .param("email", email))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().json("{\"id\":2,\"name\":\"Julien Quach\"," +
                        "\"email\":\"quachjulien@gmail.com\",\"strikeNumber\":\"42\",\"role\":\"Student\"}\n"));
    }
}
