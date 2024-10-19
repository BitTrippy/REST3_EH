DROP DATABASE IF EXISTS athletes;
CREATE DATABASE athletes;
USE athletes;


CREATE TABLE athlete(
athleteId INT AUTO_INCREMENT PRIMARY KEY,
fullName VARCHAR(40) NOT NULL,
nickName VARCHAR(20) NOT NULL,
birthYear DATE NOT NULL,
weight INT NOT NULL,
image VARCHAR(255) NOT NULL,
sport VARCHAR(30) NOT NULL,
achievements VARCHAR(255)
);

INSERT INTO athlete(fullName, nickName, birthYear, weight, image, sport, achievements) VALUES 
("Cristiano Ronaldo", 
 "CR7", 
 "1996-02-05", 
 83, 
 "https://upload.wikimedia.org/wikipedia/commons/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg",
 "Football",
 "UEFA European Championship 2016");
 
 INSERT INTO athlete(fullName, nickName, birthYear, weight, image, sport, achievements) VALUES 
("LeBron James", 
 "King James", 
 "1984-12-30", 
 113, 
 "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/LeBron_James_%2851959977144%29_%28cropped2%29.jpg/250px-LeBron_James_%2851959977144%29_%28cropped2%29.jpg",
 "Basketball",
 "NBA Champion 2012, Olympics MVP 2024");
 
  INSERT INTO athlete(fullName, nickName, birthYear, weight, image, sport, achievements) VALUES 
("Teemu Selänne", 
 "The Finnish Flash", 
 "1970-7-3", 
 89, 
 "https://upload.wikimedia.org/wikipedia/commons/c/c4/Teemu_Selanne_on_the_ice_November_2010.jpg",
 "Ice Hockey",
 "Hockey Hall of Fame");