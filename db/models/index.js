const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { Order, OrderSchema } = require('./order.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));


  // Customer.associate(sequelize.models)
  // User - Customer (1-1)
  User.hasOne(Customer, {
    as: 'Customer',
    foreignKey: 'UserId',
  });
  Customer.belongsTo(User, {
    as: 'User',
  });

  // Customer - Order (1-N)
  Customer.hasMany(Order, {
    as: 'Orders',
    foreignKey: 'CustomerId',
  });
  Order.belongsTo(Customer, {
    as: 'Customer',
  });

  // Category - Product (1-N)
  Category.hasMany(Product, {
    as: 'Products',
    foreignKey: 'CategoryId',
  });
  Product.belongsTo(Category, {
    as: 'Category',
  });

  // Order - Product (M-N)
  Order.belongsToMany(Product, {
    through: OrderProduct,
    as: 'Products',
    foreignKey: 'OrderId',
    otherKey: 'ProductId',
  });
  Product.belongsToMany(Order, {
    through: OrderProduct,
    as: 'Orders',
  });
}

module.exports = { setupModels };