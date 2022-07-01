require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const productRoutes = require('./routes/products');

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

//	vital
app.use(express.json());

//	route
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});
app.use('/api/v1/products', productRoutes);

//	middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('DB connected');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
