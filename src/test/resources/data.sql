DROP ALL OBJECTS;

CREATE TABLE Users
(
  user_id INT AUTO_INCREMENT NOT NULL,
  user_role ENUM('Student', 'Moderator', 'Administrator') NOT NULL,
  user_name VARCHAR(30) NOT NULL,
  user_email VARCHAR(50) NOT NULL,
  strike_number INT,

  PRIMARY KEY (user_id)
);

INSERT INTO Users (`user_id`,`user_email`,`user_role`,`user_name`,`strike_number`) VALUES (1,'nazukai94550@gmail.com','Student','Nicolas Thong',69);
INSERT INTO Users (`user_id`,`user_email`,`user_role`,`user_name`,`strike_number`) VALUES (2,'quachjulien@gmail.com','Student','Julien Quach',42);
INSERT INTO Users (`user_id`,`user_email`,`user_role`,`user_name`,`strike_number`) VALUES (3,'ambre.millot@efrei.net','Student','Ambre Millot',0);
INSERT INTO Users (`user_id`,`user_email`,`user_role`,`user_name`,`strike_number`) VALUES (4,'burg.marion@efrei.net','Moderator','Burg Marion',35);
INSERT INTO Users (`user_id`,`user_email`,`user_role`,`user_name`,`strike_number`) VALUES (5,'sayed.moha@efrei.net','Moderator','Mohammed sayed',36);
INSERT INTO Users (`user_id`,`user_email`,`user_role`,`user_name`,`strike_number`) VALUES (6,'viguier.theo@efrei.net','Administrator','viguier theo',17);
INSERT INTO Users (`user_id`,`user_email`,`user_role`,`user_name`,`strike_number`) VALUES (7,'alexis.ribat@efrei.net','Student','alexis. R',2);


CREATE TABLE publication
(
  publication_id INT AUTO_INCREMENT NOT NULL,
  user_id INT NOT NULL,
  publication_title VARCHAR(30) NOT NULL,
  publication_content VARCHAR(500),
  publication_file VARCHAR(100),
  publication_like_number INT,
  publication_download_number INT,
  publication_status ENUM('Saved', 'To_Treat', 'Published','Rejected') NOT NULL,
  publication_tags VARCHAR(1000) NOT NULL,
  publication_report INT NOT NULL,
  publication_date DATETIME,

  PRIMARY KEY (publication_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

INSERT INTO publication (`publication_id`,`user_id`,`publication_title`,`publication_content`,`publication_file`,`publication_like_number`,`publication_download_number`,`publication_status`,`publication_tags`,`publication_report`,`publication_date`)
VALUES (36,1,'physique quantique','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum','1-physique.pdf',70,9,'Published','physique,mecanique',6,'2021-03-04 23:11:31');
INSERT INTO publication (`publication_id`,`user_id`,`publication_title`,`publication_content`,`publication_file`,`publication_like_number`,`publication_download_number`,`publication_status`,`publication_tags`,`publication_report`,`publication_date`)
VALUES (37,1,'trigger java','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum','1-informatique.pdf',50,15,'Published','informatique,java,javax',1,'2021-03-04 23:16:41');
INSERT INTO publication (`publication_id`,`user_id`,`publication_title`,`publication_content`,`publication_file`,`publication_like_number`,`publication_download_number`,`publication_status`,`publication_tags`,`publication_report`,`publication_date`)
VALUES (38,2,'BasketBall','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum','2-sport.pdf',20,11,'Published','echauffement,muscle',4,'2021-03-04 23:21:20');
INSERT INTO publication (`publication_id`,`user_id`,`publication_title`,`publication_content`,`publication_file`,`publication_like_number`,`publication_download_number`,`publication_status`,`publication_tags`,`publication_report`,`publication_date`)
VALUES (40,6,'Sport,foot','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum','2-sport.pdf',40,14,'Saved','muscle,etirement',13,'2021-03-04 23:35:41');
INSERT INTO publication (`publication_id`,`user_id`,`publication_title`,`publication_content`,`publication_file`,`publication_like_number`,`publication_download_number`,`publication_status`,`publication_tags`,`publication_report`,`publication_date`)
VALUES (41,4,'molière le boss','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum','1-francais.pdf',60,35,'Saved','orthographe,vocabulaire',20,'2021-03-04 23:36:49');
INSERT INTO publication (`publication_id`,`user_id`,`publication_title`,`publication_content`,`publication_file`,`publication_like_number`,`publication_download_number`,`publication_status`,`publication_tags`,`publication_report`,`publication_date`)
VALUES (42,4,'molière le boss','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum','2-francais1.pdf',60,35,'To_Treat','orthographe,vocabulaire',20,'2021-03-04 23:47:10');
INSERT INTO publication (`publication_id`,`user_id`,`publication_title`,`publication_content`,`publication_file`,`publication_like_number`,`publication_download_number`,`publication_status`,`publication_tags`,`publication_report`,`publication_date`)
VALUES (43,5,'molière le boss','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum','2-francais2.pdf',60,35,'To_Treat','orthographe,vocabulaire',20,'2021-03-04 23:47:18');
INSERT INTO publication (`publication_id`,`user_id`,`publication_title`,`publication_content`,`publication_file`,`publication_like_number`,`publication_download_number`,`publication_status`,`publication_tags`,`publication_report`,`publication_date`)
VALUES (44,5,'molière le boss','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum','2-francais3.pdf',60,35,'To_Treat','orthographe,vocabulaire',20,'2021-03-04 23:47:22');
INSERT INTO publication (`publication_id`,`user_id`,`publication_title`,`publication_content`,`publication_file`,`publication_like_number`,`publication_download_number`,`publication_status`,`publication_tags`,`publication_report`,`publication_date`)
VALUES (45,7,'molière le boss','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur mauris nec molestie elementum. In consequat quam sit amet dui maximus pharetra. Integer maximus ipsum ac arcu sollicitudin, at placerat lectus egestas. Nullam dictum tincidunt turpis vitae gravida. Ut id porta ipsum. Vivamus sed lacus quis nisl pellentesque dictum','2-Partenariat-MAIRIE-CITOYEN (2).pdf',60,35,'Published','orthographe,vocabulaire',20,'2021-03-05 15:20:00');


CREATE TABLE commentary
(
  commentary_id INT AUTO_INCREMENT NOT NULL,
  commentary_content VARCHAR(500),
  commentary_upvote INT NOT NULL,
  commentary_downvote INT NOT NULL,
  commentary_report INT NOT NULL,
  father_comment INT,
  user_id INT NOT NULL,
  publication_id INT NOT NULL,
  commentary_date DATETIME,

  PRIMARY KEY (commentary_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (publication_id) REFERENCES publication(publication_id)
);

INSERT INTO commentary (`commentary_id`,`commentary_content`,`commentary_upvote`,`commentary_downvote`,`commentary_report`,`user_id`,`commentary_date`,`publication_id`) VALUES (24,'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',12,6,0,1,'2021-02-27',38);
INSERT INTO commentary (`commentary_id`,`commentary_content`,`commentary_upvote`,`commentary_downvote`,`commentary_report`,`user_id`,`commentary_date`,`publication_id`) VALUES (25,'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',8,7,4,1,'2021-02-27',42);
INSERT INTO commentary (`commentary_id`,`commentary_content`,`commentary_upvote`,`commentary_downvote`,`commentary_report`,`user_id`,`commentary_date`,`publication_id`) VALUES (26,'rrrrrrrrrrrrrrrrrrrrrrrrrr',0,9,0,2,'2021-03-01',45);
INSERT INTO commentary (`commentary_id`,`commentary_content`,`commentary_upvote`,`commentary_downvote`,`commentary_report`,`user_id`,`commentary_date`,`publication_id`) VALUES (27,'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',0,8,0,2,'2021-03-01',36);

CREATE TABLE liketable
(
  like_id INT AUTO_INCREMENT NOT NULL,
  user_id INT NOT NULL,
  publication_id INT NOT NULL,
  like_post BOOLEAN,

  PRIMARY KEY (like_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (publication_id) REFERENCES publication(publication_id)
);

INSERT INTO liketable (`like_id`,`user_id`,`publication_id`) VALUES (29,1,40);
INSERT INTO liketable (`like_id`,`user_id`,`publication_id`) VALUES (60,2,44);

CREATE TABLE commentInteraction
(
  interaction_id INT AUTO_INCREMENT NOT NULL,
  user_id INT NOT NULL,
  commentary_id INT NOT NULL,
  vote BOOLEAN,
  PRIMARY KEY (interaction_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (commentary_id) REFERENCES commentary(commentary_id)
);

INSERT INTO commentInteraction (`interaction_id`,`user_id`,`commentary_id`,`vote`) VALUES (18,2,24,1);
INSERT INTO commentInteraction (`interaction_id`,`user_id`,`commentary_id`,`vote`) VALUES (19,2,25,0);
INSERT INTO commentInteraction (`interaction_id`,`user_id`,`commentary_id`,`vote`) VALUES (21,2,24,1);
INSERT INTO commentInteraction (`interaction_id`,`user_id`,`commentary_id`,`vote`) VALUES (22,2,25,1);
INSERT INTO commentInteraction (`interaction_id`,`user_id`,`commentary_id`,`vote`) VALUES (23,2,24,1);

CREATE TABLE Moderator
(
  moderator_id INT AUTO_INCREMENT NOT NULL,
  moderator_password varchar(250),
  moderator_username varchar(250),

  PRIMARY KEY (moderator_id)
);

INSERT INTO Moderator (`moderator_id`,`moderator_password`,`moderator_username`) VALUES (1,'$2a$10$wG6aLb9pApELt7vzISKdP.vTlHKFtBXfCDZBSEeaXXjFBoy6FmGgm','test@gmail.com');
INSERT INTO Moderator (`moderator_id`,`moderator_password`,`moderator_username`) VALUES (2,'$2a$10$pMmS0.hxHaAta1TI8BbSWekjh6ikioC22xcKOEvkcQgrZv5F.cU.i','test2@gmail.com');
