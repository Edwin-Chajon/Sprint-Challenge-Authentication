const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


const bcrypt = require("bcryptjs");
const router = require("express").Router();


const session = require('express-session')
const KnexStore = require("connect-session-knex")(session);
const knex = require("../database/dbConfig");
const usersRouter = require("../users/router");
const restricted = require("../auth/authenticate-middleware");



router.get("/hash", (req, res) => {

    const authentication = req.headers.authentication;
  
    const hash = bcrypt.hashSync(authentication, 12);
  
    res.json({ originalValue: authentication, hashedValue: hash });
  
});



const sessionConfig = {
    name: "THE COOKIE MONSTER",
    secret: "keep it secret, keep it safe!",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 10,
      secure: false,
      httpOnly: true,
    },
    store: new KnexStore({
      knex,
      tablename: "sessions",
      createtable: true,
      sidfieldname: "sid",
      clearInterval: 1000 * 60
    }),
  } 


const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig))

router.use("/api/users", authenticate,  usersRouter);
server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);




module.exports = server;
