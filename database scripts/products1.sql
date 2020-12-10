-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2020 at 04:51 PM
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
(2, 'Intel Core i7-10700K', 'cpu', 'Intel Core i7-10700K Comet Lake 8-Core 3.8 GHz LGA 1200 125W Desktop Processor w/ Intel UHD Graphics 630', '', '[\"MPN: BX8070110700K\",\"10th Gen\",\"8 Cores & 16 Threads\",\"3.8 GHz Clock Speed\",\"5.1 GHz Maximum Turbo Frequency\",\"Compatible with Intel 400 series chipset based motherboards\",\"LGA 1200 Socket\",\"Intel UHD Graphics 630\",\"Intel Turbo Boost Max Technology 3.0 support\",\"Intel Optane Memory Support\",\"No thermal solution included\"]', '{\"model\":{\"Brand\":\"Intel\",\"Processor Type\":\"Desktop\",\"Series\":\"Core i7 10th Gen\",\"Name\":\"Core i7-10700K\",\"Model\":\"BX8070110700K\"},\"details\":{\"Socket Type\":\"LGA 1200\",\"Core Name\":\"Comet Lake\",\"# of Cores\":8,\"# of Threads\":16,\"Operating Frequency\":3.8}}', 384.99, 'images/19-118-123-V03.jpg'),
(3, 'Intel Core i9-10980XE', 'cpu', 'Intel Core i9-10980XE Cascade Lake 18-Core 3.0 GHz LGA 2066 165W BX8069510980XE Desktop Processor', '', '[\"14nm Cascade Lake 165W\",\"24.75MB L3 Cache\"]', '{\"model\":{\"Brand\":\"Intel\",\"Processors Type\":\"Desktop\",\"Series\":\"Core i9 10th Gen\",\"Name\":\"Core i9-10980XE\",\"Model\":\"BX8069510980XE\"},\"details\":{\"Socket Type\":\"LGA 2066\",\"Core Name\":\"Cascade Lake\",\"# of Cores\":18,\"# of Threads\":36,\"Operating Frequency\":3}}', 999.99, 'images/19-118-112-V01.jpg'),
(4, 'AMD Ryzen 9 3900XT', 'cpu', 'AMD Ryzen 9 3900XT 12-Core 3.8 GHz Socket AM4 105W 100-100000277WOF Desktop Processor', '', '[\"3rd Gen Ryzen\",\"Socket AM4\",\"Max Boost Frequency 4.7 GHz\",\"DDR4 Support\",\"Cache 70MB\",\"Thermal Design Power 105W\"]', '{\"model\":{\"Brand\":\"AMD\",\"Processors Type\":\"Desktop\",\"Series\":\"Ryzen 9 3rd Gen\",\"Name\":\"Ryzen 9 3900XT\",\"Model\":\"100-100000277WOF\"},\"details\":{\"Socket Type\":\"Socket AM4\",\"# of Cores\":12,\"# of Threads\":24,\"Operating Frequency\":3.8}}', 645.32, 'images/19-113-651-V01.jpg'),
(5, 'ZOTAC GAMING GeForce RTX 3060', 'gpu', 'ZOTAC GAMING GeForce RTX 3060 Ti Twin Edge OC 8GB GDDR6 256-bit 14 Gbps PCIE 4.0 Gaming Graphics Card, IceStorm 2.0 Advanced Cooling', '', '[\"NVIDIA Ampere architecture, 2nd Gen Ray Tracing Cores, 3rd Gen Tensor Cores\",\"8GB 256-bit GDDR6, 14 Gbps, PCIE 4.0\",\"White LED Logo Lighting, IceStorm 2.0 Advanced Cooling, Active Fan Control, Freeze Fan Stop, Metal Backplate\",\"8K Ready, 4 Display Ready, HDCP 2.3, VR Ready\",\"3 x DisplayPort 1.4a, 1 x HDMI 2.1, DirectX 12 Ultimate, Vulkan RT API, OpenGL 4.6\",\"Boost Clock 1695 MHz\"]', '{\"model\":{\"Brand\":\"ZOTAC\",\"Model\":\"ZT-A30610H-10M\"}, \"details\":{\"Effective Memory Clock\":\"14 Gbps\",\"Memory Size\":\"8GB\", \"Memory Interface\":\"256-Bit\", \"Memory Type\":\"GDDR6\"}}', 460, 'images/gpu1.jpg'),
(6, 'GIGABYTE AORUS GeForce RTX 3080', 'gpu', 'GIGABYTE AORUS GeForce RTX 3080 DirectX 12 GV-N3080AORUS X-10GD 10GB 320-Bit GDDR6X PCI Express 4.0 x16 ATX Video Card', '', '[\"10GB 320-Bit GDDR6X\",\"Boost Clock 1905 MHz\",\"2 x HDMI 2.1, 1 x HDMI 2.0 (The middle HDMI output supports up to HDMI 2.0)\",\"3 x DisplayPort 1.4a\",\"8704 CUDA Cores\",\"PCI Express 4.0 x16\"]', '{\"model\":{\"Brand\":\"GIGABYTE\",\"Series\":\"AORUS\",\"Model\":\"GV-N3080AORUS X-10GD\"},\"details\":{\"Chipset Manufacturer\":\"NVIDIA\",\"Effective Memory Clock\":\"19000 MHz\",\"Memory Size\":\"10GB\",\"Memory Interface\":\"320-Bit\",\"Memory Type\":\"GDDR6X\"}}', 899.99, 'images/14-932-345-01.jpg'),
(7, 'XFX Radeon RX VEGA 64', 'gpu', 'XFX Radeon RX VEGA 64 DirectX 12 RX-VEGMTBFX6 8GB 2048-Bit HBM2 PCI Express 3.0 CrossFireX Support Video Card Air Cooler (Black Design)', '', '[\"8GB 2048-Bit HBM2\",\"Core Clock 1247 MHz\",\"Boost Clock 1546 MHz\",\"1 x HDMI 2.0b 3 x DisplayPort 1.4\",\"4096 Stream Processors\",\"PCI Express 3.0 x16\"]', '{\"model\":{\"Brand\":\"XFX\",\"Series\":\"Black\",\"Model\":\"RX-VEGMTBFX6\"},\"details\":{\"Chipset Manufacturer\":\"AMD\",\"Effective Memory Clock\":\"1.9 Gbps\",\"Memory Size\":\"8GB\",\"Memory Interface\":\"2048-Bit\",\"Memory Type\":\"HBM2\"}}', 620, 'images/14-150-808_R01.jpg'),
(8, 'ASUS ROG MAXIMUS XII HERO', 'motherboard', 'ASUS ROG MAXIMUS XII HERO (WI-FI) LGA 1200 (Intel 10th Gen) Intel Z490 (WiFi 6) SATA 6Gb/s ATX Intel Motherboard (14+2 Power Stages, DDR4 4800+, 5Gbps LAN, Intel LAN, Bluetooth v5.1, Triple M.2, Aura Sync)', '', '[\"Intel LGA 1200 socket: Designed to unleash the maximum performance of 10th Gen Intel Core processors\",\"Robust Power Solution: 14+2 power stages with ProCool II power connector, high-quality alloy chokes and durable capacitors to provide reliable power even when push the CPU performance to the limit\",\"Optimized Thermal Design: Except comprehensive heatsink, heatpipe and fan headers, features low-noise AI cooling to balance thermals and acoustics by reducing fan speeds and maintaining a 5 Celsius delta\",\"Fastest Gaming Connectivity: Dual Ethernet with 5Gb and gigabit Ethernet, LANGaurd, 3 M.2, USB 3.2 Gen 2, and Intel WiFi 6 AX201 (802.11 ax)\",\"Industry-leading Gaming Audio: High fidelity audio with the SupremeFX S1220 codec, DTS Sound Unbound and Sonic studio III draws you deeper into the game action\",\"Unmatched Personalization: ASUS-exclusive Aura Sync RGB lighting, including RGB headers and Gen 2 addressable headers\",\"DIY Friendly Design: Pre-mounted I/O Shield ESD Guards\"]', '{\"model\":{\"Brand\":\"ASUS\",\"Series\":\"ROG\",\"Model\":\"MAXIMUS XII HERO (WI-FI)\"},\"details\":{\"CPU Socket Type\":\"LGA 1200\",\"Chipset\":\"Intel Z490 Gbps\",\"Maximum Memory Supported\":\"128GB\",\"SATA 6Gb/s\":\"6 x SATA 6Gb/s\"}}', 399.99, 'images/13-119-267-V01.jpg'),
(9, 'GIGABYTE X570 AORUS MASTER', 'motherboard', 'GIGABYTE X570 AORUS MASTER AMD Ryzen 3000 PCIe 4.0 SATA 6Gb/s USB 3.2 AMD X570 ATX Motherboard', '', '[\"Support for Ryzen 5000 Series with BIOS UPDATE\",\"Supports AMD Ryzen 5000 Series / 3rd Gen Ryzen/2nd Gen Ryzen/ 2nd Gen Ryzen with Radeon Vega Graphics/Ryzen with Radeon Vega Graphics Processors\",\"Dual Channel ECC / Non-ECC Unbuffered DDR4, 4 DIMMs\",\"Direct 14 Phases Infineon Digital VRM Solution with 50A PowIRstage\",\"Advanced Thermal Design - Fins-Array Heatsink & Direct Touch Heatpipe\",\"Triple Ultra-Fast NVMe PCIe 4.0/3.0 x4 M.2 with Triple Thermal Guards\",\"Intel Wi-Fi 6 802.11 ax & BT 5 with AORUS Antenna\",\"ALC1220-VB & ESS SABRE 9118 DAC, 125dB Rear\",\"Realtek 2.5GbE + Intel Gigabit LAN\",\"USB TurboCharger for Mobile Device Fast Charge Support\",\"RGB FUSION 2.0 with Multi-Zone Addressable LED Light Show Design\",\"Smart Fan 5 - Hybrid Fan Headers with FAN STOP and Noise Detection\",\"1 x Front Panel & 1 x Rear USB 3.2 Gen 2 Type-C\",\"Integrated I/O Shield\",\"Q-Flash Plus Update BIOS Without Installing CPU, Memory, GPU\"]', '{\"model\":{\"Brand\":\"GIGABYTE\",\"Model\":\"X570 AORUS MASTER\"},\"details\":{\"CPU Socket Type\":\"AM4\",\"Chipset\":\"AMD X570\",\"Maximum Memory Supported\":\"128GB\",\"SATA 6Gb/s\":\"6 x SATA 6Gb/s\"}}', 359.99, 'images/13-145-155-V01.jpg'),
(10, 'CORSAIR Vengeance LPX 32GB (2 x 16GB) 288-Pin DDR4 SDRAM', 'ram', 'CORSAIR Vengeance LPX 32GB (2 x 16GB) 288-Pin DDR4 SDRAM DDR4 3200 (PC4 25600) Intel XMP 2.0 Desktop Memory Model CMK32GX4M2B3200C16', '', '[\"DDR4 3200 (PC4 25600)\",\"Timing 16-18-18-36\",\"CAS Latency 16\",\"Voltage 1.35V\"]', '{\"model\":{\"Brand\":\"CORSAIR\",\"Series\":\"Vengeance LPX\",\"Model\":\"CMK32GX4M2B3200C16\"},\"details\":{\"Capacity\":\"32GB (2 x 16GB)\",\"Type\":\"288-Pin DDR4 SDRAM\",\"Speed\":\"DDR4 3200 (PC4 25600)\"}}', 131.69, 'images/20-233-894-10.jpg'),
(11, 'CORSAIR Vengeance RGB Pro (AMD Ryzen Ready) 32GB (4 x 8GB) 288-Pin DDR4 4000', 'ram', 'CORSAIR Vengeance RGB Pro (AMD Ryzen Ready) 32GB (4 x 8GB) 288-Pin DDR4 4000 (PC4 32000) Desktop Memory Model CMW32GX4M4Z4000C18', '', '[\"DDR4 4000 (PC4 32000)\",\"Timing 18-22-22-42\",\"CAS Latency 18\",\"Voltage 1.35V\",\"AMD Ryzen Ready\",\"Compatible with AMD Ryzen Series CPU\"]', '{\"model\":{\"Brand\":\"CORSAIR\",\"Series\":\"Vengeance RGB Pro\",\"Model\":\"CMW32GX4M4Z4000C18\"},\"details\":{\"Capacity\":\"32GB (4 x 8GB)\",\"Type\":\"288-Pin DDR4 SDRAM\",\"Speed\":\"DDR4 4000 (PC4 32000)\"}}', 299.99, 'images/20-236-580-01.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
