-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : Dim 30 août 2020 à 14:41
-- Version du serveur :  10.4.14-MariaDB
-- Version de PHP : 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `lapsteel`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`) VALUES
(1, 'admin', '$2a$10$F7uiYZjqEu37/PzFWVOibupd1/llEw/k4ZLeKK1amJndrtkKziGp2');

-- --------------------------------------------------------

--
-- Structure de la table `homepage`
--

CREATE TABLE `homepage` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `subtitle` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `section` varchar(200) NOT NULL,
  `isActived` int(11) NOT NULL,
  `image_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `homepage`
--

INSERT INTO `homepage` (`id`, `title`, `subtitle`, `description`, `section`, `isActived`, `image_id`) VALUES
(127, 'News', '', '', 'title-news-section', 1, 0),
(128, '', 'news 1', '{\"date\":\"30-08-2020\",\"description\":\"description 1\"}', 'homepage-news-section', 1, NULL),
(129, '', 'news 2', '{\"date\":\"30-08-2020\",\"description\":\"description 2\"}', 'homepage-news-section', 1, NULL),
(130, 'version du site', '', 'v1.0', 'version-website', 1, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `homepage_card`
--

CREATE TABLE `homepage_card` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `subtitle` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `isActived` tinyint(4) NOT NULL,
  `image_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `homepage_card`
--

INSERT INTO `homepage_card` (`id`, `title`, `subtitle`, `description`, `isActived`, `image_id`) VALUES
(49, 'Lapsteelator', '', 'description', 1, 155),
(50, 'Vidéos', '', 'description', 0, 156);

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `alt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `image`
--

INSERT INTO `image` (`id`, `name`, `url`, `alt`) VALUES
(155, 'img-guitar.JPG', '/images/img-guitar.JPG', 'image img-guitar.JPG'),
(156, 'img-videos.JPG', '/images/img-videos.JPG', 'image img-videos.JPG');

-- --------------------------------------------------------

--
-- Structure de la table `lapsteelator`
--

CREATE TABLE `lapsteelator` (
  `id` int(11) NOT NULL,
  `liste_mode` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `video`
--

CREATE TABLE `video` (
  `id` int(11) NOT NULL,
  `url` text NOT NULL,
  `rubrique` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `video`
--

INSERT INTO `video` (`id`, `url`, `rubrique`) VALUES
(9, 'https://www.youtube.com/embed/rzKmrjYZ-3A', 'feat'),
(10, 'https://www.youtube.com/embed/gaYWmT-uQkM', 'cover'),
(12, 'https://www.youtube.com/embed/6Oyqr0TziT0', 'cover'),
(13, 'https://www.youtube.com/embed/onyCoqaqmTA', 'freestyle'),
(14, 'https://www.youtube.com/embed/KBd9ruOez2s', 'freestyle'),
(15, 'https://www.youtube.com/embed/bobt139-gAo', 'freestyle');

-- --------------------------------------------------------

--
-- Structure de la table `vitrine`
--

CREATE TABLE `vitrine` (
  `id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `homepage`
--
ALTER TABLE `homepage`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `homepage_card`
--
ALTER TABLE `homepage_card`
  ADD PRIMARY KEY (`id`),
  ADD KEY `image_id` (`image_id`);

--
-- Index pour la table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `lapsteelator`
--
ALTER TABLE `lapsteelator`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `vitrine`
--
ALTER TABLE `vitrine`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT pour la table `homepage`
--
ALTER TABLE `homepage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT pour la table `homepage_card`
--
ALTER TABLE `homepage_card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pour la table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- AUTO_INCREMENT pour la table `lapsteelator`
--
ALTER TABLE `lapsteelator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT pour la table `video`
--
ALTER TABLE `video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT pour la table `vitrine`
--
ALTER TABLE `vitrine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `homepage_card`
--
ALTER TABLE `homepage_card`
  ADD CONSTRAINT `homepage_card_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
