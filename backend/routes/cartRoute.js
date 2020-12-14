import express from "express";
import { addBooktoCart } from "../controller/cartcontroller.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(protect, addBooktoCart)

export default router;