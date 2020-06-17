const models = require("../../models");
const { successResponse, errorHelper } = require("../helpers/response");

module.exports = {
  async transfer(req, res, next) {
    const { user } = req;
    const { amount, AccountNumber } = req.body;
    try {
      if (user.Accountbal >= amount) {
        const withdraw = user.Accountbal - amount;
        const sender = await models.User.findByIdAndUpdate(
          user.id,
          { Accountbal: withdraw },
          { new: true }
        );
        const reciever = await models.User.findOneAndUpdate(
          { AccountNumber },
          { $inc: { Accountbal: amount } },
          { new: true }
        );
        const newBody = {
          userid: user.id,
          status: "Debit",
          amount: amount,
          balance: sender.Accountbal,
          transactionStatus: "Successful",
          AccountNumber: AccountNumber,
          name: `${reciever.firstname} ${reciever.lastname}`
        };
        const newBody2 = {
          userid: reciever.id,
          status: "Credit",
          amount: amount,
          balance: reciever.Accountbal,
          transactionStatus: "Successful",
          AccountNumber: sender.AccountNumber,
          name: `${user.firstname} ${user.lastname}`
        };
        const Sendertransaction = await models.Transaction.create(newBody);
        const Recievertransaction = await models.Transaction.create(newBody2);
        return successResponse(res, 200, Sendertransaction);
      } else {
        const reciever = await models.User.findOne({
          AccountNumber: AccountNumber
        });
        const failedbody = {
          userid: user.id,
          status: "Debit",
          amount: amount,
          balance: user.Accountbal,
          transactionStatus: "Failed",
          AccountNumber: AccountNumber,
          name: `${reciever.firstname} ${reciever.lastname}`
        };
        const Failedtransaction = await models.Transaction.create(failedbody);
        return successResponse(res, 200, Failedtransaction);
      }
    } catch (error) {
      errorHelper(res, 500, 'Internal Server Error');
    }
  },
  async getTransactionHistory(req, res, next){

  }
};
