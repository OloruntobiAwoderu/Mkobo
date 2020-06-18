const models = require("../../models");

const crypto = require("crypto");
const bcrypt = require('bcryptjs')
const mail = require("../helpers/ResetPassword");
const response = require("../helpers/response");
const { generateToken } = require("../helpers/jwt");
const { successResponse, errorHelper } = require("../helpers/response");


module.exports = {
  async createUser(req, res) {
    try {
      req.body.AccountNumber = Math.floor(Date.now() + Math.random());
      const user = await models.User.create(req.body);
      const token = await generateToken(user);
      const userDetails = await models.User.findOne({email: user.email})
      return successResponse(res, 201, { msg: "Usercreated", token, userDetails });
    } catch (error) {
      return errorHelper(res, 500, error.message);
    }
  },
  async loginUser(req, res, next) {
    try {
      const user = await models.User.findOne({ email: req.body.email }).select(
        "+password"
      );

      if (!user) {
        return errorHelper(res, 401, "Invalid credentials");
      }
      const confirm = user.comparePassword(req.body.password);
      if (!confirm) {
        return errorHelper(res, 401, "Invalid credentials");
      }
      const token = await generateToken(user);
      const userDetails = await models.User.findOne({ email: req.body.email })

      return successResponse(res, 200, {
        message: "successfully logged in",
        token,
        userDetails
      });
    } catch (error) {
      return errorHelper(res, 500, error.message);
    }
  },

  async sendPasswordMail(req, res, next) {
    const token = await crypto.randomBytes(20).toString("hex");
    const expiringDate = Date.now() + 360000;
    console.log(req.userEmail);
    try {
      mail.passwordResetMail(
        `http://localhost:4000/users/newpassword`,
        token,
        req.userEmail.email,
        req.userEmail.firstname
      );
      await models.User.findOneAndUpdate(
        { email: req.userEmail.email },
        {
          reset_password_token: token,
          reset_password_expires: expiringDate
        },
        { new: true }
      );

      return response.successResponse(
        res,
        200,
        `Email sent to ${req.userEmail.email}`
      );
    } catch (error) {
      return next({ message: "Error sending mail tryagain" });
    }
  },
  async resetPassword(req, res, next) {
    const { token } = req.query;
    try {
      const user = await models.User.findOne({
        reset_password_token: token
      }).exec();
      if (!user) {
        return response.errorHelper(
          res,
          401,
          "Invalid token to reset password"
        );
      }
      const savedDate = user.reset_password_expires;
      const date = Date.now() - savedDate;

      if (date > 0) {
        return response.errorHelper(res, 400, "Password reset have expired");
      }
      const hash = await bcrypt.hash(req.body.password, 14);
      await models.User.findOneAndUpdate(
        { email: user.email },
        {
          password: hash,
          reset_password_token: ""
        },
        { new: true }
      ).exec();
      return response.successResponse(res, 200, "Password reset was succesful");
    } catch (error) {
      return next({ message: error.message });
    }
  }
};
