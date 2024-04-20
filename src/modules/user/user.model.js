import { Schema, model } from "mongoose";

const OTPSchema = new Schema({
  code: { type: String, required: false, default: null },
  expiresIn: { type: Number, required: false, default: 0 },
});

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: false,
      trim: true,
      maxLength: 150,
    },
    mobile: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    otp: { type: OTPSchema },
    verifiedMobile: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;
