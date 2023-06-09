const express = require("express");
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const image = require('./controllers/image.js')
const imageid = require('./controllers/imageid.js');
const { port } = require("pg/lib/defaults");

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        port: "5432",
        password: "postgresql-2002",
        database: "smart-brain"
    }
});

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {res.send("Its working");})

app.post('/signin', signin.handlerSignin(db,bcrypt));

app.post('/register', (req, res) => {register.handlerRegister(req,res,db,bcrypt)})

app.get("/profile/:id", (req, res) =>{imageid.imageIdHandler(req,res,db)} );

app.put('/image', (req, res) => {image.imageHandler(req,res,db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)});

app.listen(process.env.PORT || 3000, () => {console.log(`app is running on port ${process.env.port || 3000}`);})
