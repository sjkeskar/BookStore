import express from "express";
const router = express.Router();
import {
	getUserInfo,
	logInUser,
	registerUser,
	updateUserInfo,
} from "../controller/usercontroller.js";
import {
	getAllAdd,
	getOneAdd,
	newAdd,
} from "../controller/addresscontroller.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getUserInfo).post(protect, updateUserInfo);
router.route("/register").post(registerUser);
router.route("/login").post(logInUser);
router.route("/add").get(protect, getAllAdd).post(protect, newAdd);
router.route("/add/:id").get(protect, getOneAdd);
export default router;
