import express from "express";
import {
	addBooktoCart,
	delBooks,
	getBooks,
	updateBooks,
} from "../controller/cartcontroller.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router
	.route("/")
	.post(protect, addBooktoCart)
	.get(protect, getBooks)
	.put(protect, updateBooks);

router.route("/del").post(protect, delBooks);
export default router;
