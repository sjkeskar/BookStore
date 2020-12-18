import asyncHandler from "express-async-handler";
import db from "../config/db.js";

//@desc     Add to Cart
//@route    POST /api/cart/
//@access   Private
export const addBooktoCart = asyncHandler(async (req, res) => {
	const { UserID, PriceID, Qty } = req.body;
	const CartID = Math.floor(Math.random() * 1000);
	const sql = `INSERT INTO cart VALUES(${CartID},${PriceID},${Qty},${UserID})`;
	db.query(sql, (error, result) => {
		if (error) {
			res.status(401);
			throw new Error("Could not add to Cart");
		} else if (result) {
			res.status(201).send(result);
		}
	});
});

//@desc     Get cart items
//@route    GET /api/cart/
//@access   Private
export const getBooks = asyncHandler(async (req, res) => {
	const { UserID } = req.user;
	const sql = `SELECT * FROM cart,price,books WHERE cart.UserID=${UserID} AND cart.PriceID=price.PriceID AND price.BookID=books.BookID`;
	db.query(sql, (error, result) => {
		if (error) {
			res.status(401);
			throw new Error(error);
		} else if (result) {
			res.status(201).send(result);
		}
	});
});

//@desc     Delete a Cart Item
//@route    DELETE /api/cart/
//@access   Private
export const delBooks = asyncHandler(async (req, res) => {
	const { UserID } = req.user;
	const { CartID } = req.body;
	const sql = `DELETE FROM cart WHERE CartID=${CartID} AND UserID=${UserID}`;
	db.query(sql, (error, result) => {
		if (error) {
			res.status(401);
			throw new Error(error);
		} else if (result) {
			res.status(201).send(result);
		}
	});
});

//@desc     Update quantity of an item
//@route    PUT /api/cart/
//@access   Private
export const updateBooks = asyncHandler(async (req, res) => {
	const { Qty, CartID } = req.body;
	const sql = `UPDATE cart SET Qty=${Qty} WHERE CartID=${CartID}`;
	db.query(sql, (error, result) => {
		if (error) {
			res.status(401);
			throw new Error(error);
		} else if (result) {
			res.status(201).send(result);
		}
	});
});
