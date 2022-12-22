const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');


class PaymentService {
  constructor() {}

  async find() {
    const payments = await models.Payment.findAll();
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
    const payment = this.findOne(id);
    await payment.destroy();
    return { id, message: 'Successfully deleted' };
  }
}

module.exports = PaymentService;