// const faker = require('faker');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const { models } = require('../libs/sequelize')


class ProductsService {
  constructor() {
    // this.products = [];
    // this.generate()
  }

  // generate() {
  //   for (let i = 0; i < 25; i++) {
  //     this.products.push({
  //       id: faker.datatype.uuid(),
  //       name: faker.commerce.productName(),
  //       price: parseInt(faker.commerce.price(), 10),
  //       image: faker.image.imageUrl(),
  //       isVisible: faker.datatype.boolean(),
  //     });
  //   }
  // }

  async find(query) {
    const options = {
      where: {}
    }
    const { limit, offset } = query;
    if (limit || offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const { price } = query;
    if (price) {
      options.where.price = price;
    }
    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.between]: [price_min, price_max],
      }
    } else if (price_min && !price_max) {
        options.where.price = {
          [Op.gte]: price_min,
        }
    } else if (!price_min && price_max) {
        options.where.price = {
          [Op.lte]: price_max,
        }
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    } else {
      return product;
    }
  }

  async create(data) {
    if (Array.isArray(data)) {
      for (const product of data) {
        await models.Product.create(product);
      }
      return { message: 'Products created' }
    } else {
      const newProduct = await models.Product.create(data);
      return newProduct;
    }
  }

  async update(id, changes) {
    const product = await this.findOne(id)
    const updated = await product.update(changes)
    return updated;
  }

  async updatePartially(id, changes) {
    const product = await this.findOne(id)
    const updated = await product.update(changes)
    return updated;
  }

  async delete(id) {
    const product = await this.findOne(id)
    await product.destroy();
    return { id, message: 'Successfully deleted' };
  }
}

module.exports = ProductsService;