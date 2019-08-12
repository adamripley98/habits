const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);

const app = express();

// Import routes here
const register = require('./backend/routes/auth/register')();
const login = require('./backend/routes/auth/login');
const sync = require('./backend/routes/auth/sync')();
const logout = require('./backend/routes/auth/logout')();

// Serve the static files from the React app
app.use(bodyParser.json({ limit: '150mb' }));
app.use(bodyParser.urlencoded({ limit: '150mb', extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.use(
  expressSession({
    secret: 'mySecretKey',
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
    resave: true,
    saveUninitialized: true,
  }),
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

const initPassport = require('./backend/utils/passport/init');
const useLocalStrategy = require('./backend/utils/passport/localStrategy');

initPassport(passport);
useLocalStrategy(passport);

// Routes
app.use('/api/', register);
app.use('/api/', login(passport));
app.use('/api/', sync);
app.use('/api/', logout);

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
