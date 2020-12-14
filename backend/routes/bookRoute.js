import express from "express";
import {addBook, findPriceSpecified, getAllBooks, findBook} from "../controller/bookcontroller.js"
const router = express.Router();


router.route("/").get(getAllBooks).post(addBook);
router.route("/:id").get(findBook);
router.route("/price/:id").get(findPriceSpecified);

export default router;