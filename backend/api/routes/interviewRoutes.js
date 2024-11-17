import express from "express";
import auth from "../middlewares/auth.js";
import interviewController from "../controllers/interviewController.js";

const router = express.Router();

router.post("/", auth, interviewController.createInterview);
router.get("/:id", auth, interviewController.getInterview);
router.post("/:id/answer", auth, interviewController.submitAnswer);

export default router;
