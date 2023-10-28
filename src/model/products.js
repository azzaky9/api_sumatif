const { DataTypes } = require("sequelize");
const db = require("../db/db");

const Products = db.define("products", {
  id: {
    type: DataTypes.CHAR(20),
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
  },
  jenjang: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kelas: {
    type: DataTypes.STRING,
    allowNull: true
  },
  group: {
    type: DataTypes.ENUM("Ruang Belajar", "Onsite Learning", "Brain Academy")
  },
  group_by_month: {
    type: DataTypes.INTEGER(),
    allowNull: false
  },
  is_product_display: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
});

module.exports = Products;
