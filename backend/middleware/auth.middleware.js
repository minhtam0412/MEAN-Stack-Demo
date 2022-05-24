//Ref: https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  if (config.IS_NEED_AUTHEN.toString() === 'false') {
    return next();
  }
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({message: 'A token is required for authentication'});
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).send({message: 'Invalid Token'});
  }
  return next();
};

module.exports = verifyToken;
