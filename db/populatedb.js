require("dotenv").config();
const { Client } = require("pg");
const { argv } = require("node:process");
const query = `
CREATE TABLE IF NOT EXISTS games (
  gameID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255),
  genre VARCHAR(30),
  publisher VARCHAR(255),
  developer VARCHAR(255),
  release_year DATE
);

CREATE TABLE IF NOT EXISTS tech_info (
  techInfoID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  gameID INTEGER,
  type VARCHAR(255),
  platform VARCHAR(255),
  player_count INT,
  requirements JSON,
  FOREIGN KEY (gameID) REFERENCES games(gameID) ON DELETE CASCADE
);

ALTER SEQUENCE games_gameID_seq RESTART WITH 1;

INSERT INTO games (title, genre, publisher, developer, release_year) 
VALUES
  ('The Last of Us', 'Action-Adventure', 'Sony Interactive Entertainment', 'Naughty Dog', '2013-06-14'),
  ('God of War', 'Action', 'Sony Interactive Entertainment', 'Santa Monica Studio', '2018-04-20'),
  ('Cyberpunk 2077', 'RPG', 'CD Projekt', 'CD Projekt Red', '2020-12-10'),
  ('Red Dead Redemption 2', 'Action-Adventure', 'Rockstar Games', 'Rockstar Studios', '2018-10-26'),
  ('The Witcher 3: Wild Hunt', 'RPG', 'CD Projekt', 'CD Projekt Red', '2015-05-19'),
  ('Halo Infinite', 'First-Person Shooter', 'Xbox Game Studios', '343 Industries', '2021-12-08'),
  ('Resident Evil Village', 'Survival Horror', 'Capcom', 'Capcom', '2021-05-07'),
  ('Ghost of Tsushima', 'Action-Adventure', 'Sony Interactive Entertainment', 'Sucker Punch Productions', '2020-07-17'),
  ('Assassins Creed Valhalla', 'Action RPG', 'Ubisoft', 'Ubisoft Montreal', '2020-11-10'),
  ('Elden Ring', 'Action RPG', 'Bandai Namco Entertainment', 'FromSoftware', '2022-02-25');

INSERT INTO tech_info (gameID, type, platform, player_count, requirements) 
VALUES
  (1, 'Single-Player', 'PlayStation 4', 1, '{"CPU": "Intel i5", "RAM": "8GB", "GPU": "NVIDIA GTX 660"}'),
  (2, 'Single-Player', 'PlayStation 4', 1, '{"CPU": "Intel i7", "RAM": "16GB", "GPU": "NVIDIA GTX 1080"}'),
  (3, 'Single-Player', 'PC', 1, '{"CPU": "Intel i7", "RAM": "16GB", "GPU": "NVIDIA RTX 2070"}'),
  (4, 'Single-Player', 'PlayStation 4', 1, '{"CPU": "Intel i7", "RAM": "16GB", "GPU": "NVIDIA GTX 1070"}'),
  (5, 'Single-Player', 'PC', 1, '{"CPU": "Intel i7", "RAM": "16GB", "GPU": "NVIDIA GTX 1060"}'),
  (6, 'Single-Player', 'Xbox Series X', 1, '{"CPU": "AMD Ryzen", "RAM": "16GB", "GPU": "AMD RDNA 2"}'),
  (7, 'Single-Player', 'PlayStation 5', 1, '{"CPU": "AMD Ryzen", "RAM": "16GB", "GPU": "AMD RDNA 2"}'),
  (8, 'Single-Player', 'PlayStation 4', 1, '{"CPU": "Intel i5", "RAM": "8GB", "GPU": "NVIDIA GTX 660"}'),
  (9, 'Single-Player', 'PlayStation 5', 1, '{"CPU": "AMD Ryzen", "RAM": "16GB", "GPU": "AMD RDNA 2"}'),
  (10, 'Single-Player', 'PC', 1, '{"CPU": "Intel i7", "RAM": "16GB", "GPU": "NVIDIA RTX 3080"}');
`;

const main = async () => {
  const dbUrl = argv[2] || process.env.CONNECTION_URI;

  console.log("seeding...");
  const client = new Client({
    connectionString: dbUrl,
  });
  await client.connect();
  await client.query(query);
  await client.end();
  console.log("Data populated!");
};

main();
