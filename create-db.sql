CREATE DATABASE  IF NOT EXISTS `mangadb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mangadb`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: mangadb
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `AccountID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `RoleID` int NOT NULL,
  PRIMARY KEY (`AccountID`),
  UNIQUE KEY `Email` (`Email`),
  KEY `account_ibfk_1` (`RoleID`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`RoleID`) REFERENCES `role` (`RoleID`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'admin1','admin@gmail.com','$2b$10$YUJjFLDB/mop1SbhBioORuw6z4dVHSLiC.YytbUqCS/unfb2QAGjO',1),(2,'translator','trans@gmail.com','123456',2),(3,'reader','reader@gmail.com','$2b$10$jPHWoIGTcowfjZvM2.08DebC7Utx4ax7mtiLz5IsZ95NWIThWs1Wa',3),(16,'reader1','reader1@gmail.com','123456',3),(18,'reader2','reader2@gmail.com','securepassword',3),(24,'reader3','reader3@gmail.com','securepassword',3),(25,'translator 2','trans2@gmail.com','securepassword',2),(26,'admin2','admin2@gmail.com','securepassword',1),(28,'username','reader4@gmail.com','123456',3),(31,'username','reader5@gmail.com','123456',3),(32,'username','reader6@gmail.com','$2b$10$YUJjFLDB/mop1SbhBioORuw6z4dVHSLiC.YytbUqCS/unfb2QAGjO',3),(33,'username','reader10@gmail.com','$2b$10$uxCG1yEXnKX/scOQQcX1LOUzfjsTswrAxZCjSEBKHqzvyEmiPQZqG',3),(46,'username','reader11@gmail.com','$2b$10$IbaN7se8Pu3GaGgfJTkCLeCtgaXYQCOKwFXf5hNtcHvixKjNcyNc2',3);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapter`
--

DROP TABLE IF EXISTS `chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapter` (
  `ChapterID` int NOT NULL AUTO_INCREMENT,
  `ChapterName` varchar(255) NOT NULL,
  `PublishedDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `MangaID` int DEFAULT NULL,
  PRIMARY KEY (`ChapterID`),
  KEY `chapter_ibfk_1` (`MangaID`),
  CONSTRAINT `chapter_ibfk_1` FOREIGN KEY (`MangaID`) REFERENCES `manga` (`MangaID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapter`
--

LOCK TABLES `chapter` WRITE;
/*!40000 ALTER TABLE `chapter` DISABLE KEYS */;
INSERT INTO `chapter` VALUES (1,'Chapter 1','2024-07-11 17:00:00',1),(2,'Chapter 2','2024-07-07 17:00:00',1),(3,'Chapter 3','2024-07-07 17:00:00',1),(7,'Chapter 1','2024-07-07 17:00:00',2),(12,'Chapter 2','2024-07-07 17:00:00',2),(14,'Chapter 3','2024-07-07 17:00:00',2),(15,'Chapter 1','2024-07-23 05:21:14',11),(75,'Chapter 1','2024-08-02 22:51:57',26),(76,'Chapter 2','2024-08-02 22:53:04',26),(77,'Chapter 4','2024-08-02 22:56:16',1),(78,'Chapter 1','2024-08-02 23:01:08',27),(79,'Chapter 2','2024-08-02 23:02:34',27),(82,'Chapter 3','2024-08-06 02:15:52',27);
/*!40000 ALTER TABLE `chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapterimage`
--

DROP TABLE IF EXISTS `chapterimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapterimage` (
  `ChapterID` int NOT NULL,
  `OrderNumber` int NOT NULL,
  `ImageUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ChapterID`,`OrderNumber`),
  CONSTRAINT `chapterimage_ibfk_1` FOREIGN KEY (`ChapterID`) REFERENCES `chapter` (`ChapterID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapterimage`
--

LOCK TABLES `chapterimage` WRITE;
/*!40000 ALTER TABLE `chapterimage` DISABLE KEYS */;
INSERT INTO `chapterimage` VALUES (1,1,'https://cdn.oneesports.vn/cdn-data/sites/4/2022/05/anime-spy-x-family-1.jpg'),(1,2,'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg'),(1,3,'https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/06/yuri-shocked-that-twilight-can-imitate-anybody-perfectly-in-spy-x-family-83.png?q=50&fit=crop&w=750&dpr=1.5'),(2,1,'https://dw9to29mmj727.cloudfront.net/products/1974715469.jpg'),(2,2,'https://dwgkfo5b3odmw.cloudfront.net/manga/thumbs/new/chapter/spyfamily01rev1/thumb_web.jpg'),(3,1,'https://cdn.oneesports.vn/cdn-data/sites/4/2022/05/anime-spy-x-family-1.jpg'),(7,1,'https://lostinanime.com/wp-content/uploads/2024/01/Boku-no-Kokoro-no-Yabai-Yatsu-Season-2-03-46.jpg'),(7,2,'https://i.ytimg.com/vi/ifHvHWdVHcg/maxresdefault.jpg'),(12,1,'https://lostinanime.com/wp-content/uploads/2024/01/Boku-no-Kokoro-no-Yabai-Yatsu-Season-2-03-46.jpg'),(12,2,'https://lostinanime.com/wp-content/uploads/2023/04/Boku-no-Kokoro-no-Yabai-Yatsu-01-47.jpg'),(14,1,'https://lostinanime.com/wp-content/uploads/2024/01/Boku-no-Kokoro-no-Yabai-Yatsu-Season-2-03-46.jpg'),(15,1,'https://ticketgo.vn/uploads/boku-no-hero-academia.png'),(75,1,'https://storage.googleapis.com/storage-manga-website.appspot.com/chapter_images/26/75/1722639117506-01-1.jpg'),(75,2,'https://storage.googleapis.com/storage-manga-website.appspot.com/chapter_images/26/75/1722639118482-03-1.jpg'),(75,3,'https://storage.googleapis.com/storage-manga-website.appspot.com/chapter_images/26/75/1722639119226-04-1.jpg'),(76,1,'https://storage.googleapis.com/storage-manga-website.appspot.com/chapter_images/26/76/1722639184287-01.jpg'),(76,2,'https://storage.googleapis.com/storage-manga-website.appspot.com/chapter_images/26/76/1722639186335-02.jpg'),(77,1,'https://storage.googleapis.com/storage-manga-website.appspot.com/chapter_images/1/77/1722639376923-1.jpg'),(77,2,'https://storage.googleapis.com/storage-manga-website.appspot.com/chapter_images/1/77/1722639378946-2.jpg'),(78,1,'https://storage.googleapis.com/storage-manga-website.appspot.com/chapter_images/27/78/1722639668822-1.jpg'),(78,2,'https://storage.googleapis.com/storage-manga-website.appspot.com/chapter_images/27/78/1722639670932-2.jpg'),(78,3,'https://storage.googleapis.com/storage-manga-website.appspot.com/chapter_images/27/78/1722639671730-3.jpg'),(79,1,'https://storage.googleapis.com/storage-manga-website.appspot.com/chapter_images/27/79/1722639754350-4.jpg'),(79,2,'https://storage.googleapis.com/storage-manga-website.appspot.com/chapter_images/27/79/1722639756418-5.jpg'),(79,3,'https://storage.googleapis.com/storage-manga-website.appspot.com/chapter_images/27/79/1722639757283-6.jpg'),(82,1,'https://storage.googleapis.com/storage-manga-website.appspot.com/chapter_images/27/82/1722910552517-6.jpg'),(82,2,'https://storage.googleapis.com/storage-manga-website.appspot.com/chapter_images/27/82/1722910553968-8.jpg');
/*!40000 ALTER TABLE `chapterimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentchapter`
--

DROP TABLE IF EXISTS `commentchapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentchapter` (
  `AccountID` int NOT NULL,
  `ChapterID` int NOT NULL,
  `CommentDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Context` text,
  PRIMARY KEY (`AccountID`,`ChapterID`,`CommentDate`),
  KEY `commentchapter_ibfk_2` (`ChapterID`),
  CONSTRAINT `commentchapter_ibfk_1` FOREIGN KEY (`AccountID`) REFERENCES `account` (`AccountID`),
  CONSTRAINT `commentchapter_ibfk_2` FOREIGN KEY (`ChapterID`) REFERENCES `chapter` (`ChapterID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentchapter`
--

LOCK TABLES `commentchapter` WRITE;
/*!40000 ALTER TABLE `commentchapter` DISABLE KEYS */;
INSERT INTO `commentchapter` VALUES (1,1,'2024-07-31 00:50:32','test chapter comment 1'),(1,3,'2024-07-31 00:55:54','test comment\n'),(3,1,'2024-07-23 17:20:33','test comment'),(3,1,'2024-07-29 13:02:58','test comment 1'),(3,1,'2024-07-29 13:03:08','test comment 2'),(3,1,'2024-07-29 13:03:18','test comment 3'),(3,1,'2024-07-29 13:03:30','test comment 4'),(3,15,'2024-08-02 23:13:41','ảnh cover...'),(3,78,'2024-08-06 02:06:05','shikanoko');
/*!40000 ALTER TABLE `commentchapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentmanga`
--

DROP TABLE IF EXISTS `commentmanga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentmanga` (
  `AccountID` int NOT NULL,
  `MangaID` int NOT NULL,
  `CommentDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Context` text,
  PRIMARY KEY (`AccountID`,`MangaID`,`CommentDate`),
  KEY `MangaID` (`MangaID`),
  CONSTRAINT `commentmanga_ibfk_1` FOREIGN KEY (`AccountID`) REFERENCES `account` (`AccountID`),
  CONSTRAINT `commentmanga_ibfk_2` FOREIGN KEY (`MangaID`) REFERENCES `manga` (`MangaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentmanga`
--

LOCK TABLES `commentmanga` WRITE;
/*!40000 ALTER TABLE `commentmanga` DISABLE KEYS */;
INSERT INTO `commentmanga` VALUES (1,1,'2024-07-29 13:28:16','comment 123'),(1,1,'2024-07-31 00:22:46','123'),(1,1,'2024-07-31 00:22:54','13'),(1,1,'2024-07-31 00:22:58','1234'),(1,1,'2024-07-31 00:32:41','test comment'),(1,26,'2024-08-02 22:52:26','Fairy tail!!!'),(3,1,'2024-07-22 11:41:32','test comment 4'),(3,1,'2024-07-23 17:14:47','test comment 3'),(3,1,'2024-07-23 17:14:50','test comment 2'),(3,1,'2024-07-23 17:18:54','test comment 1'),(3,1,'2024-07-23 17:19:20','test comment'),(3,1,'2024-07-29 13:28:52','reader comment 123'),(3,1,'2024-07-29 13:51:17','reader comment 124'),(3,1,'2024-07-31 01:57:14','@admin trả lời'),(3,11,'2024-08-02 23:13:28','MHA trong truyền thuyết'),(3,27,'2024-08-02 23:11:05','người đồng nai!!!'),(3,27,'2024-08-06 01:59:55','shikanoko');
/*!40000 ALTER TABLE `commentmanga` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `AccountID` int NOT NULL,
  `MangaID` int NOT NULL,
  `IsChecked` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`AccountID`,`MangaID`),
  KEY `follow_ibfk_2` (`MangaID`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`AccountID`) REFERENCES `account` (`AccountID`),
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`MangaID`) REFERENCES `manga` (`MangaID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES (1,1,0),(1,2,0),(3,1,0),(3,2,0),(3,4,0),(3,27,0);
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `GenreID` int NOT NULL AUTO_INCREMENT,
  `GenreName` varchar(255) NOT NULL,
  PRIMARY KEY (`GenreID`),
  UNIQUE KEY `GenreName` (`GenreName`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Action'),(2,'Adventure'),(7,'Comedy'),(12,'Drama'),(3,'Fantasy'),(8,'Harem'),(6,'Horror'),(16,'Isekai'),(13,'Mystery'),(14,'Psychological'),(4,'Romance'),(5,'Sci-Fi'),(9,'Shounen'),(10,'Slice of life'),(11,'Sports');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like` (
  `AccountID` int NOT NULL,
  `MangaID` int NOT NULL,
  PRIMARY KEY (`AccountID`,`MangaID`),
  KEY `like_ibfk_2` (`MangaID`),
  CONSTRAINT `like_ibfk_1` FOREIGN KEY (`AccountID`) REFERENCES `account` (`AccountID`),
  CONSTRAINT `like_ibfk_2` FOREIGN KEY (`MangaID`) REFERENCES `manga` (`MangaID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES (1,1),(3,1),(1,2),(3,2),(3,3),(3,27);
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manga`
--

DROP TABLE IF EXISTS `manga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manga` (
  `MangaID` int NOT NULL AUTO_INCREMENT,
  `MangaName` varchar(255) NOT NULL,
  `AuthorName` varchar(255) DEFAULT NULL,
  `CoverImageUrl` varchar(255) DEFAULT NULL,
  `UpdateDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `NewChapterName` varchar(255) DEFAULT 'Chapter 0',
  `Description` text,
  `AgeLimit` int DEFAULT '0',
  `NumViews` int DEFAULT '0',
  `NumLikes` int DEFAULT '0',
  `NumFollows` int DEFAULT '0',
  `AccountID` int NOT NULL,
  PRIMARY KEY (`MangaID`),
  KEY `manga_ibfk_1` (`AccountID`),
  CONSTRAINT `manga_ibfk_1` FOREIGN KEY (`AccountID`) REFERENCES `account` (`AccountID`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manga`
--

LOCK TABLES `manga` WRITE;
/*!40000 ALTER TABLE `manga` DISABLE KEYS */;
INSERT INTO `manga` VALUES (1,'Gia Đình Điệp Viên','Endou Tatsuya','https://m.media-amazon.com/images/M/MV5BYTNlMjJmY2MtNWYzNS00OWYwLWIwOTEtYTExZGY2NzQxNmExXkEyXkFqcGdeQXVyMTY3ODkyNDkz._V1_.jpg','2024-08-02 22:56:16','Chapter 4','Anh điệp viên lấy vợ sát thủ và có con siêu năng',12,179,1,1,2),(2,'Boku No Kokoro Yabai Yatsu','Sakurai Norio','https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx138781-jDgbOGpXGI1t.jpg','2024-07-25 15:33:34','Chapter 3','Một \"manga kinh dị\" tập trung khai thác \"mặt tối của tuổi mới lớn\". Bộ truyện xoay quanh Kyoutarou Ichikawa, một kẻ luôn có những suy nghĩ giết người. Xàm thế thôi chứ truyện cute lắm, mong các bác ủng hộ ',12,7,1,1,2),(3,'Quán Cà Phê Nữ Thần','Đang Cập Nhật','https://gcs.tripi.vn/public-tripi/tripi-feed/img/476437SPX/anh-mo-ta.png','2024-07-07 17:00:00','Chapter 0','Kasukabe Hayato đã được nhận vào Đại Học Tokyo ngay trong lần thi đầu tiên. Nhưng sau khi nhận được tin bà nội qua đời, anh trở về ngôi nhà thời thơ ấu của mình, quán cà phê Familia.  Và thấy 5 cô gái lạ mặt tự xưng là \"Gia đình của bà\"! Cuộc sống mới của Hayato tại một thị trấn ven biển với năm cô gái định mệnh bắt đầu từ đây!',16,0,0,0,2),(4,'Dark Gathering','Kondo Kenichi','https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974738946/dark-gathering-vol-1-9781974738946_hr.jpg','2024-07-07 17:00:00','Chapter 0','Keitarou, chàng trai có khả năng thu hút ma quỷ, được thuê làm gia sư cho một cô bé mang tên gọi Yayoi, người có thể trông thấy ma quỷ và đang trong công cuộc tìm kiếm con ma đã mang người mẹ của mình đi mất.',16,0,0,0,2),(5,'Arya Bàn Bên Thỉnh Thoảng Lại Trêu Ghẹo Tôi Bằng Tiếng Nga','Đang Cập Nhật','https://upload.wikimedia.org/wikipedia/vi/7/7a/B%C3%ACa_light_novel_Arya_b%C3%A0n_b%C3%AAn_th%E1%BB%89nh_tho%E1%BA%A3ng_l%E1%BA%A1i_tr%C3%AAu_gh%E1%BA%B9o_t%C3%B4i_b%E1%BA%B1ng_ti%E1%BA%BFng_Nga.jpg','2024-07-07 17:00:00','Chapter 0','Tôi- một cậu học sinh lười nhát nhất trường, lại không có tài cán gì đặc biệt. Tình cờ hôm nọ, tôi bắt gặp được Arya- cô bạn bàn bên mới chuyển đến trưởng tôi. Với lực học luôn đứng top 1 lớp đã thế lại giỏi thể thao, Arya sớm gây được ấn tượng với tụi con trai trong trường. Thế nhưng cô nàng bàn bên này lại chỉ thích ghẹo và mắng tôi mới lại. Liệu phải chăng Arya đã phải lòng một thằng loser như tôi rồi không? Mời độc giả hãy cùng đón đọc nhé!!!',16,0,0,0,2),(6,'Thiên Tài Bóng Đá, Tiền Đạo Số 1','Đang Cập Nhật','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXsSsWhlsDgv6QCgWINWc2rAAqkwik-Otr-A&s','2024-07-07 17:00:00','Chapter 0','Tên khác: Blue Lock (FULL HD); Bluelock',12,0,0,0,2),(7,'Uzaki-Chan Muốn Đi Chơi!','Đang Cập Nhật','https://upload.wikimedia.org/wikipedia/vi/3/3e/Uzaki-chan_wa_Asobitai%21_vol_1.jpg','2024-07-07 17:00:00','Chapter 0','Phiền phức! Đáng yêu! Nhưng mà phiền phức!Câu truyện thường ngày của một sinh viên trầm lặng chỉ muốn được ở một mình, nhưng lại bị trêu chọc bởi nhỏ Kouhai đáng yêu, ngực bự.',16,0,0,0,2),(8,'Undead Unluck','Đang Cập Nhật','https://i.ebayimg.com/images/g/nxUAAOSwYCdjaGMA/s-l1200.webp','2024-07-07 17:00:00','Chapter 0','Một cô gái có khả năng khiến cho những ai tiếp xúc với cô gặp xui xẻo, tùy theo mức độ tiếp xúc và thời gian mà vận xui lớn hay nhỏ. Cô chán nản định tìm cái chết ;thì tình cờ một người bất tử cũng đang muốn chết.',16,0,0,0,2),(9,'Shy','Miki Bukimi','https://i.pinimg.com/736x/fb/40/31/fb403197e662f46834429418b9093938.jpg','2024-07-07 17:00:00','Chapter 0','Vào giữa thế kỷ 21, thế giới đang trên bờ vực của Thế chiến thứ III. Nhưng các siêu anh hùng từ khắp nơi trên thế giới đã xuất hiện và mang lại một kỷ nguyên hòa bình. Với những cuộc khủng hoảng đã được giải quyết, các Anh hùng đã trở về nước của họ, nơi họ hiện đang giúp đỡ các vấn đề trong nước. Đây là câu chuyện về nữ anh hùng trẻ tuổi người Nhật tên là \"Shy\" ...',14,0,0,0,2),(10,'Nữ Thánh Ceclilia Và Mục-Sư Lawrence','Hazano Kazutake','https://product.hstatic.net/200000343865/product/5_de53a5c33b004c7bb92e6260e54974fd.jpg','2024-07-07 17:00:00','Chapter 0','Câu truyện xoay quanh Nữ thánh Ceclilia và mục-sư Lawrence',12,0,0,0,2),(11,'Học Viện Anh Hùng','Đang Cập Nhật','https://i.pinimg.com/736x/ed/24/4a/ed244a1fb56012234820d74eedcafeb4.jpg','2024-07-22 17:00:00','Chapter 1','Vào tương lai, lúc mà con người với những sức mạnh siêu nhiên là điều thường thấy quanh thế giới. Đây là câu chuyện về Izuku Midoriya, từ một kẻ bất tài trở thành một siêu anh hùng. Tất cả ta cần là mơ ước.',12,16,0,0,2),(12,'Chào Mừng Cậu Đến Trường Iruma-Kun','Đang Cập Nhật','https://upload.wikimedia.org/wikipedia/vi/9/99/Mairimashita%21_Iruma-kun_volume_1_cover.jpg','2024-07-22 17:00:00','Chapter 0','Mairimashita! Iruma-kun là câu chuyện kể về cậu bé Suzuki Iruma, người đã bị bố mẹ mình kí khế ước bán cho ác ma để đổi lấy tiền tài và bình an. Cậu bé Iruma đáng thương từ lúc mới biết đi (1 tuổi) đã phải \"ra xã hội\" lăn lộn, buôn ba khắp nơi với hai vị phụ huynh \"tưng tửng\" cho đến ngày một Ác Ma đến rước cậu đến Ma giới theo khế ước. Tưởng chừng như sắp vào bụng quỷ thì vị Ác Ma già nua này đã khóc lóc yêu cầu cậu làm cháu trai ông ta, với bản tính lương thiện và tốt bụng đến cả bản thân mình cũng phải kinh ngạc, cậu bất đắc dĩ đã đồng ý lời đề nghị đó và nhập học trường Ác Ma theo ý ông ta. Chuyện gì sẽ xảy ra tiếp theo, mời các bạn theo dõi cuộc sống học đường đầy bất thường của Iruma-kun.',12,0,0,0,2),(26,'Fairy Tail','Mashima Hiro','https://storage.googleapis.com/storage-manga-website.appspot.com/manga_cover_images/Fairy Tail/1722639078958-cover-image.jpg','2024-08-02 22:53:04','Chapter 2','Lucy là một cô gái 17 tuổi, với giấc mơ trở thành một tinh linh pháp sư thực thụ. Rồi một ngày cô đến thị trấn Harujion, cô đã gặp Natsu, một thiếu niên có khả năng sử dụng ma thuật lửa. Nhưng Natsu không phải là một pháp sư thông thường, cậu sử dụng ma thuật cổ đại do một con rồng tên là Igneel dạy dỗ,và là thành viên của một trong số những hội pháp sư nổi tiếng nhất: Fairy Tail',12,2,0,0,1),(27,'Shikanoko Nokonoko Koshitantan','Amane Kanata','https://storage.googleapis.com/storage-manga-website.appspot.com/manga_cover_images/Shikanoko Nokonoko Koshitantan/1722639560425-fd-plbuamae4jiz.thumb_500x.jpg','2024-08-06 02:16:36','Chapter 4','Mọi học sinh cùng lớp đều nghĩ Torako là một nữ sinh hoàn hảo, nhưng không ai biết được quá khứ một thời từng làm giang hồ. Cho đến khi Nokotan, một nữ sinh chuyển trường với đôi sừng hươu nai, xuất hiện. Bằng cái mũi của loài hưu, Nokotan đã \"ngửi\" thấy được quá khứ đen tối của Torako. Bất kể là trường học hay sở thú, sự hỗn loạn vẫn theo chân cô gái mắt nai ấy để tiến bước vào cuộc sống của Torako. Nokotan liệu có phải là một con hưu, hay là một cô gái, hay thậm chí là cả hai?',12,43,1,1,1);
/*!40000 ALTER TABLE `manga` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mangagenre`
--

DROP TABLE IF EXISTS `mangagenre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mangagenre` (
  `GenreID` int NOT NULL,
  `MangaID` int NOT NULL,
  PRIMARY KEY (`GenreID`,`MangaID`),
  KEY `mangagenre_ibfk_2` (`MangaID`),
  CONSTRAINT `mangagenre_ibfk_1` FOREIGN KEY (`GenreID`) REFERENCES `genre` (`GenreID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `mangagenre_ibfk_2` FOREIGN KEY (`MangaID`) REFERENCES `manga` (`MangaID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mangagenre`
--

LOCK TABLES `mangagenre` WRITE;
/*!40000 ALTER TABLE `mangagenre` DISABLE KEYS */;
INSERT INTO `mangagenre` VALUES (1,1),(2,1),(4,1),(7,1),(9,1),(4,2),(7,2),(10,2),(4,3),(7,3),(8,3),(1,26),(2,26),(3,26),(7,26),(9,26),(12,26),(7,27),(9,27);
/*!40000 ALTER TABLE `mangagenre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `RoleID` int NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(255) NOT NULL,
  PRIMARY KEY (`RoleID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_TRANSLATOR'),(3,'ROLE_USER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-06  9:28:14
