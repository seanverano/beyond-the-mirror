import Question from "../models/questionModel.js";

const questionController = {
  getQuestions: async (req, res) => {
    try {
      const questions = await Question.find({ userId: req.user.userId });
      res.json({ questions });
    } catch (error) {
      res.status(500).json({ message: "Error fetching questions" });
    }
  },

  createQuestion: async (req, res) => {
    try {
      const question = new Question({
        text: req.body.text,
        userId: req.user.userId,
      });
      await question.save();
      res.status(201).json({ question });
    } catch (error) {
      res.status(400).json({ message: "Error creating question" });
    }
  },

  updateQuestion: async (req, res) => {
    try {
      const question = await Question.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.userId },
        { text: req.body.text },
        { new: true }
      );

      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      res.json({ question });
    } catch (error) {
      res.status(400).json({ message: "Error updating question" });
    }
  },

  deleteQuestion: async (req, res) => {
    try {
      const question = await Question.findOne({
        _id: req.params.id,
        userId: req.user.userId,
      });

      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      await question.deleteOne();
      res.json({ message: "Question deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting question" });
    }
  },
};

export default questionController;
