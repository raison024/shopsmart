# ShopSmart

ShopSmart is a web-based e-commerce platform that allows users to browse and purchase products online. This repository contains the codebase for both the server and client applications, as well as the database setup.

## Getting Started

Follow these steps to set up and run the SmartCheckout application locally:

### Server Setup

1. Navigate to the server directory:
2. Npm i
3. Nodemon
4. create a new console
5. cd server
6. node admin.js

### Client Setup

1. Navigate to the client directory:
2. npm i
3. npm start



# ShopSmart Database Setup

Goto config.js and modify user and password according to your mysql.

Below is SQL queries and table structures to set up the ShopSmart database. Below are the SQL commands to create the necessary tables and insert sample data. You can copy and paste these SQL commands into your database system to set up the database.

```
-- Create Database
create database shopsmart2
use shopsmart2
-- Table structure for table `admin`
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `admin` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(35) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `dob` date NOT NULL,
  `mobile` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`admin`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `mobile` (`mobile`)
);

-- Dumping data for table `admin`
LOCK TABLES `admin` WRITE;
INSERT INTO `admin` VALUES (101,'Joel B Koshy','joelbkoshy@gmail.com','Joel@123','2001-04-14',8330829907);
UNLOCK TABLES;

-- Table structure for table `category`
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `cat_id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cat_id`),
  CONSTRAINT `check_name_chars` CHECK (`cat_name` regexp '^[a-zA-Z0-9 ]+$')
);

-- Dumping data for table `category`
LOCK TABLES `category` WRITE;
INSERT INTO `category` VALUES (298,'Fashion'),(299,'Watches'),(300,'Books'),(301,'Furniture'),(302,'Fitness'),(303,'Home'),(304,'Kitchen'),(311,'Electronics'),(312,'FASHION');
UNLOCK TABLES;

-- Table structure for table `customers`
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(30) NOT NULL,
  `cemail` varchar(35) NOT NULL,
  `cpass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `cphone` bigint(20) DEFAULT NULL,
  `gender` varchar(7) NOT NULL,
  `DOB` date DEFAULT NULL,
  PRIMARY KEY (`cid`),
  UNIQUE KEY `cphone` (`cphone`)
);

-- Dumping data for table `customers`
LOCK TABLES `customers` WRITE;
INSERT INTO `customers` VALUES (140,'Joel B Koshy','joelbkoshy@gmail.com','Joel@123',8330829907,'Male','2001-04-14'),(147,'Raison P Sabu','raisonpsabu@gmail.com','raison@123',8330829909,'Female','2001-04-02'),(148,'Ben George','bengeorge@gmail.com','ben@123',8990912311,'male','2004-06-10');
UNLOCK TABLES;

-- Table structure for table `feedback`
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `fid` int(11) NOT NULL AUTO_INCREMENT,
  `overall` varchar(30) NOT NULL,
  `offer` varchar(30) NOT NULL,
  `user_friendly` varchar(30) NOT NULL,
  `support` varchar(30) NOT NULL,
  `recommend` varchar(30) NOT NULL,
  `expectation` text NOT NULL,
  PRIMARY KEY (`fid`)
);

-- Dumping data for table `feedback`
LOCK TABLES `feedback` WRITE;
INSERT INTO `feedback` VALUES (3,'VGood','Good','Good','Good','Good','Till now its good!'),(4,'VGood','Fair','Good','VGood','Good','Good'),(5,'Fair','Good','VGood','Fair','Poor','Expecting a real-time chatbot to clear our queries.'),(6,'VGood','Good','VGood','Good','VGood','Make a chatbot!!'),(7,'VGood','Fair','Good','Poor','VPoor','Expecting more from the organization'),(8,'Good','Good','Fair','Fair','Fair','Nice');
UNLOCK TABLES;

-- Table structure for table `payment`
DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment` (
  `pay_id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `total_pay` float NOT NULL,
  `vc_id` int(11) NOT NULL,
  `pay_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`pay_id`)
);

-- Dumping data for table `payment`
LOCK TABLES `payment` WRITE;
INSERT INTO `payment` VALUES (319,140,400,120,'2023-04-17 19:02:45'),(320,147,900,121,'2023-04-17 19:02:50'),(321,140,4600,122,'2023-04-17 19:02:55'),(322,140,200,123,'2023-04-17 19:02:57'),(323,140,1999,124,'2023-04-17 19:02:58'),(324,147,1399,126,'2023-04-17 19:03:00'),(325,140,49,120,'2023-04-17 19:51:25'),(326,140,5849,50,'2023-04-20 11:20:40'),(327,140,6089,36,'2023-04-20 11:59:25'),(328,140,6089,84,'2023-04-20 12:36:19'),(329,148,4999,157,'2023-04-20 12:39:28'),(330,148,4999,55,'2023-04-20 12:39:53'),(331,140,1090,45,'2023-04-25 15:30:03'),(332,140,1090,185,'2023-06-30 05:47:07');
UNLOCK TABLES;

-- Table structure for table `products`
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `pname` varchar(30) NOT NULL,
  `cat_id` int(11) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `pdesc` varchar(255) DEFAULT NULL,
  `pimg` varchar(255) NOT NULL,
  `STOCKS` int(11) NOT NULL,
  PRIMARY KEY (`pid`),
  UNIQUE KEY `pname` (`pname`),
  KEY `cat_id` (`cat_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `category` (`cat_id`)
);

-- Dumping data for table `products`
LOCK TABLES `products` WRITE;
INSERT INTO `products` VALUES (15,'Fossil Chronograph Black Men W',299,5849,'Dial Color: Black, Case Shape: Round, Dial Glass Material: Mineral\nBand Color: Brown: Band Material: Leather','             https://m.media-amazon.com/images/I/41NIrnFfXoL.jpg',4),(16,'FastTrack Smart Watch',299,5999,'REFLEX PLAY- SMART WATCH WITH PINK STRAP, AMOLED DISPLAY, HEALTH SUITE, IN-BUILT GAMES, & PERIOD TRACKER','    https://th.bing.com/th/id/R.dbdfe6a6337a58a161c7e3f3e6da7db9?rik=saFv4I8BOnr5rw&riu=http%3a%2f%2fstaticimg.titan.co.in%2fproduction%2fIndia%2fFastrack%2fdetail%2fSWD90059PP01.jpg%3fv%3d2&ehk=Lkc%2fKtjDeT8g7fiLg73DdiFJmL9Uphc606CDeP8TC20%3d&risl=&pid=I',4),(19,'Cockatoo SKP-TP Skipping Rope ',303,49,'Cockatoo skipping rope increases body stamina\nThis jump rope can be used as a cardiovascular workout, similar to jogging or bicycle riding','   https://n3.sdlcdn.com/imgs/a/s/x/Cockatoo-Yellow-Skipping-Rope-SDL139394194-2-49e9d.jpg',8),(20,'Kushuvi 4XL Bean Bag Cover wit',301,1090,'Soft, Comfotable & Relaxable Bean Bag Chair without Beans For Your Desirable Posture And Make You Feel Calm','  https://th.bing.com/th/id/OIP.wuLgPn7m0n3cWfqhXsLeaAHaHa?pid=ImgDet',5),(27,'Apple AirPods (2nd Generation)',311,4999,'RICHER AUDIO EXPERIENCE ΓÇô The Apple-designed H2 chip pushes advanced audio performance even further, resulting in smarter noise cancellation and more immersive sound.','       https://m.media-amazon.com/images/I/61f1YfTkTDL._AC_SX679_.jpg',10);
UNLOCK TABLES;

-- Table structure for table `virtual_cart`
DROP TABLE IF EXISTS `virtual_cart`;
CREATE TABLE `virtual_cart` (
  `vc_id` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
);

-- Dumping data for table `virtual_cart`
LOCK TABLES `virtual_cart` WRITE;
INSERT INTO `virtual_cart` VALUES (120,140,400,2),(120,140,401,2),(121,147,26,3),(122,147,26,3),(120,140,26,3),(123,140,19,1),(124,140,26,3),(126,147,16,5),(120,140,19,1),(50,140,15,2),(36,140,27,2),(36,140,20,2),(84,140,20,2),(84,140,20,2),(84,140,20,2),(84,140,27,2),(157,148,27,2),(55,148,27,2),(91,140,27,2),(45,140,20,2),(185,140,20,2);
UNLOCK TABLES;
```

