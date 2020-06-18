const mongoose = require("mongoose");
const db = require("../config/db");

const { User, Transaction } = require("../models/index");

mongoose.Promise = global.Promise;

const userData = {
  firstname: "John",
  lastname: "doe",
  email: "johndoe@gmail.com",
  password: "123456789",
  amount: 4000,
  AccountNumber: 1123345413
};
const cleanDB = async () => {
  // drop all database here
  const deleteUser = await User.deleteMany({});
  const deleteTransactions = await Transaction.deleteMany({});

  return deleteUser && deleteTransactions;
};

const connectDB = async () => {
  try {
    const connect = await db();
    return connect;
  } catch (error) {
    return console.error(error);
  }
};

const disconnectDB = async () => {
  try {
    const disconnect = await mongoose.disconnect();
    return disconnect;
  } catch (error) {
    return console.error(error);
  }
};

const createUser = () => {
  return User.create(userData);
};
const getUser = async () => {
  const user = await User.findOne({ email: "johndoe@gmail.com" }).exec();
  return user;
};
const createTransaction = async () => {
  const transactionData = {
    userId: await (await getUser())._id,
    amount: 4000,
    status: "Debit",
    balance: 5000,
    transactionStatus: "Successful",
    AccountNumber: 1245677888,
    name: "James blunt"
  };

  const transaction = await Transaction.create(transactionData);
  return transaction;
};
const getTransaction = async () => {
  const transaction = await Transaction.findOne({
    AccountNumber: 1245677888
  }).exec();
  return transaction;
};

module.exports = {
  connectDB,
  disconnectDB,
  createUser,
  cleanDB,
  getUser,
  createTransaction,
  getTransaction
};
