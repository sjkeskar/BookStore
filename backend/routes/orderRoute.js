import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
	addOrder,
	getOrders,
	infoexch,
} from "../controller/ordercontroller.js";

router.route("/").post(protect, addOrder).get(protect, getOrders);

export default router;
