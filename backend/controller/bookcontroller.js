import asyncHandler from "express-async-handler";
import db from "../config/db.js";

//@desc     GET all books
//@route    GET /api/books
//@access   Public
export const getAllBooks = async (req, res) => {
	const sql = `SELECT * FROM books`;
	db.query(sql, (error, result) => {
		if (error) {
			res.status(404).send(error);
		} else {
			result = JSON.parse(JSON.stringify(result));
			res.status(200).send(result);
		}
	});
};

//@desc     Find the price of a book
//@route    Get /api/books/:id
//@access   Public
export const findBook = asyncHandler(async (req, res) => {
	const sql = `SELECT * FROM price,books WHERE price.BookID=? AND books.BookID=price.BookID`;
	db.query(sql, [req.params.id], (error, result) => {
		if (error) {
			res.status(404);
			throw new Error(error);
		} else {
			res.status(200);
			res.send(JSON.parse(JSON.stringify(result)));
		}
	});
});

//@desc     Find a book and it's specific price
//@route    Get /api/books/price/:id
//@access   Public
export const findPriceSpecified = asyncHandler(async (req, res) => {
	const sql = `SELECT * FROM price,books WHERE price.BookID=books.BookID AND PriceID=?`;
	db.query(sql, [req.params.id], (error, result) => {
		if (error) {
			res.status(404);
			throw new Error(error);
		} else {
			res.status(200);
			res.send(JSON.parse(JSON.stringify(result)));
		}
	});
});

//@desc     Delete a book
//@route    DELETE /api/books/admin
//@access   Admin
export const deleteBook = async (req, res) => {
	const sql = `DELETE from books WHERE BookID=?`;
	const { BookID } = req.body;
	db.query(sql, [BookID], (error, result) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.status(200).send(result);
		}
	});
};

//@desc     Delete an Edition of a particular book
//@route    DELETE /api/books/admin/price
//@access   Admin
export const deleteEdition = async (req, res) => {
	const sql = `DELETE from price WHERE PriceID=?`;
	db.query(sql, [req.body.PriceID], (error, result) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.status(200).send(result);
		}
	});
};

//@desc     Create a book
//@route    POST /api/books/admin
//@access   Admin
export const createBook = async (req, res) => {
	const sql = `INSERT into books VALUES(?,?,?,?,?,?)`;
	const sql1 = `SELECT Name from books WHERE BookID=?`;
	const { Name, Description, Author, Genre, Image } = req.body;
	let BookID = Math.floor(Math.random() * 1000000);
	let tryagain = false;
	do {
		db.query(sql1, [BookID], (error, result) => {
			if (!error) {
				BookID = Math.floor(Math.random() * 1000000);
				tryagain = true;
			} else {
				tryagain = false;
			}
		});
	} while (tryagain);
	db.query(
		sql,
		[BookID, Name, Description, Author, Genre, Image],
		(error, result) => {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send(result);
			}
		}
	);
};

//@desc     Create a new edition to already existing book
//@route    POST /api/books/admin/price
//@access   Admin
export const createEdition = async (req, res) => {
	const sql = `INSERT into price VALUES(?,?,?,?,?,?,?,?,?)`;
	const sql1 = `SELECT Type from price WHERE PriceID=?`;
	const {
		BookID,
		Price,
		Stock,
		Edition,
		Publisher,
		Type,
		PrintedDate,
		Discount,
	} = req.body;
	let PriceID = Math.floor(Math.random() * 1000000);
	let tryagain = false;
	do {
		db.query(sql1, [PriceID], (error, result) => {
			if (!error) {
				PriceID = Math.floor(Math.random() * 1000000);
				tryagain = true;
			} else {
				tryagain = false;
			}
		});
	} while (tryagain);
	db.query(
		sql,
		[
			PriceID,
			BookID,
			Price,
			Stock,
			Edition,
			Publisher,
			Type,
			PrintedDate,
			Discount,
		],
		(error, result) => {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200).send(result);
			}
		}
	);
};

//@desc     Find the price of a book
//@route    Get /api/books/admin/price
//@access   Admin
export const getEditions = async (req, res) => {
	const sql = `SELECT * FROM price,books WHERE price.BookID=? AND books.BookID=price.BookID`;
	db.query(sql, [req.body.BookID], (error, result) => {
		if (error) {
			res.status(404).send(error);
		} else {
			res.status(200);
			res.send(JSON.parse(JSON.stringify(result)));
		}
	});
};
