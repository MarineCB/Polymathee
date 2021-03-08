package com.polymathee.polymathee.services.impl;

import org.junit.jupiter.api.Test;
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
public class CommentaryServiceImplTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getCommentaryListTest() throws Exception {

        this.mockMvc.perform(get("/api/comments"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":24,\"content\":\"rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr\"," +
                    "\"upvote\":12,\"downvote\":6,\"report\":0,\"date\":\"2021-02-26T23:00:00.000+00:00\"," +
                    "\"userId\":{\"id\":1,\"name\":\"Nicolas Thong\",\"email\":\"nazukai94550@gmail.com\"," +
                    "\"strikeNumber\":\"69\",\"role\":\"Student\"},\"publicationId\":{\"id\":38," +
                    "\"userId\":{\"id\":2,\"name\":\"Julien Quach\",\"email\":\"quachjulien@gmail.com\"," +
                    "\"strikeNumber\":\"42\",\"role\":\"Student\"},\"title\":\"BasketBall\"," +
                    "\"content\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur " +
                    "mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus" +
                    " ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida." +
                    " Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum\",\"file\":\"2-sport.pdf\"," +
                    "\"likeNumber\":20,\"downloadNumber\":11,\"status\":\"Published\",\"tags\":\"echauffement,muscle\"," +
                    "\"report\":4,\"date\":\"2021-03-04T22:21:20.000+00:00\"}},{\"id\":25," +
                    "\"content\":\"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\",\"upvote\":8,\"downvote\":7," +
                    "\"report\":4,\"date\":\"2021-02-26T23:00:00.000+00:00\",\"userId\":{\"id\":1,\"name\":\"Nicolas Thong\"," +
                    "\"email\":\"nazukai94550@gmail.com\",\"strikeNumber\":\"69\",\"role\":\"Student\"}," +
                    "\"publicationId\":{\"id\":42,\"userId\":{\"id\":4,\"name\":\"Burg Marion\"," +
                    "\"email\":\"burg.marion@efrei.net\",\"strikeNumber\":\"35\",\"role\":\"Moderator\"}," +
                    "\"title\":\"molière le boss\",\"content\":\"Lorem ipsum dolor sit amet, consectetur adipiscing" +
                    " elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui " +
                    "maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. " +
                    "Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl" +
                    " pellentesque dictum\",\"file\":\"2-francais1.pdf\",\"likeNumber\":60,\"downloadNumber\":35," +
                    "\"status\":\"To_Treat\",\"tags\":\"orthographe,vocabulaire\",\"report\":20," +
                    "\"date\":\"2021-03-04T22:47:10.000+00:00\"}},{\"id\":26,\"content\":\"rrrrrrrrrrrrrrrrrrrrrrrrrr\"," +
                    "\"upvote\":0,\"downvote\":9,\"report\":0,\"date\":\"2021-02-28T23:00:00.000+00:00\"," +
                    "\"userId\":{\"id\":2,\"name\":\"Julien Quach\",\"email\":\"quachjulien@gmail.com\"," +
                    "\"strikeNumber\":\"42\",\"role\":\"Student\"},\"publicationId\":{\"id\":45,\"userId\":{\"id\":7," +
                    "\"name\":\"alexis. R\",\"email\":\"alexis.ribat@efrei.net\",\"strikeNumber\":\"2\"," +
                    "\"role\":\"Student\"},\"title\":\"molière le boss\",\"content\":\"Lorem ipsum dolor sit amet," +
                    " consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat" +
                    " quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat" +
                    " lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed" +
                    " lacus quis nisl pellentesque dictum\",\"file\":\"2-Partenariat-MAIRIE-CITOYEN (2).pdf\"," +
                    "\"likeNumber\":60,\"downloadNumber\":35,\"status\":\"Published\",\"tags\":\"orthographe,vocabulaire\"," +
                    "\"report\":20,\"date\":\"2021-03-05T14:20:00.000+00:00\"}},{\"id\":27," +
                    "\"content\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\",\"upvote\":0,\"downvote\":8,\"report\":0," +
                    "\"date\":\"2021-02-28T23:00:00.000+00:00\",\"userId\":{\"id\":2,\"name\":\"Julien Quach\"," +
                    "\"email\":\"quachjulien@gmail.com\",\"strikeNumber\":\"42\",\"role\":\"Student\"}," +
                    "\"publicationId\":{\"id\":36,\"userId\":{\"id\":1,\"name\":\"Nicolas Thong\"," +
                    "\"email\":\"nazukai94550@gmail.com\",\"strikeNumber\":\"69\",\"role\":\"Student\"}," +
                    "\"title\":\"physique quantique\",\"content\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
                    " Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. " +
                    "Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt " +
                    "turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum\"," +
                    "\"file\":\"1-physique.pdf\",\"likeNumber\":70,\"downloadNumber\":9,\"status\":\"Published\"," +
                    "\"tags\":\"physique,mecanique\",\"report\":6,\"date\":\"2021-03-04T22:11:31.000+00:00\"}}]\n"));
    }

    @Test
    public void getCommentaryByIdPublicationTest() throws Exception {

        Integer idPublication = 38;

        this.mockMvc.perform(get("/api/comments/{id}", idPublication))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":24,\"content\":\"rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr\"," +
                    "\"upvote\":12,\"downvote\":6,\"report\":0,\"date\":\"2021-02-26T23:00:00.000+00:00\"," +
                    "\"userId\":{\"id\":1,\"name\":\"Nicolas Thong\",\"email\":\"nazukai94550@gmail.com\"," +
                    "\"strikeNumber\":\"69\",\"role\":\"Student\"},\"publicationId\":{\"id\":38," +
                    "\"userId\":{\"id\":2,\"name\":\"Julien Quach\",\"email\":\"quachjulien@gmail.com\"," +
                    "\"strikeNumber\":\"42\",\"role\":\"Student\"},\"title\":\"BasketBall\"," +
                    "\"content\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur " +
                    "mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus" +
                    " ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae " +
                    "gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum\"," +
                    "\"file\":\"2-sport.pdf\",\"likeNumber\":20,\"downloadNumber\":11,\"status\":\"Published\"," +
                    "\"tags\":\"echauffement,muscle\",\"report\":4,\"date\":\"2021-03-04T22:21:20.000+00:00\"}}]"));
    }

    @Test
    public void getCommentaryByIdUserTest() throws Exception {

        Integer idUser = 1;

        this.mockMvc.perform(get("/api/comments/user/{id}", idUser))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":24,\"content\":\"rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr\"," +
                    "\"upvote\":12,\"downvote\":6,\"report\":0,\"date\":\"2021-02-26T23:00:00.000+00:00\"," +
                    "\"userId\":{\"id\":1,\"name\":\"Nicolas Thong\",\"email\":\"nazukai94550@gmail.com\"," +
                    "\"strikeNumber\":\"69\",\"role\":\"Student\"},\"publicationId\":{\"id\":38,\"userId\":{\"id\":2," +
                    "\"name\":\"Julien Quach\",\"email\":\"quachjulien@gmail.com\",\"strikeNumber\":\"42\"," +
                    "\"role\":\"Student\"},\"title\":\"BasketBall\",\"content\":\"Lorem ipsum dolor sit amet," +
                    " consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. " +
                    "In consequat quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin," +
                    " at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum." +
                    " Vivamus sed lacus quis nisl pellentesque dictum\",\"file\":\"2-sport.pdf\",\"likeNumber\":20," +
                    "\"downloadNumber\":11,\"status\":\"Published\",\"tags\":\"echauffement,muscle\",\"report\":4," +
                    "\"date\":\"2021-03-04T22:21:20.000+00:00\"}},{\"id\":25,\"content\":\"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\"," +
                    "\"upvote\":8,\"downvote\":7,\"report\":4,\"date\":\"2021-02-26T23:00:00.000+00:00\"," +
                    "\"userId\":{\"id\":1,\"name\":\"Nicolas Thong\",\"email\":\"nazukai94550@gmail.com\"," +
                    "\"strikeNumber\":\"69\",\"role\":\"Student\"},\"publicationId\":{\"id\":42," +
                    "\"userId\":{\"id\":4,\"name\":\"Burg Marion\",\"email\":\"burg.marion@efrei.net\"," +
                    "\"strikeNumber\":\"35\",\"role\":\"Moderator\"},\"title\":\"molière le boss\"," +
                    "\"content\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque" +
                    " efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra." +
                    " Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum " +
                    "tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl " +
                    "pellentesque dictum\",\"file\":\"2-francais1.pdf\",\"likeNumber\":60,\"downloadNumber\":35," +
                    "\"status\":\"To_Treat\",\"tags\":\"orthographe,vocabulaire\",\"report\":20," +
                    "\"date\":\"2021-03-04T22:47:10.000+00:00\"}}]\n"));
    }
}
