const express = require('express');
const passport = require('passport');
require('dotenv').config();

const validationHandler = require('../middlewares/validation.handler');
const { changePassword } = require('../schemas/user.schema');
const { signToken } = require('../utils/token/signToken');
const UserService = require('../services/user.service');
const AuthService = require('../services/auth.service');


const router = express.Router();
const userService = new UserService();
const authService = new AuthService();

router.post('/login',
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      }
      const signedToken = signToken(payload, process.env.JWT_SECRET_LOGIN);
      res.json({ user, token: signedToken });
    } catch (err) {
      next(err);
    }
  }
)

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await userService.findByEmail(email);
      const sent = await authService.sendPasswordRecoveryEmail(user);
      res.status(200).json(sent);
    } catch (err) {
      next(err);
    }
  }
)

router.post('/change-password',
  validationHandler(changePassword, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const updated = await authService.changePassword(token, newPassword);
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }
)


module.exports = router;