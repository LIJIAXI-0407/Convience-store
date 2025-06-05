/*
 Navicat Premium Data Transfer

 Source Server         : womeik
 Source Server Type    : MySQL
 Source Server Version : 80040 (8.0.40)
 Source Host           : localhost:3306
 Source Schema         : sale

 Target Server Type    : MySQL
 Target Server Version : 80040 (8.0.40)
 File Encoding         : 65001

 Date: 03/06/2025 22:04:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '邮箱',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `occupation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '职业',
  `birthday` timestamp NOT NULL COMMENT '生日',
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'token',
  `reword` int NOT NULL DEFAULT 0 COMMENT '积分',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'testuser', 'user@example.com', '$2y$12$HF3rE/5FFruKYFCBCM9OLOX9fvUNgBuVa04HoFQxJHhJla5PQgChe', '软件工程师', '1990-01-01 00:00:00', 'MBEf8FLeZpkERtmjh0MeqSAeDXfP8Vt5Rz1Hpv29XVZl4o9pfnjh8e6FIAgC', 35, '2025-06-03 04:03:38', '2025-06-03 13:28:56');
INSERT INTO `users` VALUES (2, 'abc', 'test@qq.com', '$2y$12$HvD.GJJ1xaZ7jozMWnZqhOf2bZMFL89UPCqM63iDRSALqVT3ZGlG.', 'student', '2025-06-05 00:00:00', 'DhzR8Pl3OBELm78ZJ80foBKpYJn9Sq4I4LgPazDwSkvawx8INZpmnXtG8Fvw', 79, '2025-06-03 09:14:04', '2025-06-03 12:57:59');

SET FOREIGN_KEY_CHECKS = 1;
