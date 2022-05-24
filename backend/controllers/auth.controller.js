// importing user context
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
      firstName, lastName, userName, email: email.toLowerCase(), address, password: encryptPass
    });

    const token = jwt.sign({user_id: newUser.id, email}, process.env.TOKEN_KEY, {
      expiresIn: '2h'
    });

    newUser.token = token;
    res.status(201).json(newUser);
  } catch (e) {
    console.log(e)
  }
}

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    // Validate user input
    if (!(email && password)) {
      return res.status(400).send({message: "All input is required"});
    }
    const user = await User.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        {user_id: user.id, email},
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (e) {
    console.log(e)
  }
}
