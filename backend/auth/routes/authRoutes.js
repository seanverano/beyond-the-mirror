import express from "express";
import authController from "../controllers/authController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", auth, authController.getProfile);

export default router;
