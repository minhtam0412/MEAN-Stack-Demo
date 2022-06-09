const omitEmpty = require("omit-empty");
const camelcaseKeys = require("camelcase-keys");
const removeEmptyProperties = () => {
  return function (req, res, next) {
    req.body = omitEmpty(req.body);
    req.params = omitEmpty(req.params);
    req.query = omitEmpty(req.query);
    next()
  }
};
const camelcase = () => {
  return function (req, res, next) {
    req.body = camelcaseKeys(req.body, {deep: true});
    req.params = camelcaseKeys(req.params);
    req.query = camelcaseKeys(req.query);
    next()
  }
};

module.exports = {
  removeEmptyProperties, camelcase
}
