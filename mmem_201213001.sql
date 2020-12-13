-- MySQL dump 10.13  Distrib 5.7.31, for Win64 (x86_64)
--
-- Host: localhost    Database: mmem
-- ------------------------------------------------------
-- Server version	5.7.31-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `provider` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (101,NULL,NULL,NULL,'Shirney',NULL),(102,NULL,NULL,NULL,'Arthur',NULL),(103,NULL,NULL,NULL,'Wayne',NULL),(104,NULL,NULL,NULL,'Max',NULL),(105,NULL,NULL,NULL,'Poyu',NULL),(106,NULL,NULL,NULL,'Nick',NULL),(107,NULL,NULL,NULL,'Darren',NULL),(108,NULL,NULL,NULL,'Tiffany',NULL),(109,NULL,NULL,NULL,'Zoe',NULL),(110,NULL,NULL,NULL,'Sophie',NULL);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `process_standard_output`
--

DROP TABLE IF EXISTS `process_standard_output`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `process_standard_output` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `material_num` varchar(255) DEFAULT NULL,
  `record_process` varchar(255) DEFAULT NULL,
  `standard_output` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `process_standard_output`
--

LOCK TABLES `process_standard_output` WRITE;
/*!40000 ALTER TABLE `process_standard_output` DISABLE KEYS */;
INSERT INTO `process_standard_output` VALUES (1,'10000001','process_1',148),(2,'10000001','process_2',171),(3,'10000001','process_3',174),(4,'10000001','process_4',41),(5,'10000001','process_5',36);
/*!40000 ALTER TABLE `process_standard_output` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production_order`
--

DROP TABLE IF EXISTS `production_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `production_order` (
  `production_order_num` varchar(255) NOT NULL,
  `material_num` int(11) DEFAULT NULL,
  `production_group` varchar(255) DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  PRIMARY KEY (`production_order_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `production_order`
--

LOCK TABLES `production_order` WRITE;
/*!40000 ALTER TABLE `production_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `production_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production_plan`
--

DROP TABLE IF EXISTS `production_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `production_plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `production_order_num` int(11) DEFAULT NULL,
  `material_num` int(11) DEFAULT NULL,
  `production_group` int(11) DEFAULT NULL,
  `record_process` varchar(255) DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `output` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `production_plan`
--

LOCK TABLES `production_plan` WRITE;
/*!40000 ALTER TABLE `production_plan` DISABLE KEYS */;
INSERT INTO `production_plan` VALUES (1,2011020001,10000001,1,'process_2','2020-11-02 08:30:00','2020-11-02 09:30:00',170),(2,2011020002,10000001,1,'process_2','2020-11-02 09:30:00','2020-11-02 10:30:00',170),(3,2011020003,10000001,1,'process_2','2020-11-02 10:30:00','2020-11-02 11:30:00',170),(4,2012070001,10000001,1,'process_2','2020-12-07 09:30:00','2020-12-07 10:30:00',171),(5,2012070002,10000001,1,'process_2','2020-12-07 10:30:00','2020-12-07 11:30:00',170),(6,2012070003,10000001,1,'process_2','2020-12-07 11:30:00','2020-12-07 12:30:00',170),(7,2012070004,10000001,1,'process_2','2020-12-07 09:30:00','2020-12-07 17:30:00',105),(8,2012080001,10000001,1,'process_3','2020-12-08 08:30:00','2020-12-08 09:30:00',150),(9,2012080002,10000001,1,'process_3','2020-12-08 09:30:00','2020-12-08 10:30:00',150),(10,2012080003,10000001,1,'process_4','2020-12-08 08:30:00','2020-12-08 09:30:00',150),(11,2012080004,10000001,1,'process_4','2020-12-08 09:30:00','2020-12-08 10:30:00',150),(12,2012080005,10000001,1,'process_5','2020-12-08 08:30:00','2020-12-08 09:30:00',150),(13,2012080006,10000001,1,'process_5','2020-12-08 09:30:00','2020-12-08 10:30:00',150),(14,2012130001,10000001,1,'process_3','2020-12-13 08:30:00','2020-12-13 09:30:00',150);
/*!40000 ALTER TABLE `production_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production_records`
--

DROP TABLE IF EXISTS `production_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `production_records` (
  `record_id` int(11) NOT NULL,
  `production_order_num` int(11) NOT NULL,
  `material_num` int(11) DEFAULT NULL,
  `production_group` varchar(255) DEFAULT NULL,
  `record_process` varchar(255) DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `output` int(11) DEFAULT NULL,
  PRIMARY KEY (`production_order_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `production_records`
--

LOCK TABLES `production_records` WRITE;
/*!40000 ALTER TABLE `production_records` DISABLE KEYS */;
INSERT INTO `production_records` VALUES (1,2011020001,10000001,'1','process_2','2020-11-02 09:30:00','2020-11-02 10:30:00',180),(2,2011020002,10000001,'1','process_2','2020-11-02 10:35:00','2020-11-02 11:35:00',170),(3,2011020003,10000001,'1','process_2','2020-11-02 13:05:00','2020-11-02 14:05:00',170),(4,2011020004,10000001,'1','process_3','2020-11-02 14:05:00','2020-11-02 15:05:00',170),(5,2011020005,10000001,'1','process_3','2020-11-02 15:05:00','2020-11-02 16:05:00',170),(6,2011030001,10000001,'1','process_2','2020-11-03 09:30:00','2020-11-03 10:30:00',160),(7,2011030002,10000001,'1','process_2','2020-11-03 10:35:00','2020-11-03 11:35:00',160),(8,2011030003,10000001,'1','process_2','2020-11-03 13:05:00','2020-11-03 14:05:00',160),(9,2011030004,10000001,'1','process_2','2020-11-03 14:05:00','2020-11-03 15:05:00',160),(10,2011030005,10000001,'1','process_2','2020-11-03 15:05:00','2020-11-03 16:05:00',160),(11,2012070001,10000001,'1','process_2','2020-12-07 09:30:00','2020-12-07 10:30:00',155),(12,2012070002,10000001,'1','process_2','2020-12-07 10:35:00','2020-12-07 11:35:00',156),(13,2012070003,10000001,'1','process_2','2020-12-07 13:05:00','2020-12-07 14:05:00',160),(14,2012070004,10000001,'1','process_3','2020-12-07 09:30:00','2020-12-07 10:00:00',175);
/*!40000 ALTER TABLE `production_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production_standard`
--

DROP TABLE IF EXISTS `production_standard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `production_standard` (
  `material_num` int(11) NOT NULL,
  `production_group` varchar(255) DEFAULT NULL,
  `process_1` float DEFAULT NULL,
  `process_2` float DEFAULT NULL,
  `process_3` float DEFAULT NULL,
  `process_4` float DEFAULT NULL,
  `process_5` float DEFAULT NULL,
  `process_6` float DEFAULT NULL,
  `process_7` float DEFAULT NULL,
  `process_8` float DEFAULT NULL,
  `process_9` float DEFAULT NULL,
  `process_10` float DEFAULT NULL,
  PRIMARY KEY (`material_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `production_standard`
--

LOCK TABLES `production_standard` WRITE;
/*!40000 ALTER TABLE `production_standard` DISABLE KEYS */;
INSERT INTO `production_standard` VALUES (10000001,'1',148,171,174,41,36,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `production_standard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `working_hour`
--

DROP TABLE IF EXISTS `working_hour`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `working_hour` (
  `work_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `production_group` varchar(255) DEFAULT NULL,
  `record_process` varchar(255) DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  PRIMARY KEY (`work_log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `working_hour`
--

LOCK TABLES `working_hour` WRITE;
/*!40000 ALTER TABLE `working_hour` DISABLE KEYS */;
INSERT INTO `working_hour` VALUES (1,107,'1','process_2','2020-11-02 09:00:00','2020-11-02 10:44:00'),(2,107,'1','process_2','2020-11-02 11:00:00','2020-11-02 12:00:00'),(3,107,'1','process_2','2020-11-02 13:00:00','2020-11-02 14:00:00'),(4,107,'1','process_2','2020-11-02 14:00:00','2020-11-02 16:00:00'),(5,107,'1','process_2','2020-11-03 09:00:00','2020-11-03 11:00:00'),(6,107,'1','process_2','2020-11-03 11:00:00','2020-11-03 12:00:00'),(7,107,'1','process_2','2020-11-03 13:00:00','2020-11-03 14:00:00'),(8,107,'1','process_2','2020-11-03 14:00:00','2020-11-03 16:00:00'),(15,107,'1','process_2','2020-12-07 08:00:33','2020-12-07 12:00:55'),(16,107,'1','process_3','2020-12-07 08:00:33','2020-12-07 12:00:55'),(17,106,'1','process_3','2020-12-07 08:00:33','2020-12-07 12:00:55'),(18,107,'1','process_3','2020-12-08 09:00:00','2020-12-08 14:52:13'),(19,107,'1','process_2','2020-12-08 11:05:52','2020-12-13 11:31:38'),(20,107,'1','process_4','2020-12-08 13:00:00','2020-12-08 13:15:00'),(21,107,'1','process_4','2020-12-08 13:20:24','2020-12-08 13:20:39'),(22,106,'1','process_3','2020-12-08 09:00:00','2020-12-08 11:00:00'),(23,106,NULL,'process_3','2020-12-08 14:16:46',NULL);
/*!40000 ALTER TABLE `working_hour` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-13 23:20:21
