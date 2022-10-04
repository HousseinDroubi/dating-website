-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 04, 2022 at 11:01 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `datingdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `blockers`
--

CREATE TABLE `blockers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `blocking` int(11) NOT NULL,
  `blocked` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sender` int(11) NOT NULL,
  `receiver` int(11) NOT NULL,
  `text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`id`, `sender`, `receiver`, `text`, `created_at`, `updated_at`) VALUES
(5, 1, 2, 'hello', '2022-10-04 08:28:15', '2022-10-04 08:28:15'),
(6, 2, 1, 'hi', '2022-10-04 08:28:25', '2022-10-04 08:28:25'),
(7, 1, 2, 'how are you', '2022-10-04 08:28:37', '2022-10-04 08:28:37'),
(8, 2, 1, 'good', '2022-10-04 08:28:45', '2022-10-04 08:28:45'),
(9, 1, 4, 'hi 4', '2022-10-04 08:29:13', '2022-10-04 08:29:13'),
(10, 4, 1, 'hi 1', '2022-10-04 08:31:08', '2022-10-04 08:31:08'),
(17, 1, 2, 'Wherever there\'s smoke there\'s fire 🔥', '2022-10-04 15:12:30', '2022-10-04 15:12:30'),
(18, 1, 2, '🔥', '2022-10-04 15:52:14', '2022-10-04 15:52:14');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `favoriting` int(11) NOT NULL,
  `favorited` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `favoriting`, `favorited`, `created_at`, `updated_at`) VALUES
(10, 1, 2, '2022-10-04 17:49:59', '2022-10-04 17:49:59'),
(12, 1, 4, '2022-10-04 17:53:25', '2022-10-04 17:53:25');

-- --------------------------------------------------------

--
-- Table structure for table `interesters`
--

CREATE TABLE `interesters` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `gender` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `interested_in` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `interesters`
--

INSERT INTO `interesters` (`id`, `gender`, `interested_in`, `created_at`, `updated_at`) VALUES
(1, 'man', 'woman', '2022-10-04 09:51:36', '2022-10-04 09:51:36'),
(2, 'man', 'man', '2022-10-04 09:51:36', '2022-10-04 09:51:36'),
(3, 'man', 'woman and man', '2022-10-04 09:52:08', '2022-10-04 09:52:08'),
(4, 'woman', 'man', '2022-10-04 09:52:29', '2022-10-04 09:52:29'),
(5, 'woman', 'woman', '2022-10-04 09:52:29', '2022-10-04 09:52:29'),
(6, 'woman', 'woman and man', '2022-10-04 09:52:29', '2022-10-04 09:52:29');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_10_04_094928_create_chats_table', 1),
(6, '2022_10_04_094947_create_interesters_table', 1),
(7, '2022_10_04_094826_create_favorites_table', 2),
(8, '2022_10_04_094857_create_blockers_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` int(10) UNSIGNED NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `incognito` int(11) NOT NULL DEFAULT 0,
  `interested` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `bio`, `image`, `gender`, `age`, `location`, `incognito`, `interested`, `created_at`, `updated_at`) VALUES
(1, 'houssein@gmail.com', 'houssein', '$2y$10$qHvHRnDHQUfgfxltou7QQ.87xiWPHnPvaC9IjjkQQbn/uNZHCpVXe', 'hello world', 'http://localhost/dating-website/backend/users/1664872343.png', 'F', 12, 'bekaa', 0, 6, '2022-10-04 06:54:02', '2022-10-04 06:54:02'),
(2, 'ali@gmail.com', 'ali', '$2y$10$qHvHRnDHQUfgfxltou7QQ.87xiWPHnPvaC9IjjkQQbn/uNZHCpVXe', 'hello world', 'http://localhost/dating-website/backend/users/1664872343.png', 'M', 12, 'beirut', 0, 0, '2022-10-04 10:38:14', '2022-10-04 10:38:14'),
(3, 'mhamad@gmail.com', 'mhamad', '123', 'Hello world', 'http://localhost/dating-website/backend/users/1664872343.png', 'F', 23, 'beirut', 0, 1, '2022-10-04 10:43:51', '2022-10-04 10:43:51'),
(4, 'Abbas@gmail.com', 'Abbas', '123', 'Hello wrold', 'http://localhost/dating-website/backend/users/1664872343.png', 'M', 12, 'bekaa', 0, 3, '2022-10-04 10:43:51', '2022-10-04 10:43:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blockers`
--
ALTER TABLE `blockers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `interesters`
--
ALTER TABLE `interesters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_username_unique` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blockers`
--
ALTER TABLE `blockers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `interesters`
--
ALTER TABLE `interesters`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
