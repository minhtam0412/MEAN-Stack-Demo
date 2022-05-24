//https://dev.to/suhailkakar/building-a-restful-crud-api-with-node-js-express-and-mongodb-1541
const User = require('../models/user.model');
const bcrypt = require('bcryptjs')

exports.create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({'message': 'Body can not be empty!'});
  }

  const encryptPass = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    address: req.body.address,
    password: encryptPass
  });

  user.save().then(rsl => {
    res.send(rsl);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User."
    });
  })
};

exports.findAll = (req, res) => {
  User.find().then((data) => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users.",
    });
  })
};

exports.findOne = (req, res) => {
  User.findById(req.params.userId).then((data) => {
    if (!data) {
      return res.status(400).send({
        message: 'User not found with id ' + req.params.messageId
      });
    }
    res.send(data);
  }).catch(err => {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId,
      });
    }
    return res.status(500).send({
      message: "Error retrieving User with id " + req.params.userId,
    });
  });
};

exports.update = (req, res) => {
  User.findByIdAndUpdate(req.params.userId, {
    email: req.body.email,
    address: req.body.address ? req.body.address : null
  }, {new: true}).then((data) => {
    if (!data) {
      return req.status(404).send({message: "User not found with id " + req.params.userId})
    }
    res.send(data);
  }).catch(err => {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId,
      });
    }
    return res.status(500).send({
      message: "Error updating User with id " + req.params.userId,
    });
  })
};

exports.delete = (req, res) => {
  User.findByIdAndDelete(req.params.userId).then((data) => {
    if (!data) {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId,
      });
    }
    res.send({message: "User deleted successfully!"});
  }).catch(err => {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId,
      });
    }
    return res.status(500).send({
      message: "Could not delete User with id " + req.params.userId,
    });
  })
};
