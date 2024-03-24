import express from "express";
import { loginUser } from "../controllers/loginController.mjs";

const router = express.Router();

// Handle POST requests to the /api/login endpoint
router.route("/").post(loginUser);

export default router;
