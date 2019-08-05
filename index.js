const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Import routes here
const register = require('./backend/routes/auth/register')();

// Serve the static files from the React app
app.use(bodyParser.json({ limit: '150mb' }));
app.use(bodyParser.urlencoded({ limit: '150mb', extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
app.use('/api/', register);

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
  const list = ['item1', 'item2', 'item3'];
  res.json(list);
  console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`App is listening on port ${port}`);
