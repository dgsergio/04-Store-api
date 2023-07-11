const Product = require('../models/products');
require('express-async-errors');

const getProducts = async (req, res) => {
  const { name, company, sort, featured, fields, numericFilters } = req.query;
  let queries = {};

  if (name) queries.name = name;
  if (company) queries.company = company;
  if (featured) queries.featured = featured === 'true' ? true : false;

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queries[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queries);

  if (sort) result = result.sort(sort.split(',').join(' '));
  if (fields) result = result.select(fields.split(',').join(' '));

  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;

  const products = await result.limit(limit).skip(skip);

  res.status(200).json({ nHits: products.length, products });
};

module.exports = getProducts;
