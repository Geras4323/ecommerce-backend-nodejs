const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: ['Customer', 'Products']
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
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
}

module.exports = OrderService;