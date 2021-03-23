import e from "express";
import asyncHandler from "express-async-handler";
import validator from "validator";
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
			res.status(404).send(error);
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
			res.status(404).send(error);
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
			res.status(500).json({ message: "Error deleting book" });
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
			res.status(500).json({ message: "Error deleting Edition", error });
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
	let check = true;
	if (!validator.isAlphanumeric(Name)) {
		res.status(400).json({ message: "Enter correct Name" });
		check = false;
	} else if (!validator.isAlphanumeric(Author)) {
		res.status(400).json({ message: "Enter Author name in string" });
		check = false;
	} else if (
		!validator.isAlphanumeric(Description) ||
		!validator.isAlpha(Genre)
	) {
		res
			.status(400)
			.json({ message: "Enter correct values in Description and Genre" });
		check = false;
	}
	if (check) {
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
	}
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
	let check = true;
	if (
		!validator.isNumeric(BookID) ||
		!validator.isNumeric(Price) ||
		!validator.isNumeric(Stock) ||
		!validator.isNumeric(Discount)
	) {
		res
			.status(400)
			.json({ message: "Enter Numericals only for Price, Stock and Discount" });
		check = false;
	} else if (
		!validator.isAlphanumeric(Edition) ||
		!validator.isAlphanumeric(Publisher)
	) {
		res
			.status(400)
			.json({ message: "Enter Editio and Publisher in String only" });
		check = false;
	}
	if (check) {
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
	}
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

//@desc     Edit Book Info
//@route    PATCH /api/books/admin
//@access   Admin
export const editBook = async (req, res) => {
	const sql = `UPDATE books SET Name=?,Desciption=?,Author=?,Genre=? WHERE BookID=?`;
	const bsql = `SELECT * from books WHERE BookID=?`;
	db.query(bsql, [req.body.BookID], (error, result) => {
		if (error) {
			res.status(500).send(error);
		} else {
			result = JSON.parse(JSON.stringify(result))[0];
			const Name = req.body.Name ? req.body.Name : result.Name;
			const Desc = req.body.Description
				? req.body.Description
				: result.Desciption;
			const Author = req.body.Author ? req.body.Author : result.Author;
			const Genre = req.body.Genre ? req.body.Genre : result.Genre;
			db.query(
				sql,
				[Name, Desc, Author, Genre, req.body.BookID],
				(err, rest) => {
					if (err) {
						res.status(500).send(err);
					} else {
						res.status(200).send(rest);
					}
				}
			);
		}
	});
};

//@desc     Edit Edition Info
//@route    PATCH /api/books/admin/price
//@access   Admin
export const editEdition = async (req, res) => {
	const bsql = `SELECT * from price WHERE PriceID=?`;
	const sql = `UPDATE price SET Price=?,Stock=?,Edition=?,Publisher=?,Type=?,Discount=? WHERE PriceID=?`;
	db.query(bsql, [req.body.PriceID], (error, result) => {
		if (error) {
			console.log(`in bsql`);
			res.status(500).send(error);
		} else {
			result = JSON.parse(JSON.stringify(result))[0];
			const Price = req.body.Price ? req.body.Price : result.Price;
			const Stock = req.body.Stock ? req.body.Stock : result.Stock;
			const Edition = req.body.Edition ? req.body.Edition : result.Edition;
			const Publisher = req.body.Publisher
				? req.body.Publisher
				: result.Publisher;
			const Type = req.body.Type ? req.body.Type : result.Type;
			const Discount = req.body.Discount ? req.body.Discount : result.Discount;
			db.query(
				sql,
				[Price, Stock, Edition, Publisher, Type, Discount, req.body.PriceID],
				(err, rest) => {
					if (err) {
						console.log(`in sql`);
						res.status(500).send(err);
					} else {
						res.status(200).send(rest);
					}
				}
			);
		}
	});
};
