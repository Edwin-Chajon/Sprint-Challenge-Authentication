const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require('jsonwebtoken');

const Users = require("../users/model");
const { jwtSecret } = require("../config/secrets.js");

router.post("/register", (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 12);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      req.session.loggedIn = true;
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
     if(user && bcrypt.compareSync(password, user.password)) {
         const token = generateToken(user)
       req.session.loggedIn = true;
       req.session.user = user.username;
        res.status(200).json({ message: `Sup ${user.username}!`, token })
      } else{
        res.status(401).json({ message: "Invalid" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const options = {
        expiresIn: '3h',
    }

    return jwt.sign(payload, jwtSecret, options)
}

router.get("/logout", (req, res) => {
  
    req.session.destroy(err => {
      err ? 
        res.status(500).json({you: "there was an error"})
      : res.status(200).json({ you: "logged out successfully" })
    });
  
});

module.exports = router;