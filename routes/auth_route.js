const Authentication = require('../controllers/authentication');

module.exports = app => {
  app.post('/api/signup', Authentication.signup);
};
