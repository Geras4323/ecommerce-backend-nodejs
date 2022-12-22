const { User, UserSchema } = require('./user.model');
const { Order, OrderSchema } = require('./order.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');
const { Product, ProductSchema } = require('./product.model');
const { Category, CategorySchema } = require('./category.model');
const { Payment, PaymentSchema } = require('./payment.model');
const { Supplier, SupplierSchema } = require('./supplier.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Payment.init(PaymentSchema, Payment.config(sequelize));
  Supplier.init(SupplierSchema, Supplier.config(sequelize));

  // User - Order (1-N)
  User.hasMany(Order, {
    as: 'orders',
    foreignKey: 'userID',
  });
  // Order.belongsTo(User, {
  //   as: 'user',
  // });


  // Order - Product (M-N)
  Order.belongsToMany(Product, {
    through: OrderProduct,
    as: 'products',
    foreignKey: 'orderID',
    otherKey: 'productID',
  });
  // Product.belongsToMany(Order, {
  //   through: OrderProduct,
  //   as: 'orders',
  // });


  // Product - Category (1-N)
  Category.hasMany(Product, {
    as: 'products',
    foreignKey: 'categoryID',
  });
  // Product.belongsTo(Category, {
  //   as: 'category',
  // });


  // Order - Payment (1-N)
  Order.hasMany(Payment, {
    as: 'payments',
    foreignKey: 'orderID',
  });
  // Payment.belongsTo(Order, {
  //   as: 'order',
  // })


  // Supplier - Product (1-N)
  Supplier.hasMany(Product, {
    as: 'products',
    foreignKey: 'supplierID',
  });
  // Product.belongsTo(Supplier, {
  //   as: 'supplier',
  // })
}

module.exports = { setupModels };