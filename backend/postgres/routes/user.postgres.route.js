const express = require('express');
const router = express.Router();
const user = require('../services/user.postgres.controller');


/* GET user listing. */
router.get('/', async function (req, res, next) {
  try {
    res.json(await user.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    next(err);
  }
});

/* POST user */
router.post('/', async function (req, res, next) {
  try {
    res.json(await user.create(req.body));
  } catch (err) {
    console.error(`Error while posting user `, err.message);
    next(err);
  }
});

module.exports = router;
