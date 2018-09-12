const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

app.use(express.static('client/public'));
app.use(express.json());

require('./routes/auth_route')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
});

/*
1. create dev.js file inside config folder.
2. provide your credentials as an object like below.

module.exports = {
  secret: '',
  mongoURI: ''
}
*/
