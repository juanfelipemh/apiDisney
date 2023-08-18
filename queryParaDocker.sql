CREATE TABLE Characters (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  image VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL DEFAULT 0,
  weight FLOAT NOT NULL DEFAULT 0,
  history TEXT NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
) ENGINE=InnoDB;

CREATE TABLE Movies (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  image VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  publicationDate DATE NOT NULL,
  rate INTEGER NOT NULL CHECK (rate >= 1 AND rate <= 5),
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
) ENGINE=InnoDB;

CREATE TABLE Genders (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
) ENGINE=InnoDB;

CREATE TABLE Character_movie_gender (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  idCharacter INTEGER NOT NULL,
  idMovie INTEGER NOT NULL,
  idGender INTEGER NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
) ENGINE=InnoDB;

ALTER TABLE Character_movie_gender
ADD CONSTRAINT fk_movie
FOREIGN KEY (idMovie) REFERENCES Movies(id)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE Character_movie_gender
ADD CONSTRAINT fk_character
FOREIGN KEY (idCharacter) REFERENCES Characters(id)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE Character_movie_gender
ADD CONSTRAINT fk_gender
FOREIGN KEY (idGender) REFERENCES Genders(id)
ON DELETE CASCADE
ON UPDATE CASCADE;

CREATE TABLE Users (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
) ENGINE=InnoDB;


INSERT INTO Characters (image, name, age, weight, history, createdAt, updatedAt) VALUES
('character1.jpg', 'Elena', 28, 58.5, 'Elena is a skilled archer who roams the forests protecting her village from threats.', '2023-08-18 10:23:45', '2023-08-18 10:23:45'),
('character2.jpg', 'Gareth', 35, 72.8, 'Gareth is a seasoned knight, known for his unwavering loyalty to the kingdom.', '2023-08-18 11:45:30', '2023-08-18 11:45:30'),
('character3.jpg', 'Luna', 22, 53.2, 'Luna is a mischievous sorceress with a penchant for playing pranks on unsuspecting travelers.', '2023-08-18 14:17:20', '2023-08-18 14:17:20'),
('character4.jpg', 'Alistair', 45, 85.7, 'Alistair is a wise old wizard who has spent centuries studying ancient tomes of magic.', '2023-08-18 16:55:10', '2023-08-18 16:55:10');

INSERT INTO Movies (image, title, publicationDate, rate, createdAt, updatedAt) VALUES
('movie1.jpg', 'The Enchanted Forest', '2022-05-15', 4, '2023-08-18 10:23:45', '2023-08-18 10:23:45'),
('movie2.jpg', 'Knight's Honor', '2021-11-28', 3, '2023-08-18 11:45:30', '2023-08-18 11:45:30'),
('movie3.jpg', 'Sorcerer\'s Secrets', '2023-03-02', 5, '2023-08-18 14:17:20', '2023-08-18 14:17:20'),
('movie4.jpg', 'Eternal Magic', '2023-07-10', 4, '2023-08-18 16:55:10', '2023-08-18 16:55:10');

INSERT INTO Genders (name, image, createdAt, updatedAt) VALUES
('Action', 'action.jpg', '2023-08-18 10:23:45', '2023-08-18 10:23:45'),
('Adventure', 'adventure.jpg', '2023-08-18 11:45:30', '2023-08-18 11:45:30'),
('Fantasy', 'fantasy.jpg', '2023-08-18 14:17:20', '2023-08-18 14:17:20'),
('Sci-Fi', 'scifi.jpg', '2023-08-18 16:55:10', '2023-08-18 16:55:10');


-- Relación 1
INSERT INTO Character_movie_gender (idCharacter, idMovie, idGender, createdAt, updatedAt) VALUES
(1, 1, 1, '2023-08-18 10:23:45', '2023-08-18 10:23:45');

-- Relación 2
INSERT INTO Character_movie_gender (idCharacter, idMovie, idGender, createdAt, updatedAt) VALUES
(2, 3, 2, '2023-08-18 11:45:30', '2023-08-18 11:45:30');

-- Relación 3
INSERT INTO Character_movie_gender (idCharacter, idMovie, idGender, createdAt, updatedAt) VALUES
(3, 2, 3, '2023-08-18 14:17:20', '2023-08-18 14:17:20');

-- Relación 4
INSERT INTO Character_movie_gender (idCharacter, idMovie, idGender, createdAt, updatedAt) VALUES
(4, 4, 4, '2023-08-18 16:55:10', '2023-08-18 16:55:10');

-- Relación 5
INSERT INTO Character_movie_gender (idCharacter, idMovie, idGender, createdAt, updatedAt) VALUES
(1, 2, 1, '2023-08-18 18:30:15', '2023-08-18 18:30:15');

-- Relación 6
INSERT INTO Character_movie_gender (idCharacter, idMovie, idGender, createdAt, updatedAt) VALUES
(3, 4, 2, '2023-08-18 19:55:40', '2023-08-18 19:55:40');

-- Relación 7
INSERT INTO Character_movie_gender (idCharacter, idMovie, idGender, createdAt, updatedAt) VALUES
(2, 1, 3, '2023-08-18 21:10:20', '2023-08-18 21:10:20');

-- Relación 8
INSERT INTO Character_movie_gender (idCharacter, idMovie, idGender, createdAt, updatedAt) VALUES
(4, 3, 4, '2023-08-18 22:40:10', '2023-08-18 22:40:10');

-- Relación 9
INSERT INTO Character_movie_gender (idCharacter, idMovie, idGender, createdAt, updatedAt) VALUES
(1, 4, 2, '2023-08-18 23:25:30', '2023-08-18 23:25:30');

-- Relación 10
INSERT INTO Character_movie_gender (idCharacter, idMovie, idGender, createdAt, updatedAt) VALUES
(3, 1, 4, '2023-08-19 00:15:15', '2023-08-19 00:15:15');


