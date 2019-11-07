const userRoutes = require('./users.route');

module.exports = (app) => {
  app.use('/api/users', userRoutes)
};
