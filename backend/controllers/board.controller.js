exports.allAccess = (req, res) => {
  res.status(200).send(`Public content. Every one can see, not require login`);
};

exports.userBoard = (req, res) => {
  res.status(200).send('User content. Only logined user can see');
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin content. Only Admin Role can see');
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content. Only moderator can see");
};
