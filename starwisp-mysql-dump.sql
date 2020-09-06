-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: starwisp
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `uni_details`
--

DROP TABLE IF EXISTS `uni_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uni_details` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `uniname` varchar(64) DEFAULT NULL,
  `registration_date` date DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `imgurl` varchar(64) DEFAULT NULL,
  `no_of_students` int DEFAULT NULL,
  `email` varchar(32) DEFAULT NULL,
  `weburl` varchar(32) DEFAULT NULL,
  `contact_no` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uni_details`
--

LOCK TABLES `uni_details` WRITE;
/*!40000 ALTER TABLE `uni_details` DISABLE KEYS */;
INSERT INTO `uni_details` VALUES (18,'Chandigarh University','2020-10-04','2030-10-04','https://www.cuchd.in/assets/upload/cu-logo.png',13000,'info@cumail.in','https://www.cuchd.in','8067947100'),(23,'LPU','2020-09-04',NULL,NULL,NULL,'contact@lpu.edu',NULL,'9876543210'),(24,'AMITY','2020-09-16',NULL,NULL,NULL,'contact@amity.edu',NULL,'9876543210'),(25,'DELETEME','2020-09-04','2020-09-06',NULL,NULL,'try@deleting.this',NULL,'0000000000');
/*!40000 ALTER TABLE `uni_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_id`
--

DROP TABLE IF EXISTS `user_id`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_id` (
  `user_id` varchar(20) NOT NULL,
  `password` varchar(60) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_id`
--

LOCK TABLES `user_id` WRITE;
/*!40000 ALTER TABLE `user_id` DISABLE KEYS */;
INSERT INTO `user_id` VALUES ('apple','somethingApple-ish'),('cranberry','somethingCranberry-ish'),('dsp9107','$2b$12$rPFbH7MhJz8gjTFEJ9E5P.4bW8.7/i8fY3KYkvAzxLsv9TacNyUp6'),('pineapple','somethingPineapple-ish'),('test','test');
/*!40000 ALTER TABLE `user_id` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'starwisp'
--

--
-- Dumping routines for database 'starwisp'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-07  2:40:23
