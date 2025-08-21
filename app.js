const express = require("express");
const app = express()
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const user = require('./routes/user.routes');
const book = require('./routes/book.routes');
const rental = require('./routes/rentals.routes')
const auth = require('./routes/auth.routes');

app.use(cors({
  origin: '*'
  // origin: ['http://localhost:4200']
}))

app.use('/api/auth', auth);
app.use('/api/users', user);
app.use('/api/books', book);
app.use('/api/rentals', rental);

app.use('/', express.static('files'))

app.use(
  '/api-docs', 
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument.options)  
);

module.exports = app