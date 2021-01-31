import express from "express";
const router = express.Router();
import { admin, protect } from "../middleware/authMiddleware.js";
import {
	addOrder,
	getAllOrders,
	getOneOrder,
	getOrders,
	setDeliveredDate,
	setPaid,
} from "../controller/ordercontroller.js";

router.route("/").post(protect, getOneOrder).get(protect, getOrders);
router.route("/add").post(protect, addOrder);
router
	.route("/admin")
	.get(protect, admin, getAllOrders)
	.post(protect, admin, setDeliveredDate)
	.put(protect, admin, setPaid);

export default router;
