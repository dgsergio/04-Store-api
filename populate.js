const connectDB = require('./db/connect');
const Product = require('./models/products');
require('dotenv').config();
const productsJSON = require('./products.json');

const populate = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Connection established...');
    await Product.deleteMany({});
    await Product.create(productsJSON);
    console.log('Populate was success!');
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

populate();
