const boom = require('@hapi/boom');
require('dotenv').config();

const { signToken } = require('../utils/token/signToken');
const { verifyToken } = require('../utils/token/verifyToken');
const UserService = require('../services/user.service');
const { sendEMail } = require('../utils/mails/nodemailer');
const { hashPassword } = require('../utils/hashing/hashPassword');

const userService = new UserService();

class AuthService {
  constructor() {}

  async sendPasswordRecoveryEmail(user) {
    const payload = {
      sub: user.id,
    }
    const token = signToken(payload, process.env.JWT_SECRET_RECOVERY, { expiresIn: '15min' });
    await userService.updatePartially(user.id, { recovery_token: token });
    const link = `https://web-shop-next-geras4323.vercel.app/auth/new-password/${token}`;
    const emailInfo = {
      to: user.email,
      subject: "Password Recovery",
      html: `
      <div>
        <h1 style='color: #74c27e'>A password recovery has been requested.</h1>
        <h2 style='color: black'>Please click this link to reset your password:</h2>
        <a href='${link}' style='width: 200px; text-align: center; vertical-align: center; font-size: 16px; display: grid; align-items: center; text-decoration: none; border-radius: 8px; color: #74c27e; background-color: white; border: 1px solid #74c27e'>
          Recover password
        </a>
        <p style='font-size: 16px; color: black'>If the button doesn&apos;t work, try this link instead:</p>
        <p>${link}</p>
      </div>
      `,
    }
    const sent = await sendEMail(emailInfo);
    return sent;
  }

  async changePassword(token, newPassword) {
    const payload = verifyToken(token, process.env.JWT_SECRET_RECOVERY);
    const user = await userService.findOne(payload.sub); // payload.sub == DB user.id
    if (token === user.recovery_token) {
      await userService.updatePartially(user.id, {
        password: await hashPassword(newPassword),
        recovery_token: null,
      })
      return { message: 'Password updated successfully' };
    } else {
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;