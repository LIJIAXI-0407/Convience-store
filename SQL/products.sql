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

 Date: 03/06/2025 22:04:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品名称',
  `bar_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品条形码',
  `price` decimal(8, 2) NOT NULL COMMENT '价格',
  `stock` int NOT NULL DEFAULT 0 COMMENT '库存',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES (1, 'Strawberry Candy', '7901085881405', 0.99, 50, '2025-06-03 12:42:44', '2025-06-03 12:42:47');
INSERT INTO `products` VALUES (2, 'Potato Crips', '9781107480537', 3.99, 25, '2025-06-03 12:43:06', '2025-06-03 12:43:08');
INSERT INTO `products` VALUES (3, 'Moon Honey', '123', 6.99, 12, '2025-06-03 12:43:26', '2025-06-03 12:43:30');
INSERT INTO `products` VALUES (4, 'Coka Cola', '123', 2.99, 45, '2025-06-03 12:43:52', '2025-06-03 12:43:54');
INSERT INTO `products` VALUES (5, 'Cafe Beverage ', '123', 13.00, 5235, '2025-06-03 12:44:12', '2025-06-03 12:44:13');
INSERT INTO `products` VALUES (6, 'Pink Yogurt', '123', 8.00, 5245, '2025-06-03 12:44:28', '2025-06-03 12:44:31');
INSERT INTO `products` VALUES (7, 'Ice Latte', '123', 9.00, 284, '2025-06-03 12:44:47', '2025-06-03 12:44:49');
INSERT INTO `products` VALUES (8, 'Delicious Pasta', '123', 12.00, 24852, '2025-06-03 12:45:11', '2025-06-03 12:45:12');
INSERT INTO `products` VALUES (9, 'Big Hamberg', '123', 15.00, 78, '2025-06-03 12:45:27', '2025-06-03 12:45:29');
INSERT INTO `products` VALUES (10, 'Tako Yaki', '123', 10.00, 785, '2025-06-03 12:45:45', '2025-06-03 12:45:46');
INSERT INTO `products` VALUES (12, 'ABC', '1234567890', 0.00, 50, '2025-06-03 10:35:08', '2025-06-03 10:35:08');

SET FOREIGN_KEY_CHECKS = 1;
