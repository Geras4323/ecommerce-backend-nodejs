const express = require('express');
const passport = require('passport');
require('dotenv').config();

const { signToken } = require('../utils/token/signToken');


const router = express.Router();

router.post('/',
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role,
      }
      const signedToken = signToken(payload, process.env.JWT_SECRET);
      res.json({ user, token: signedToken });
    } catch (err) {
      next(err);
    }
  }
)

module.exports = router;