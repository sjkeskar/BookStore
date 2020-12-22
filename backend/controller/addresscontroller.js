import asyncHandler from "express-async-handler";
import db from "../config/db.js";

//@desc     Get all address corresponding to an user
//@route    GET /api/users/add
//@access   Private
export const getAllAdd = asyncHandler(async (req, res) => {
	const { UserID } = req.user;
	const sql = `SELECT * FROM address WHERE UserID=${UserID};`;
	db.query(sql, (error, result) => {
		if (error) {
			res.status(501);
			throw new Error(error);
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
	const sql = `SELECT * FROM address WHERE UserID=${UserID} AND AddID=${req.params.id};`;
	db.query(sql, (error, result) => {
		if (error) {
			res.status(501);
			throw new Error(error);
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
	const sql = `INSERT INTO address VALUES(${AddID}, ${Flatno}, '${Building}','${Street}','${Landmark}','${Town}','${District}','${State}','${Country}',${PostalCode},'${Default}',${UserID});`;
	db.query(sql, (error, result) => {
		if (error) {
			res.status(501);
			throw new Error(error);
		} else {
			result = JSON.parse(JSON.stringify(result));
			res.status(200);
			res.json(result);
		}
	});
});
