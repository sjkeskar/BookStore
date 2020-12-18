import express from "express";
const router = express.Router();
import {
	getUserInfo,
	logInUser,
	registerUser,
} from "../controller/usercontroller.js";
import { getAllAdd, newAdd } from "../controller/addresscontroller.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getUserInfo);
router.route("/register").post(registerUser);
router.route("/login").post(logInUser);
router.route("/add").get(protect, getAllAdd).post(protect, newAdd);
export default router;
