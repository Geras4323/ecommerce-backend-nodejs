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
      include: ['products', 'payments']
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
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