require('dotenv').config();

module.exports = {
  TEST_DB: process.env.TEST_DB,
  DATA_DB: process.env.MONGOLAB_URI,
  JWTSecret: process.env.JWT_Secret,
  FRONTEND: process.env.FRONTEND,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDERS_EMAIL: process.env.SENDERS_EMAIL
};