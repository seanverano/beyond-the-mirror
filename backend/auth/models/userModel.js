import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: String,
    yearsOfExperience: Number,
    role: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
