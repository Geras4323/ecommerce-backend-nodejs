const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const { models } = require('../libs/sequelize');
const { sendEMail } = require('../utils/mails/nodemailer');


class OrderService {
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
    const { total } = query;
    if (total) {
      options.where.total = total;
    }
    const { total_min, total_max } = query;
    if (total_min && total_max) {
      options.where.total = {
        [Op.between]: [total_min, total_max],
      }
    } else if (total_min && !total_max) {
        options.where.total = {
          [Op.gte]: total_min,
        }
    } else if (!total_min && total_max) {
        options.where.total = {
          [Op.lte]: total_max,
        }
    }

    const orders = await models.Order.findAll(options);
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: ['products', 'payments']
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async findByUser(userId) {
    const options = {
      where: {
        userID: userId,
      }
    }
    const orders = await models.Order.findAll(options)
    return orders;
  }

  async create(data) {
    if (Array.isArray(data)) {
      for (const service of data) {
        await models.Order.create(service);
      }
      return { message: 'Orders created' }
    } else {
      const newOrder = await models.Order.create(data);
      return newOrder;
    }
  }


  async sendNotificationEmail(userData, orderData) {
    const text = userData + orderData;
    const emailInfoForMe = {
      to: process.env.OWNERS_EMAIL,
      subject: 'E-commerce - New Reservation',
      html: text,
    }
    const sent = await sendEMail(emailInfoForMe);
    return sent;
  }

  async sendConfirmationEmail(email, orderData) {
    const emailInfoForUser = {
      to: email,
      subject: 'E-commerce - Reservation confirmed',
      html: orderData,
    }
    const sent = await sendEMail(emailInfoForUser);
    return sent;
  }


  async addProduct(data) {
    const addedProduct = await models.OrderProduct.create(data);
    return addedProduct;
  }

  async update(id, data) {
    const order = await this.findOne(id);
    const updated = await order.update(data);
    return updated;
  }

  async updatePartially(id, data) {
    const order = await this.findOne(id);
    const updated = await order.update(data);
    return updated;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id, message: 'Successfully deleted' };
  }

  async removeProduct(id, productID) {
    const order_product = await models.OrderProduct.findOne({
      where: {
        orderID: id,
        productID: productID,
      }
    });
    await order_product.destroy();
    return { id, message: 'Product removed from order' };
  }
}

module.exports = OrderService;