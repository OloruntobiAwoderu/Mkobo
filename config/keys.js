require('dotenv').config();

module.exports = {
  TEST_DB: process.env.TEST_DB,
  DATA_DB: process.env.MONGOLAB_URI,
  JWTSecret: process.env.JWT_Secret,
  FRONTEND: process.env.FRONTEND,
  USER_MAIL: process.env.USER_MAIL,
  PASSWORD_MAIL: process.env.PASSWORD_MAIL,
  SENDGRID_USERNAME: process.env.SENDGRID_USERNAME,
  SENDGRID_PASSWORD: process.env.SENDGRID_PASSWORD,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
};