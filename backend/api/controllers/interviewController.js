import Interview from "../models/interviewModel.js";
import { getGeminiModel } from "../config/gemini.js";

const interviewController = {
  createInterview: async (req, res) => {
    try {
      const { questions } = req.body;

      const interview = await Interview.create({
        userId: req.user.userId,
        questions: questions.map((q) => ({ text: q })),
      });

      res.status(201).json({
        message: "Interview created successfully",
        interview,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getInterviews: async (req, res) => {
    try {
      const interviews = await Interview.find({ userId: req.user.userId }).sort(
        { createdAt: -1 }
      );

      res.json(interviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getInterviewById: async (req, res) => {
    try {
      const interview = await Interview.findOne({
        _id: req.params.id,
        userId: req.user.userId,
      });

      if (!interview) {
        return res.status(404).json({ message: "Interview not found" });
      }

      res.json(interview);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  submitAnswer: async (req, res) => {
    try {
      const { questionIndex, answer } = req.body;
      const interview = await Interview.findOne({
        _id: req.params.id,
        userId: req.user.userId,
      });

      if (!interview) {
        return res.status(404).json({ message: "Interview not found" });
      }

      if (questionIndex >= interview.questions.length) {
        return res.status(400).json({ message: "Invalid question index" });
      }

      const model = getGeminiModel();
      const prompt = `As an interview evaluator, rate this answer from 1-5 and provide feedback. 
        Question: ${interview.questions[questionIndex].text}
        Answer: ${answer}
        Please respond in JSON format like this: {"rating": X, "feedback": "your feedback here"}`;

      const result = await model.generateContent(prompt);
      const response = JSON.parse(result.response.text());

      interview.questions[questionIndex].answer = answer;
      interview.questions[questionIndex].rating = response.rating;
      interview.questions[questionIndex].feedback = response.feedback;

      if (questionIndex === interview.questions.length - 1) {
        interview.status = "completed";
      } else {
        interview.status = "in-progress";
      }

      await interview.save();
      res.json(interview);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteInterview: async (req, res) => {
    try {
      const interview = await Interview.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.userId,
      });

      if (!interview) {
        return res.status(404).json({ message: "Interview not found" });
      }

      res.json({ message: "Interview deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default interviewController;
