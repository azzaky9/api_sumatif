const { DataTypes } = require("sequelize");
const db = require("../db/db");

const Products = db.define("products", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  discount: {
    type: DataTypes.SMALLINT,
    defaultValue: 0
  }
});

Products.sync()

module.exports = Products
