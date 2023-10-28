const { DataTypes } = require("sequelize");
const db = require("../db/db");
const Products = require("./products");

const Feature = db.define(
  "feature",
  {
    ft_id: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      primaryKey: true
    },
    names: {
      type: DataTypes.STRING,
      allowNull: false
    },
    feature_type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

const ListFeature = db.define(
  "list_feature",
  {
    id: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      primaryKey: true
    },
    sub_feature_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ft_id: {
      type: DataTypes.CHAR(20),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

const ProductWithFeature = db.define("product_with_feature", {
  pf_id: {
    type: DataTypes.CHAR(20),
    primaryKey: true
  },
  product_id: {
    type: DataTypes.CHAR(20),
    allowNull: false
  },
  ft_id: {
    type: DataTypes.CHAR(20),
    allowNull: false
  }
});

ListFeature.belongsTo(Feature, { foreignKey: "ft_id", onDelete: "CASCADE" });
ProductWithFeature.belongsTo(Feature, {
  foreignKey: "ft_id",
  onDelete: "CASCADE"
});
ProductWithFeature.belongsTo(Products, {
  foreignKey: "product_id",
  onDelete: "CASCADE"
});

module.exports = { Feature, ListFeature, ProductWithFeature };
