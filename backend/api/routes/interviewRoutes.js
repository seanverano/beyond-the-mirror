import express from "express";
import interviewController from "../controllers/interviewController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, interviewController.createInterview);
router.get("/", auth, interviewController.getInterviews);
router.get("/:id", auth, interviewController.getInterviewById);
router.post("/:id/answer", auth, interviewController.submitAnswer);
router.delete("/:id", auth, interviewController.deleteInterview);

export default router;
