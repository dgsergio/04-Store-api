const Product = require('../models/products');
require('express-async-errors');

const getProducts = async (req, res) => {
  const products = await Product.find(xx);
  //think if there is an error express-async-errors catch it automatically so I must define a middleware for error handling in app.js
  res.status(200).json({ products });
};

module.exports = getProducts;
