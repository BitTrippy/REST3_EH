const express = require("express");

// MariaDB kirjaston tuonti. Käytin tätä, koska se oli lähellä esimerkin mySQL kirjastoa.
const mariadb = require("mariadb");

const app = express();
const port = 3000;

app.use(express.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Content-type", "application/json");

  // Pass to next layer of middleware
  next();
});

// MariaDB yhteys asetusten määritys --- OMAT TIEDOT TÄHÄN ---
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "", // Vaihda tämä
  database: "athletes",
  connectionLimit: 5,
});

// Funktio BigInt-tyyppisten arvojen serialisointiin.
// Tämän avulla pääsin eroon virheestä: "TypeError: Do not know how to serialize a BigInt", jota näin konsolissa kun yritin suorittaa API kutsuja
const serializeBigInt = (obj) => {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};

// Kaikkien urheilijoiden hakeminen
app.get("/api", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM athlete");
    res.json(serializeBigInt(rows));
  } catch (err) {
    res.status(500).send(err);
  }
  if (conn) conn.end();
});

// Urheilijan hakeminen nimellä
app.get("/api/name/:fullName", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT * FROM athlete WHERE fullName = ?",
      req.params.fullName
    );
    res.json(serializeBigInt(rows));
  } catch (err) {
    res.status(500).send(err);
  }
  if (conn) conn.end();
});

// Urheilijan hakeminen ID:n avulla
app.get("/api/id/:athleteId", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT * FROM athlete WHERE athleteId = ?",
      req.params.athleteId
    );
    res.json(serializeBigInt(rows));
  } catch (err) {
    res.status(500).send(err);
  }
  if (conn) conn.end();
});

// Urheilijan lisääminen
app.post("/api/add", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "INSERT INTO athlete (fullName, nickName, birthYear, weight, image, sport, achievements) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        req.body.fullName,
        req.body.nickName,
        req.body.birthYear,
        req.body.weight,
        req.body.image,
        req.body.sport,
        req.body.achievements,
      ]
    );

    const athlete = {
      fullName: req.body.fullName,
      nickName: req.body.nickName,
      birthYear: req.body.birthYear,
      weight: req.body.weight,
      image: req.body.image,
      sport: req.body.sport,
      achievements: req.body.achievements,
    };

    res.status(201).json({
      message: "Athlete added successfully",
      // Palautetaan myös lisätyn urheilijan tiedot
      athlete: athlete,
      rows: serializeBigInt(rows),
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  } finally {
    if (conn) conn.end();
  }
});

// Urheilijan poisto urheilijaId:n perusteella
app.delete("/api/delete/:athleteId", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "DELETE FROM athlete WHERE athleteId = ?",
      req.params.athleteId
    );
    res.json({
      message: `Athlete deleted successfully`,
      rows: serializeBigInt(rows),
    });
  } catch (err) {
    res.status(500).send(err);
  }
  if (conn) conn.end();
});

// Urheilijan päivitys urheilijaId:n perusteella
app.put("/api/update/:athleteId", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "UPDATE athlete SET fullName = ?, nickName = ?, birthYear = ?, weight = ?, image = ?, sport = ?, achievements = ? WHERE athleteId = ?",
      [
        req.body.fullName,
        req.body.nickName,
        req.body.birthYear,
        req.body.weight,
        req.body.image,
        req.body.sport,
        req.body.achievements,
        req.params.athleteId,
      ]
    );
    res.json({ rows: serializeBigInt(rows) });
  } catch (err) {
    res.status(500).send(err);
  }
  if (conn) conn.end();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
