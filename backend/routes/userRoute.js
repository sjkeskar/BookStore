import express from "express";
const router = express.Router();
import {
	deleteUser,
	getAllUser,
	getUserInfo,
	getUserInfoAdmin,
	logInUser,
	registerUser,
	toggleAdmin,
	updateUser,
	updateUserInfo,
} from "../controller/usercontroller.js";
import {
	getAllAdd,
	getOneAdd,
	newAdd,
} from "../controller/addresscontroller.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getUserInfo).post(protect, updateUserInfo);
router.route("/register").post(registerUser);
router.route("/login").post(logInUser);
router.route("/add").get(protect, getAllAdd).post(protect, newAdd);
router.route("/add/:id").get(protect, getOneAdd);
router
	.route("/admin")
	.get(protect, getAllUser)
	.post(protect, admin, toggleAdmin)
	.put(protect, admin, updateUser);
router
	.route("/admin/del")
	.post(protect, admin, deleteUser)
	.put(protect, admin, getUserInfoAdmin);
export default router;
