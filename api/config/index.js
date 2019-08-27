require('dotenv').config();

module.exports = {
  development: {
    JWT_SECRET: process.env.JWT_SECRET || 'buttz'
  }
};
