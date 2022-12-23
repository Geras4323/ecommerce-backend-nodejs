const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');


class CategoryService {
  constructor() {}

  async find(query) {
    const options = {
      where: {}
    };
    const { limit, offset } = query;
    if (limit || offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const { active } = query;
    if (active) {
      options.where.active = active;
    }

    const categories = await models.Category.findAll(options);
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async create(data) {
    if (Array.isArray(data)) {
      for (const category of data) {
        await models.Category.create(category);
      }
      return { message: 'Categories created' }
    } else {
      const newCategory = await models.Category.create(data)
      return newCategory;
    }
  }

  async update(id, data) {
    const category = await this.findOne(id);
    const updated = await category.update(data);
    return updated;
  }

  async updatePartially(id, data) {
    const category = await this.findOne(id);
    const updated = await category.update(data);
    return updated;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id, message: 'Successfully deleted' };
  }
}

module.exports = CategoryService;