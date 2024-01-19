import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {  type: String, required: true },
    lastName: {  type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPLzLa8Y7cpvIrC-xdW6IL-dhiqOq_du7Q60f-TeoNhg&s" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);  

export default User;
