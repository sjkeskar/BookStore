import e from "express";
import asyncHandler from "express-async-handler";
import validator from "validator";
import db from "../config/db.js";

//@desc     Get all address corresponding to an user
//@route    GET /api/users/add
//@access   Private
export const getAllAdd = asyncHandler(async (req, res) => {
	const { UserID } = req.user;
	const sql = `SELECT * FROM address WHERE UserID=?;`;
	db.query(sql, [UserID], (error, result) => {
		if (error) {
			res.status(501).json({ message: "Error getting addresses" });
		} else {
			result = JSON.parse(JSON.stringify(result));
			res.status(200);
			res.json(result);
		}
	});
});

//@desc     Get one address corresponding to an user
//@route    GET /api/users/add/:id
//@access   Private
export const getOneAdd = asyncHandler(async (req, res) => {
	const { UserID } = req.user;
	const sql = `SELECT * FROM address WHERE UserID=? AND AddID=?;`;
	db.query(sql, [UserID, req.params.id], (error, result) => {
		if (error) {
			res.status(501).json({ message: "Error getting address" });
		} else {
			result = JSON.parse(JSON.stringify(result));
			res.status(200);
			res.json(result);
		}
	});
});

//@desc     Add an address to the database
//@route    POST /api/users/add
//@access   Private
export const newAdd = asyncHandler(async (req, res) => {
	const AddID = Math.floor(Math.random() * 1000);
	const { UserID } = req.user;
	const {
		Flatno,
		Building,
		Street,
		Landmark,
		Town,
		District,
		State,
		Country,
		PostalCode,
		Default,
	} = req.body;
	let check = true;
	if (!validator.isNumeric(String(Flatno))) {
		res.status(400).json({ message: "Enter valid Flat Number" });
		check = false;
	} else if (
		!validator.isAlphanumeric(Building) ||
		!validator.isAlphanumeric(Landmark) ||
		!validator.isAlphanumeric(Street)
	) {
		res.status(400).json({ message: "Enter valid alphabets and number only" });
		check = false;
	} else if (!validator.isPostalCode(PostalCode, "IN")) {
		res.status(400).json({ message: "Enter valid Postal Code" });
		check = false;
	} else if (
		!validator.isAlpha(Town) ||
		!validator.isAlpha(State) ||
		!validator.isAlpha(Country)
	) {
		res.status.json({ message: "Enter valid alphabets i given fields" });
		check = false;
	}
	const sql = `INSERT INTO address VALUES(?, ?, ?,?,?,?,?,?,?,?,?,?);`;
	if (check) {
		db.query(
			sql,
			[
				AddID,
				Flatno,
				Building,
				Street,
				Landmark,
				Town,
				District,
				State,
				Country,
				PostalCode,
				Default,
				UserID,
			],
			(error, result) => {
				if (error) {
					res.status(501).json({ message: "Error adding Address" });
				} else {
					result = JSON.parse(JSON.stringify(result));
					res.status(200);
					res.json(result);
				}
			}
		);
	}
});

//@desc     Update an address to the database
//@route    PUT /api/users/add
//@access   Private
export const updateAdd = asyncHandler(async (req, res) => {
	const {
		AddID,
		Flatno,
		Building,
		Street,
		Landmark,
		Town,
		District,
		State,
		Country,
		PostalCode,
		Default,
	} = req.body;
	const sql = `UPDATE address SET Flatno=?, Building=?, Street=?, Landmark=?, Town=?, District=?, State=?, Country=?, PostalCode=?, Default=? WHERE AddID=?;`;
	db.query(
		sql,
		[
			Flatno,
			Building,
			Street,
			Landmark,
			Town,
			District,
			State,
			Country,
			PostalCode,
			Default,
			AddID,
		],
		(error, result) => {
			if (error) {
				res.status(500).send(error);
			} else {
				res.status(200);
				res.send(result);
			}
		}
	);
});
