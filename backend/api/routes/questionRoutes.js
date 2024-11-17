import express from "express";
import questionController from "../controllers/questionController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth, questionController.getQuestions);
router.post("/", auth, questionController.createQuestion);
router.patch("/:id", auth, questionController.updateQuestion);
router.delete("/:id", auth, questionController.deleteQuestion);

export default router;
