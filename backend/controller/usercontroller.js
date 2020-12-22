import asyncHandler from "express-async-handler";
import generateToken from "../config/generateToken.js";
import db from "../config/db.js";
import bcrypt from "bcryptjs";
import matchPassword from "../config/matchPassword.js";

//@desc     Register new user
//@route    POST /api/users/register
//@access   Public
export const registerUser = asyncHandler(async (req, res) => {
	const UserID = Math.floor(Math.random() * 1000);
	const { FirstName, LastName, EmailID, PhoneNo, Password } = req.body;
	const sql = `SELECT * FROM user WHERE EmailID='${EmailID}' OR PhoneNo='${PhoneNo}'`;
	const salt = await bcrypt.genSalt(10);
	const Pass = await bcrypt.hash(Password, salt);
	const sql1 = `INSERT INTO user VALUES(${UserID}, '${FirstName}', '${LastName}', '${EmailID}', '${PhoneNo}', '${Pass}', 'false')`;
	db.query(sql, (error, result) => {
		if (result.length > 0) {
			res.status(400);
			throw new Error("User already Exists");
		} else if (error) {
			res.status(500);
			throw new Error(error);
		} else {
			db.query(sql1, (er, rest) => {
				if (er) {
					res.status(400);
					throw new Error(er);
				} else {
					res.status(201);
					res.json(rest);
				}
			});
		}
	});
});

//@desc     Auth user & get token
//@route    POST /api/users/login
//@access   Public
export const logInUser = asyncHandler(async (req, res) => {
	const { EmailID, Password } = req.body;
	const sql = `SELECT * FROM user WHERE EmailID='${EmailID}';`;
	db.query(sql, async (error, result) => {
		if (error) {
			res.status(500);
			throw new Error(error);
		} else {
			result = JSON.parse(JSON.stringify(result))[0];
			if (await matchPassword(Password, result.Password)) {
				res.json({
					UserID: result.UserID,
					FirstName: result.FirstName,
					LastName: result.LastName,
					PhoneNo: result.PhoneNo,
					isAdmin: result.isAdmin,
					token: generateToken(result.UserID),
				});
			} else {
				res.status(401);
				throw new Error("Invalid Email or Password");
			}
		}
	});
});

//@desc 	Get User Info
//@route	GET /api/users
//@access	private
export const getUserInfo = asyncHandler(async (req, res) => {
	const { UserID } = req.user;
	const sql = `SELECT UserID,FirstName,LastName,EmailID,PhoneNo FROM user WHERE UserID=${UserID};`;
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

//@desc 	Update User Info
//@route	POST /api/users
//@access	private
export const updateUserInfo = asyncHandler(async (req, res) => {
	const { UserID } = req.user;
	const FirstName = req.body.FirstName
		? req.body.FirstName
		: req.user.FirstName;
	const LastName = req.body.LastName ? req.body.LastName : req.user.LastName;
	const PhoneNo = req.body.PhoneNo ? req.body.PhoneNo : req.user.PhoneNo;
	const EmailID = req.body.EmailID ? req.body.EmailID : req.user.EmailID;
	let Password;
	if (req.body.Password) {
		const salt = await bcrypt.genSalt(10);
		Password = await bcrypt.hash(req.body.Password, salt);
	} else {
		Password = req.user.Password;
	}
	const sql = `UPDATE user SET FirstName='${FirstName}',LastName='${LastName}',PhoneNo='${PhoneNo}',EmailID='${EmailID}',Password='${Password}' WHERE UserID=${UserID}`;
	db.query(sql, (error, result) => {
		if (error) {
			res.status(501);
			throw new Error(error);
		} else {
			res.status(200);
			res.json(result);
		}
	});
});
