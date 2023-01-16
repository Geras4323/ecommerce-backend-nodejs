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
    const link = `http://localhost:3000/auth/new-password/${token}`;
    const emailInfo = {
      to: user.email,
      subject: "Password Recovery",
      html: `
      <div>
        <p>A password recovery has been requested.</p>
        <p>Please click this link to reset your password: ${link}</p>
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