const express = require('express');
const app = express();
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URI)
.then(
() => {console.log('Connection to MongoDB established')},
(err) => {console.log('Failed to connect to MongoDB', err)}
)

const user = require('./routes/user.routes');
const product = require('./routes/product.routes');
const userProducts = require('./routes/user.product.routes');

app.use('/api/users', user);
app.use('/api/products', product);
app.use('/api/user-products', userProducts);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument.options));

app.use('/', express.static('files'));

module.exports = app;

