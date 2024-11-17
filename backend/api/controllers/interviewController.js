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

      if (!answer || questionIndex === undefined) {
        return res.status(400).json({
          message: "Missing required fields: answer and questionIndex",
        });
      }

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

      const prompt = `
        You are an expert interviewer evaluating responses. Analyze this response:

        Question: ${interview.questions[questionIndex].text}
        Answer: ${answer}

        Provide a JSON response with exactly this structure, no markdown or code blocks:
        {
          "rating": <number between 1-5>,
          "feedback": "<concise feedback>",
        }
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      const cleanedResponse = responseText
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "")
        .replace(/`/g, "")
        .trim();

      let evaluation;
      try {
        evaluation = JSON.parse(cleanedResponse);
      } catch (parseError) {
        console.error("Failed to parse Gemini response:", cleanedResponse);
        throw new Error("Invalid response format from AI model");
      }

      if (!evaluation.rating || !evaluation.feedback) {
        throw new Error("Incomplete evaluation from AI model");
      }

      evaluation.rating = Math.max(1, Math.min(5, Number(evaluation.rating)));

      interview.questions[questionIndex].answer = answer;
      interview.questions[questionIndex].rating = evaluation.rating;
      interview.questions[questionIndex].feedback = evaluation.feedback;

      if (questionIndex === interview.questions.length - 1) {
        interview.status = "completed";
      } else {
        interview.status = "in-progress";
      }

      await interview.save();
      res.json(interview);
    } catch (error) {
      console.error("Submit answer error:", error);
      res.status(500).json({
        message: "Error submitting answer",
        error: error.message,
      });
    }
  },
};

export default interviewController;
