/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : cAuth

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cBook`
-- ----------------------------
DROP TABLE IF EXISTS `cBook`;
CREATE TABLE `cBook` (
  `id` int AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bookList` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `buyer` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatarUrl` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `college` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `confirm` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `wechat` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author` (`author`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='所有图书信息';

SET FOREIGN_KEY_CHECKS = 1;
