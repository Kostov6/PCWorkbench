-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2020 at 01:58 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pc_workbench`
--
CREATE DATABASE IF NOT EXISTS `pc_workbench` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pc_workbench`;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `type` varchar(128) NOT NULL,
  `description_short` varchar(512) NOT NULL,
  `description_long` varchar(2048) NOT NULL,
  `specifications_overview` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`specifications_overview`)),
  `specifications_details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`specifications_details`)),
  `price` float NOT NULL,
  `photo` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `type`, `description_short`, `description_long`, `specifications_overview`, `specifications_details`, `price`, `photo`) VALUES
(1, '>CLX SET with AMD Ryzen 9 3900X 3.8GHz, GeForce RTX 2080Ti 11GB, 32GB Mem, 1TBNVME M .2 + 6 TB HDD, WiFi, Win 10', 'PC', 'AMD Ryzen 9 3900X 3.8GHz, GeForce RTX 2080Ti 11GB, 32GB Mem, 1TBNVME M .2 + 6 TB HDD, WiFi, Win 10', 'A Leap ahead of other gaming systems, this VR-Ready CLX SET gaming desktop has the power and performance you demand! It sports a 3rd Gen 12-Core AMD Ryzen 9 3900X 3.8GH z processor (Max. Boost Speed of 4.6GH z) and 32GB of DDR4 memory. The 11GB NVIDIA GeForce RTX 2080Ti video card delivers eye-stunning graphics and supports even Next-Gen VR devices. Meanwhile, the 1TB NVME M. 2 solid-state drive plus a 6TB HDD provide a perfect blend of speed and storage. And it isnt just the insides that look great; the CLX SET is housed in a sleek gaming chassis, designed for maximum expandability and airflow. With both wired and WiFi networking capabilities, you can game how you want, where you want. We even pre-install Microsoft  Windows 10 Home, and include a FREE Wired Gaming Keyboard and Mouse, so you can be up and playing like a pro  on your favorite games in no time! Invest in a system above the rest - order your CLX SET today!\r\n', '[\"Ryzen 9 3rd Gen 3900X 12-Core 3.80 GHz (Max Turbo 4.6GHz)\",\"32 GB DDR4 RGB Memory (128GB Max)\",\"NVIDIA GeForce RTX 2080 Ti 11GB GDDR6\",\"1TB M.2 NVMe SSD + 6TB HDD\",\"AMD X570 Chipset ATX Motherboard | 2 x PCI Express 4.0 x16\",\"Black Mid-Tower w/Tempered Glass and RGB Lighting\",\"240mm Liquid-Cooled | 4 RGB Fans | 850W Gold PS\",\"802.11ac / BT 4.2 WiFi\",\"Windows 10 Home\",\"Virtual Reality Ready\"]', '{\"processor\":{\"brand\":\"AMD\",\"model\":\"Ryzen 9 3900X\",\"frequency\":3.8,\"cores\":12,\"title\":\"AMD Ryzen 9 3900X 3.8GH z (12 Cores)\"},\"chipset\":{\"brand\":\"AMD\",\"model\":\"X570\",\"title\":\"AMD X570 Chipset\"},\"memory\":{\"brand\":\"\",\"size\":32,\"type\":\"DDR4\",\"title\":\"32GB DDR4 - 2 x 16GB DDR4 (128GB Max)\"},\"hard_drives\":{\"brand\":\"NVME\",\"SSD\":1,\"HDD\":6,\"title\":\"1TB NVME M. 2 SSD + 6TB HDD\"},\"video_graphics\":{\"brand\":\"NVIDIA GeForce\",\"model\":\"RTX 2080Ti\",\"size\":11,\"title\":\"NVIDIA GeForce RTX 2080Ti 11GB\"},\"power_supply\":{\"brand\":\"Gold\",\"wattage\":850,\"title\":\"850 Watt Gold Power Supply\"},\"network_connectivity\":\"10/100/1000 Gigabit Ethernet Network Port, WiFi\",\"chassis_fan\":\"120mm Fans with RGB lights\",\"expansion_slots\":\"(1) 4.0 PCIe x1, 2 (1) 4.0 PCIe x16\",\"ports\":\"(2) USB 2.0 | (2) USB 3.0 | (6) USB 3.2 Gen1 | (2) USB 3.2 Gen2 Type-A<\",\"video_connectivity\":\"(3) Display Port, (1) HDMI, (1) USB-C\"}', 3259.99, 'images/pc.png');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `username` varchar(256) NOT NULL,
  `password_hash` varchar(256) NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `country` varchar(64) DEFAULT NULL,
  `address` varchar(256) DEFAULT NULL,
  `photo` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
