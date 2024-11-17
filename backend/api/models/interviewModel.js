import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  questions: [
    {
      questionRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      text: String,
      answer: String,
      feedback: String,
      rating: Number,
    },
  ],
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Interview = mongoose.model("Interview", interviewSchema);
export default Interview;
