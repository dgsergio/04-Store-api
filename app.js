const express = require('express');
const app = express();
const products = require('./routes/products');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const connectDB = require('./db/connect');
require('dotenv').config();

app.use(express.json());
app.use('/api/v1/products', products);

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to home page</h1>
    </br> 
    <a href="api/v1/products">Go to the API Store</a>
    `);
});

app.use(notFound);
app.use(errorHandler);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.log('el error: ' + err);
  }
};

start();
