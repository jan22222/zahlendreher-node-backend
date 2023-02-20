const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  if (req.body.role) {
    Role.findOne(
      {
        name: req.body.role
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        console.log("found role", role)
        var user = new User({
          username: req.body.username,
          email: req.body.email,
          role,
          password: bcrypt.hashSync(req.body.password, 8)
        });
        console.log("user rendered", user)

        user.save((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
                user.save(err => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
                  console.log("user saved", user)
                  
                  res.send({ message: "User was registered successfully!" });
                });
              }
            );

      })
    }

  

 
    
    
    } 


exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("role", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
console.log(user)
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = "ROLE_" + user.role.name.toUpperCase();
      
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        role: authorities,
        accessToken: token
      });
    });
};