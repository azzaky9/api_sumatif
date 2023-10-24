const Product = require("../../model/products");

const createProduct = async (req, res) => {
  try {
    await Product.create({
      id: 1,
      name: "Title",
      description: "Product testing",
      price: 900000
    });

    res
      .status(200)
      .send({ message: "Product complete to create", status: "success" });
  } catch (error) {}
};

module.exports = { createProduct };
