const User = require('../models/user.model');

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({'message': 'Body can not be empty!'});
  }

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    address: req.body.address,
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

};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};
