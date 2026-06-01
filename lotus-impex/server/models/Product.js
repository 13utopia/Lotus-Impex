const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  sale_price: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  material: {
    type: DataTypes.STRING,
    allowNull: true
  },
  standard: {
    type: DataTypes.STRING,
    allowNull: true
  },
  working_temperature: {
    type: DataTypes.STRING,
    allowNull: true
  },
  connection_ways: {
    type: DataTypes.STRING,
    allowNull: true
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sales_models: {
    type: DataTypes.STRING,
    allowNull: true
  },
  valve_seal: {
    type: DataTypes.STRING,
    allowNull: true
  },
  surface_treatment: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pressure_value: {
    type: DataTypes.STRING,
    allowNull: true
  },
  moq: {
    type: DataTypes.STRING,
    allowNull: true
  },
  seal_material: {
    type: DataTypes.STRING,
    allowNull: true
  },
  transport_package: {
    type: DataTypes.STRING,
    allowNull: true
  },
  features: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  application: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  stock_status: {
    type: DataTypes.STRING,
    defaultValue: 'In Stock'
  },
  tags: {
    type: DataTypes.JSON, // Stored as stringified JSON in SQLite
    defaultValue: []
  },
  images: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  specifications: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_new_arrival: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_best_seller: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

// Setup relationship
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

module.exports = Product;
