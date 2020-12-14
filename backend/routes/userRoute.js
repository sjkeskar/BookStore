import express from "express";
const router = express.Router();
import { logInUser, registerUser } from "../controller/usercontroller.js";

router.route("/register").post(registerUser);
router.route("/login").post(logInUser);
export default router;