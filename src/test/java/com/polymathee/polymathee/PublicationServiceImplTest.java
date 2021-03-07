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
public class PublicationServiceImplTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getPublicationListTest() throws Exception {

        this.mockMvc.perform(get("/api/publications"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":36,\"userId\":{\"id\":1,\"name\":\"Nicolas Thong\",\"email\":\"nazukai94550@gmail.com\",\"strikeNumber\":\"69\",\"role\":\"Student\"},\"title\":\"physique quantique\",\"content\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum\",\"file\":\"1-physique.pdf\",\"likeNumber\":70,\"downloadNumber\":9,\"status\":\"Published\",\"tags\":\"physique,mecanique\",\"report\":6,\"date\":\"2021-03-04T22:11:31.000+00:00\"},{\"id\":37,\"userId\":{\"id\":1,\"name\":\"Nicolas Thong\",\"email\":\"nazukai94550@gmail.com\",\"strikeNumber\":\"69\",\"role\":\"Student\"},\"title\":\"trigger java\",\"content\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum\",\"file\":\"1-informatique.pdf\",\"likeNumber\":50,\"downloadNumber\":15,\"status\":\"Published\",\"tags\":\"informatique,java,javax\",\"report\":1,\"date\":\"2021-03-04T22:16:41.000+00:00\"},{\"id\":38,\"userId\":{\"id\":2,\"name\":\"Julien Quach\",\"email\":\"quachjulien@gmail.com\",\"strikeNumber\":\"42\",\"role\":\"Student\"},\"title\":\"BasketBall\",\"content\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum\",\"file\":\"2-sport.pdf\",\"likeNumber\":20,\"downloadNumber\":11,\"status\":\"Published\",\"tags\":\"echauffement,muscle\",\"report\":4,\"date\":\"2021-03-04T22:21:20.000+00:00\"},{\"id\":40,\"userId\":{\"id\":6,\"name\":\"viguier theo\",\"email\":\"viguier.theo@efrei.net\",\"strikeNumber\":\"17\",\"role\":\"Administrator\"},\"title\":\"Sport,foot\",\"content\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum\",\"file\":\"2-sport.pdf\",\"likeNumber\":40,\"downloadNumber\":14,\"status\":\"Saved\",\"tags\":\"muscle,etirement\",\"report\":13,\"date\":\"2021-03-04T22:35:41.000+00:00\"},{\"id\":41,\"userId\":{\"id\":4,\"name\":\"Burg Marion\",\"email\":\"burg.marion@efrei.net\",\"strikeNumber\":\"35\",\"role\":\"Moderator\"},\"title\":\"molière le boss\",\"content\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum\",\"file\":\"1-francais.pdf\",\"likeNumber\":60,\"downloadNumber\":35,\"status\":\"Saved\",\"tags\":\"orthographe,vocabulaire\",\"report\":20,\"date\":\"2021-03-04T22:36:49.000+00:00\"},{\"id\":42,\"userId\":{\"id\":4,\"name\":\"Burg Marion\",\"email\":\"burg.marion@efrei.net\",\"strikeNumber\":\"35\",\"role\":\"Moderator\"},\"title\":\"molière le boss\",\"content\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum\",\"file\":\"2-francais1.pdf\",\"likeNumber\":60,\"downloadNumber\":35,\"status\":\"To_Treat\",\"tags\":\"orthographe,vocabulaire\",\"report\":20,\"date\":\"2021-03-04T22:47:10.000+00:00\"},{\"id\":43,\"userId\":{\"id\":5,\"name\":\"Mohammed sayed\",\"email\":\"sayed.moha@efrei.net\",\"strikeNumber\":\"36\",\"role\":\"Moderator\"},\"title\":\"molière le boss\",\"content\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum\",\"file\":\"2-francais2.pdf\",\"likeNumber\":60,\"downloadNumber\":35,\"status\":\"To_Treat\",\"tags\":\"orthographe,vocabulaire\",\"report\":20,\"date\":\"2021-03-04T22:47:18.000+00:00\"},{\"id\":44,\"userId\":{\"id\":5,\"name\":\"Mohammed sayed\",\"email\":\"sayed.moha@efrei.net\",\"strikeNumber\":\"36\",\"role\":\"Moderator\"},\"title\":\"molière le boss\",\"content\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum\",\"file\":\"2-francais3.pdf\",\"likeNumber\":60,\"downloadNumber\":35,\"status\":\"To_Treat\",\"tags\":\"orthographe,vocabulaire\",\"report\":20,\"date\":\"2021-03-04T22:47:22.000+00:00\"},{\"id\":45,\"userId\":{\"id\":7,\"name\":\"alexis. R\",\"email\":\"alexis.ribat@efrei.net\",\"strikeNumber\":\"2\",\"role\":\"Student\"},\"title\":\"molière le boss\",\"content\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum\",\"file\":\"2-Partenariat-MAIRIE-CITOYEN (2).pdf\",\"likeNumber\":60,\"downloadNumber\":35,\"status\":\"Published\",\"tags\":\"orthographe,vocabulaire\",\"report\":20,\"date\":\"2021-03-05T14:20:00.000+00:00\"}]\n"));
    }

    @Test
    public void getPublicationsByUserIdTest() throws Exception {

        Integer idUser = 7;

        this.mockMvc.perform(get("/api/publications/user/{id}", idUser))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":45,\"userId\":{\"id\":7,\"name\":\"alexis. R\"," +
                        "\"email\":\"alexis.ribat@efrei.net\",\"strikeNumber\":\"2\",\"role\":\"Student\"}," +
                        "\"title\":\"molière le boss\",\"content\":\"Lorem ipsum dolor sit amet, consectetur " +
                        "adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam" +
                        " sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat" +
                        " lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. " +
                        "Vivamus sed lacus quis nisl pellentesque dictum\",\"file\":\"2-Partenariat-MAIRIE-CITOYEN (2).pdf\"," +
                        "\"likeNumber\":60,\"downloadNumber\":35,\"status\":\"Published\",\"tags\":\"orthographe,vocabulaire\"," +
                        "\"report\":20,\"date\":\"2021-03-05T14:20:00.000+00:00\"}]\n"));
    }
}
