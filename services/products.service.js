const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate()
  }

  generate() {
    for (let i = 0; i < 25; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isVisible: faker.datatype.boolean(),
      });
    }
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 1)
    })
  }

  findOne(id) {
    const product = this.products.find(product => product.id === id)
    if (!product) {
      throw boom.notFound('Product not found');
    } else if (!product.isVisible) {
      throw boom.conflict('This product is not visible')
    } else {
      return product;
    }
  }

  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    }
    this.products.push(newProduct);
    return newProduct;
  }

  update(id, changes) {
    const index = this.products.findIndex(product => product.id === id)
    if (index === -1) {
      throw boom.notFound('Product not found')
    }
    this.products[index] = changes;
    return this.products[index];
  }

  updatePartially(id, changes) {
    const index = this.products.findIndex(product => product.id === id)
    if (index === -1) {
      throw boom.notFound('Product not found')
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    }
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex(product => product.id === id)
    if (index === -1) {
      throw boom.notFound('Product not found')
    }
    this.products.splice(index, 1);
    return { id }
  }
}

module.exports = ProductsService;