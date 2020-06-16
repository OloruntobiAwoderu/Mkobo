const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "User must have a email"],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false
    },
    firstname: {
      type: String,
      required: [true, "User must have a firstname"],
      trim: true
    },
    lastname: {
      type: String,
      required: [true, "User must have a lastname"],
      trim: true
    },
    Accountbal: {
      type: Number,
      default: 0,
      required: true
    },
    AccountNumber: {
      type: Number,
      required: true
    },
    reset_password_token: {
      type: String
    },
    reset_password_expires: {
      type: Number
    }
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function(password) {
  const user = bcrypt.compareSync(password, this.password);
  return user ? this : null;
};

userSchema.pre("save", function(next) {
  if (!this.confirmed) {
    const hashPassword = bcrypt.hashSync(this.password, 10);
    this.password = hashPassword;
  }
  next();
});

module.exports = mongoose.model("user", userSchema);
