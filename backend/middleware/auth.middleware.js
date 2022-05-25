//Ref: https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;
const config = process.env;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }
    return res.status(401).send({ message: "Unauthorized!" });
}

const verifyToken = (req, res, next) => {
    if (config.IS_NEED_AUTHEN.toString() === 'false') {
        return next();
    }
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: 'A token is required for authentication' });
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

module.exports = verifyToken;