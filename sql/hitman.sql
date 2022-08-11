CREATE DATABASE  IF NOT EXISTS `hitman` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hitman`;
-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: test-database.cadukmg30ewa.us-east-1.rds.amazonaws.com    Database: hitman
-- ------------------------------------------------------
-- Server version	8.0.28

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `hits`
--

DROP TABLE IF EXISTS `hits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_assigned` int NOT NULL,
  `description_hit` text NOT NULL,
  `name_target` varchar(45) NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `user_creator` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `hits_user_idx` (`user_assigned`,`user_creator`),
  KEY `hits_users_idx` (`user_assigned`),
  KEY `assigned_hits_idx` (`user_creator`),
  KEY `status_hit_idx` (`status`),
  CONSTRAINT `assigned_hits` FOREIGN KEY (`user_creator`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hits_users` FOREIGN KEY (`user_assigned`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `status_hit` FOREIGN KEY (`status`) REFERENCES `status_hits` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hits`
--

LOCK TABLES `hits` WRITE;
/*!40000 ALTER TABLE `hits` DISABLE KEYS */;
INSERT INTO `hits` VALUES (1,8,'The first hit','other person',1,1,'2022-08-11 02:14:53','2022-08-11 02:14:53');
/*!40000 ALTER TABLE `hits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_role` varchar(10) NOT NULL,
  `label` varchar(45) NOT NULL,
  `create` smallint NOT NULL DEFAULT '1',
  `update` smallint DEFAULT '1',
  `delete` smallint DEFAULT '1',
  `to_assign` smallint DEFAULT '1',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_role_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'theboss','The Boss',1,1,1,1,'2022-08-10 23:46:09','2022-08-10 23:46:09'),(2,'manager','Manager',1,1,1,0,'2022-08-10 23:46:09','2022-08-10 23:46:09'),(3,'hitman','Hitman',0,0,0,0,'2022-08-10 23:46:09','2022-08-10 23:46:09');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_hits`
--

DROP TABLE IF EXISTS `status_hits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_hits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_status` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_status_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_hits`
--

LOCK TABLES `status_hits` WRITE;
/*!40000 ALTER TABLE `status_hits` DISABLE KEYS */;
INSERT INTO `status_hits` VALUES (1,'active'),(2,'cancel'),(3,'complete');
/*!40000 ALTER TABLE `status_hits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` int NOT NULL DEFAULT '3',
  `name` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(45) NOT NULL,
  `active` smallint NOT NULL DEFAULT '1',
  `assigned` smallint NOT NULL DEFAULT '1',
  `token` varchar(45) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `role_users_idx` (`role`),
  CONSTRAINT `user_roles` FOREIGN KEY (`role`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'The Boss','theboss@gmail.com','TheBoss123',1,0,'4dfad5cd-5665-415e-ae0c-7bbe085e463b','2022-08-10 20:53:23','2022-08-11 01:50:40'),(2,2,'First Manager','firstmanager@gmail.com','manager123',1,1,NULL,'2022-08-10 20:54:25','2022-08-10 20:54:25'),(3,2,'Second Manager','secondmanager@gmail.com','manager123',1,1,NULL,'2022-08-10 20:54:47','2022-08-10 20:54:47'),(4,2,'Three Manager','threemanager@gmail.com','manager123',1,1,NULL,'2022-08-10 21:07:58','2022-08-10 21:45:27'),(5,3,'First Hitman','firsthitman@gmail.com','hitman123',1,2,NULL,'2022-08-10 21:07:58','2022-08-10 23:50:09'),(6,3,'Second Hitman','secondhitman@gmail.com','hitman123',1,1,NULL,'2022-08-10 21:07:58','2022-08-10 21:07:58'),(7,3,'Three Hitman','threehitman@gmail.com','hitman123',1,1,NULL,'2022-08-10 21:07:58','2022-08-10 21:07:58'),(8,3,'Fourth Hitman','fourthhitman@gmail.com','hitman123',1,1,NULL,'2022-08-10 21:07:58','2022-08-10 21:07:58'),(9,3,'Fifth Hitman','fifthhitman@gmail.com','hitman123',1,1,NULL,'2022-08-10 21:07:58','2022-08-10 21:07:58'),(10,3,'Six Hitman','sixhitman@gmail.com','hitman123',1,1,'test','2022-08-10 21:07:58','2022-08-10 21:07:58'),(15,3,'Seven Hitamn','sevenhitman@gmail.com','hitman123',1,1,'299f93e9-49a0-4e45-85e8-f29628f20754','2022-08-11 01:13:39','2022-08-11 01:15:02');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-10 21:53:55
