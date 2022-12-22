const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class SupplierService {
  constructor() {}

  async find() {
    const customers = await models.Supplier.findAll();
    return customers;
  }

  async findOne(id) {
    const customer = await models.Supplier.findByPk(id, {
      include: ['products']
    });
    if (!customer) {
      throw boom.notFound('Supplier not found');
    }
    return customer;
  }

  async create(data) {
    if (Array.isArray(data)) {
      for (const supplier of data) {
        await models.Supplier.create(supplier);
      }
      return { message: 'Suppliers created' }
    } else {
      const newSupplier = await models.Supplier.create(data);
      return newSupplier;
    }
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

module.exports = SupplierService;