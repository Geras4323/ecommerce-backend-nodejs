const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const { models } = require('../libs/sequelize');


class PaymentService {
  constructor() {}

  async find(query) {
    const options = {
      where: {}
    }
    const { limit, offset } = query;
    if (limit || offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const { amount } = query;
    if (amount) {
      options.where.amount = amount;
    }
    const { amount_min, amount_max } = query;
    if (amount_min && amount_max) {
      options.where.amount = {
        [Op.between]: [amount_min, amount_max],
      }
    } else if (amount_min && !amount_max) {
        options.where.amount = {
          [Op.gte]: amount_min,
        }
    } else if (!amount_min && amount_max) {
        options.where.amount = {
          [Op.lte]: amount_max,
        }
    }

    const payments = await models.Payment.findAll(options);
    return payments;
  }

  async findOne(id) {
    const payment = await models.Payment.findByPk(id);
    if (!payment) {
      throw boom.notFound('Payment not found');
    }
    return payment;
  }

  async create(data) {
    if (Array.isArray(data)) {
      for (const payment of data) {
        await models.Payment.create(payment);
      }
      return { message: 'Payments created' }
    } else {
      const newPayment = await models.Payment.create(data);
      return newPayment;
    }
  }

  async update(id, data) {
    const payment = await this.findOne(id);
    const updated = await payment.update(data);
    return updated;
  }

  async updatePartially(id, data) {
    const payment = await this.findOne(id);
    const updated = await payment.update(data);
    return updated;
  }

  async delete(id) {
    const payment = await this.findOne(id);
    await payment.destroy();
    return { id, message: 'Successfully deleted' };
  }
}

module.exports = PaymentService;