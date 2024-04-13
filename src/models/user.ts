import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: new Schema(
      {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
      },
      { timestamps: false, _id: false }
    ),
    required: true,
  },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  address: {
    type: new Schema(
      {
        line1: { type: String, required: true },
        line2: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
      },
      { timestamps: false, _id: false }
    ),
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
