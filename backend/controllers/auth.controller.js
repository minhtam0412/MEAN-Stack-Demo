// importing user context
const User = require('../models/user.model');
const RefreshTokenModel = require('../models/refreshToken.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require("uuid");
const config = require("../config/auth.config");

exports.register = async (req, res) => {
  try {
    const {firstName, lastName, email, userName, password, address} = req.body;
    if (!(email && userName && password)) {
      return res.status(400).send({
        message: 'All input is required'
      });
    }

    const oldUser = await User.findOne({email});
    if (oldUser) {
      return res.status(409).send({message: 'User already exist. Please login'});
    }

    const encryptPass = await bcrypt.hash(password, 10);

    // Create user in database
    const newUser = await User.create({
      firstName,
      lastName,
      userName,
      email: email.toLowerCase(),
      address,
      password: encryptPass
    });

    const token = jwt.sign({user_id: newUser.id, email}, process.env.TOKEN_KEY, {
      expiresIn: config.jwtExpiration
    });

    newUser.token = token;
    res.status(201).json(newUser);
  } catch (e) {
    console.log(e)
  }
}

exports.createRefreshToken = (user) => {
  let expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

  let _token = uuidv4();
  let refreshToken = new RefreshTokenModel({
    token: _token,
    userId: user.id,
    user: user.id,
    expiryDate: expiredAt
  });
  return refreshToken;
}

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    // Validate user input
    if (!(email && password)) {
      return res.status(400).send({message: "All input is required"});
    }
    const user = await User.findOne({$or: [{email}, {userName: email}]}).populate('roles', 'name');
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({userId: user.id, email},
        process.env.TOKEN_KEY, {
          expiresIn: config.jwtExpiration
        }
      );
      const refreshToken = await RefreshTokenModel.create(this.createRefreshToken(user));
      // save user token
      user.token = token;
      user.refreshToken = refreshToken.token;

      // user
      return res.status(200).json(user);
    }
    res.status(400).send({message: "Invalid Credentials"});
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: err.message});
  }
}

exports.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
};

exports.refreshToken = async (req, res) => {
  const {refreshToken: requestToken} = req.body;
  if (requestToken == null) {
    return res.status(403).json({message: "Refresh Token is required!"});
  }

  try {
    let refreshToken = await RefreshTokenModel.findOne({token: requestToken});
    if (!refreshToken) {
      res.status(403).json({message: "Refresh token is not in database!"});
      return;
    }
    if (this.verifyExpiration(refreshToken)) {
      await RefreshTokenModel.findByIdAndDelete(refreshToken._id);

      return res.status(403).json({
        message: "Refresh token was expired. Please signin again!",
      });
    }
    // user
    const user = await User.findById(refreshToken.userId);
    if (user) {
      const token = jwt.sign({userId: user._id, email: user.email},
        process.env.TOKEN_KEY, {
          expiresIn: config.jwtExpiration
        }
      );
      // save refresh token
      const refreshToken = await RefreshTokenModel.create(this.createRefreshToken(user));

      user.token = token;
      user.refreshToken = refreshToken.token;

      return res.status(200).json(user);
    }
    console.log(user)
  } catch (err) {
    return res.status(500).send({message: err});
  }
}
