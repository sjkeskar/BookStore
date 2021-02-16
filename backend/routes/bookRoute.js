import express from "express";
import {
	findPriceSpecified,
	getAllBooks,
	findBook,
	createBook,
	createEdition,
	getEditions,
	deleteBook,
	deleteEdition,
	editBook,
	editEdition,
} from "../controller/bookcontroller.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getAllBooks);
router.route("/:id").get(findBook);
router.route("/price/:id").get(findPriceSpecified);
router
	.route("/admin")
	.post(protect, admin, createBook)
	.put(protect, admin, deleteBook)
	.patch(protect, admin, editBook);
router
	.route("/admin/price")
	.get(protect, admin, getEditions)
	.post(protect, admin, createEdition)
	.put(protect, admin, deleteEdition)
	.patch(protect, admin, editEdition);

export default router;
