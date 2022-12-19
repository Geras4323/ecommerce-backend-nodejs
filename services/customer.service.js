const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async find() {
    const customers = await models.Customer.findAll();
    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include: ['User', 'Orders']
    });
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async create(data) {
    const created = await models.Customer.create(data, {
      include: ['User']
    });
    return created;
  }

  async update(id, data) {
    const customer = await this.findOne(id);
    const updated = await customer.update(data);
    return updated;
  }

  async updatePartially(id, data) {
    const customer = await this.findOne(id);
    const updated = await customer.update(data);
    return updated;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id, message: 'Successfully deleted' }
  }
}

module.exports = CustomerService;