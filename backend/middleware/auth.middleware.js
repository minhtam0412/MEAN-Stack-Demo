//Ref: https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
const jwt = require("jsonwebtoken");
const {TokenExpiredError} = jwt;
const config = process.env;
const User = require('../models/user.model');
const Role = require('../models/role.model');

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({message: "Unauthorized! Access Token was expired!"});
  }
  return res.status(401).send({message: "Unauthorized!"});
};

const verifyToken = (req, res, next) => {
  if (config.IS_REQUIRED_AUTHEN.toString() === 'false') {
    return next();
  }
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({message: 'No token provided. A token is required for authentication'});
  }
  try {
    jwt.verify(token, config.TOKEN_KEY, (err, decoded) => {
      if (err) {
        return catchError(err, res);
      }
      req.user = decoded;
      next();
    });

  } catch (err) {
    console.log('err', err);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({message: 'Request is not authenticated! Not found user info!'});
  }
  User.findOne({_id: req.user.userId}).exec((error, user) => {
    if (error) {
      return res.status(500).send({message: error.message});
    }
    Role.find({_id: {$in: user.roles}}, (err, roles) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (roles && roles.length > 0) {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === 'admin') {
            next();
            return;
          }
        }
        return res.status(403).send({message: 'Require Admin role!'});
      }
    });
  });
};

const isModerator = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({message: 'Request is not authenticated! Not found user info!'});
  }
  User.findOne({_id: req.user.userId}).exec((error, user) => {
    if (error) {
      return res.status(500).send({message: error.message});
    }
    Role.find({_id: {$in: user.roles}}, (err, roles) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (roles && roles.length > 0) {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === 'moderator') {
            next();
            return;
          }
        }
        return res.status(403).send({message: 'Require Moderator role!'});
      }
    });
  });
}
const authJwt = {verifyToken, isAdmin, isModerator};

module.exports = authJwt;
