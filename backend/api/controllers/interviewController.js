import Interview from "../models/interviewModel.js";
import Question from "../models/questionModel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const interviewController = {
  createInterview: async (req, res) => {
    try {
      const questionIds = req.body.questions.map((q) => q._id);
      const fullQuestions = await Question.find({
        _id: { $in: questionIds },
        userId: req.user.userId,
      });

      const interview = new Interview({
        userId: req.user.userId,
        questions: fullQuestions.map((q) => ({
          questionRef: q._id,
          text: q.text,
        })),
      });

      await interview.save();
      res.status(201).json({ interview });
    } catch (error) {
      console.error("Error creating interview:", error);
      res.status(400).json({ message: "Error creating interview" });
    }
  },

  getInterview: async (req, res) => {
    try {
      const interview = await Interview.findOne({
        _id: req.params.id,
        userId: req.user.userId,
      }).populate("questions.questionRef");

      if (!interview) {
        return res.status(404).json({ message: "Interview not found" });
      }

      res.json(interview);
    } catch (error) {
      console.error("Error fetching interview:", error);
      res.status(500).json({ message: "Error fetching interview" });
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

      const question = interview.questions[questionIndex];

      const prompt = `You are an expert interviewer evaluating technical interview responses. 
      
Question: "${question.text}"
Candidate's Answer: "${answer}"

Please provide:
1. A detailed feedback on the answer (2-3 sentences evaluating accuracy, completeness, and clarity)
2. A rating from 1-5 where:
   1 = Completely incorrect or irrelevant
   2 = Partially correct but major gaps
   3 = Mostly correct with some minor issues
   4 = Very good answer with minimal gaps
   5 = Perfect answer, comprehensive and clear

Format your response exactly like this:
FEEDBACK: [Your feedback here]
RATING: [1-5]`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();

      const feedbackMatch = response.match(/FEEDBACK: (.*?)(?=RATING:|$)/s);
      const ratingMatch = response.match(/RATING: (\d)/);

      if (!feedbackMatch || !ratingMatch) {
        throw new Error("Invalid API response format");
      }

      const feedback = feedbackMatch[1].trim();
      const rating = parseInt(ratingMatch[1]);

      interview.questions[questionIndex].answer = answer;
      interview.questions[questionIndex].feedback = feedback;
      interview.questions[questionIndex].rating = rating;

      const allAnswered = interview.questions.every((q) => q.answer);
      if (allAnswered) {
        interview.status = "completed";
      }

      await interview.save();
      res.json(interview);
    } catch (error) {
      console.error("Error submitting answer:", error);
      res.status(400).json({ message: "Error submitting answer" });
    }
  },
};

export default interviewController;
