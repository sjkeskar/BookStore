import express from "express";
import { getSales } from "../controller/salescontroller.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/admin").get(protect, admin, getSales);

export default router;
