package com.polymathee.polymathee.services.impl;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@ActiveProfiles("test")
@Slf4j
@AutoConfigureMockMvc
public class LikeTableServiceImplTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getLikeTableTest() throws Exception {

        this.mockMvc.perform(get("/api/favoris"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":29,\"userId\":{\"id\":1,\"name\":\"Nicolas Thong\"," +
                    "\"email\":\"nazukai94550@gmail.com\",\"strikeNumber\":\"69\",\"role\":\"Student\"}," +
                    "\"publicationId\":{\"id\":40,\"userId\":{\"id\":6,\"name\":\"viguier theo\"," +
                    "\"email\":\"viguier.theo@efrei.net\",\"strikeNumber\":\"17\",\"role\":\"Administrator\"}," +
                    "\"title\":\"Sport,foot\",\"content\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
                    " Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus " +
                    "pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum " +
                    "tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque " +
                    "dictum\",\"file\":\"2-sport.pdf\",\"likeNumber\":40,\"downloadNumber\":14,\"status\":\"Saved\"," +
                    "\"tags\":\"muscle,etirement\",\"report\":13,\"date\":\"2021-03-04T22:35:41.000+00:00\"}}," +
                    "{\"id\":60,\"userId\":{\"id\":2,\"name\":\"Julien Quach\",\"email\":\"quachjulien@gmail.com\"," +
                    "\"strikeNumber\":\"42\",\"role\":\"Student\"},\"publicationId\":{\"id\":44,\"userId\":{\"id\":5," +
                    "\"name\":\"Mohammed sayed\",\"email\":\"sayed.moha@efrei.net\",\"strikeNumber\":\"36\"," +
                    "\"role\":\"Moderator\"},\"title\":\"molière le boss\",\"content\":\"Lorem ipsum dolor sit amet," +
                    " consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam" +
                    " sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus" +
                    " egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus " +
                    "quis nisl pellentesque dictum\",\"file\":\"2-francais3.pdf\",\"likeNumber\":60,\"downloadNumber\":35," +
                    "\"status\":\"To_Treat\",\"tags\":\"orthographe,vocabulaire\",\"report\":20," +
                    "\"date\":\"2021-03-04T22:47:22.000+00:00\"}}]\n"));
    }

    @Test
    public void getFavorisByUserIdTest() throws Exception {

        Integer idUser = 1;

        this.mockMvc.perform(get("/api/favoris/{id}", idUser))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":29,\"userId\":{\"id\":1,\"name\":\"Nicolas Thong\"," +
                    "\"email\":\"nazukai94550@gmail.com\",\"strikeNumber\":\"69\",\"role\":\"Student\"}," +
                    "\"publicationId\":{\"id\":40,\"userId\":{\"id\":6,\"name\":\"viguier theo\"," +
                    "\"email\":\"viguier.theo@efrei.net\",\"strikeNumber\":\"17\",\"role\":\"Administrator\"}," +
                    "\"title\":\"Sport,foot\",\"content\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
                    " Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus " +
                    "pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum" +
                    " tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque " +
                    "dictum\",\"file\":\"2-sport.pdf\",\"likeNumber\":40,\"downloadNumber\":14,\"status\":\"Saved\"," +
                    "\"tags\":\"muscle,etirement\",\"report\":13,\"date\":\"2021-03-04T22:35:41.000+00:00\"}}]\n"));
    }
}
