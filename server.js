require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const image = require("./controllers/image.js");
const imageid = require("./controllers/imageId.js");
const { port } = require("pg/lib/defaults");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: 5432,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB,
  },
});

const app = express();

app.use(cors());

app.use(express.json());

app.use("/favicon.ico", express.static("favicon.png"));

app.get("/", (req, res) => {
  res.send("Its working");
});

app.post("/signin", signin.handlerSignin(db, bcrypt));

app.post("/register", (req, res) => {
  register.handlerRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  imageid.imageIdHandler(req, res, db);
});

app.put("/image", (req, res) => {
  image.imageHandler(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT, () => {
  console.log(`app is running on port http://localhost:${process.env.PORT}/`);
});
