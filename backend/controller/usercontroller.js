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
	const sql = `SELECT * FROM user WHERE EmailID=? OR PhoneNo=?`;
	const salt = await bcrypt.genSalt(10);
	const Pass = await bcrypt.hash(Password, salt);
	const sql1 = `INSERT INTO user VALUES(?, ?, ?, ?, ?, ?, 'false')`;
	db.query(sql, [EmailID, PhoneNo], (error, result) => {
		if (result && result.EmailID === EmailID) {
			res.status(400).send("User already Exists");
		} else if (error) {
			res.status(500).send(error);
		} else {
			db.query(
				sql1,
				[UserID, FirstName, LastName, EmailID, PhoneNo, Pass],
				(er, rest) => {
					if (er) {
						res.status(400).send(er);
					} else {
						db.query(sql, [EmailID, PhoneNo], (error1, result2) => {
							if (error1) {
								res.status(500).send(error1);
							} else {
								result2 = JSON.parse(JSON.stringify(result2));
								res.status(201);
								res.json({
									UserID: result2[0].UserID,
									FirstName: result2[0].FirstName,
									LastName: result2[0].LastName,
									PhoneNo: result2[0].PhoneNo,
									isAdmin: result2[0].isAdmin,
									token: generateToken(result2[0].UserID),
								});
							}
						});
					}
				}
			);
		}
	});
});

//@desc     Auth user & get token
//@route    POST /api/users/login
//@access   Public
export const logInUser = asyncHandler(async (req, res) => {
	const { EmailID, Password } = req.body;
	const sql = `SELECT * FROM user WHERE EmailID=?;`;
	db.query(sql, [EmailID], async (error, result) => {
		if (error) {
			res.status(500).send(error);
		} else {
			result = JSON.parse(JSON.stringify(result))[0];
			if (result) {
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
					res.status(401).send("Password Invalid");
				}
			}
		}
	});
});

//@desc 	Get User Info	Get User Info
//@route	GET /api/users	GET /api/users/admin/del
//@access	private			Admin
export const getUserInfo = asyncHandler(async (req, res) => {
	const { UserID } = req.user;
	const sql = `SELECT UserID,FirstName,LastName,EmailID,PhoneNo FROM user WHERE UserID=?;`;
	db.query(
		sql,
		[UserID],
		asyncHandler(async (error, result) => {
			if (error) {
				res.status(501).send(error);
			} else {
				result = JSON.parse(JSON.stringify(result));
				res.status(200);
				res.json(result);
			}
		})
	);
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
	const sql = `UPDATE user SET FirstName=?,LastName=?,PhoneNo=?,EmailID=?,Password=? WHERE UserID=?`;
	db.query(
		sql,
		[FirstName, LastName, PhoneNo, EmailID, Password, UserID],
		asyncHandler(async (error, result) => {
			if (error) {
				res.status(501).send(error);
			} else {
				res.status(200);
				res.json(result);
			}
		})
	);
});

//@desc 	Get all user info
//@route	GET /api/users/admin
//@access	Admin
export const getAllUser = async (req, res) => {
	const sql = `SELECT FirstName,LastName,EmailID,PhoneNo,UserID,isAdmin from user`;
	db.query(sql, (error, result) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.status(200).send(result);
		}
	});
};

//@desc 	Change Admin privilege
//@route	POST /api/users/admin
//@access	Admin
export const toggleAdmin = async (req, res) => {
	const { UserID, isAdmin } = req.body;
	const sql = `UPDATE user SET isAdmin=? WHERE UserID=?`;
	db.query(sql, [isAdmin, UserID], (error, result) => {
		if (error) {
			console.log(error);
			res.status(500).send(error);
		} else {
			res.status(200).send(result);
		}
	});
};

//@desc 	Delete Account
//@route	DELETE /api/users/admin
//@access	Admin
export const deleteUser = async (req, res) => {
	const { UserID } = req.body;
	console.log(req.body);
	const sql = `DELETE from user WHERE UserID=?`;
	db.query(sql, [UserID], (error, result) => {
		if (error) {
			console.log(error);
			res.status(500).send(error);
		} else {
			console.log(result);
			res.status(200).send(result);
		}
	});
};

//@desc 	Get User Info
//@route	GET /api/users/admin/del
//@access	Admin
export const getUserInfoAdmin = asyncHandler(async (req, res) => {
	const { UserID } = req.body;
	const sql = `SELECT UserID,FirstName,LastName,EmailID,PhoneNo FROM user WHERE UserID=?;`;
	db.query(
		sql,
		[UserID],
		asyncHandler(async (error, result) => {
			if (error) {
				console.log(`usercontroller error`);
				res.status(501).send(error);
			} else {
				console.log(result);
				result = JSON.parse(JSON.stringify(result));
				res.status(200);
				res.json(result);
			}
		})
	);
});

//@desc 	Update Account Details
//@route	PUT /api/users/admin
//@access	Admin
export const updateUser = async (req, res) => {
	const { UserID } = req.body;
	const sql = `SELECT FirstName,LastName,EmailID,PhoneNo,Password,isAdmin from user WHERE UserID=?`;
	const sql2 = `UPDATE user SET FirstName=?,LastName=?,PhoneNo=?,EmailID=?,Password=? WHERE UserID=?`;
	db.query(sql, [UserID], async (error, result) => {
		if (error) {
			res.status(500).send(error);
		} else {
			result = JSON.parse(JSON.stringify(result))[0];
			const FirstName = req.body.FirstName
				? req.body.FirstName
				: result.FirstName;
			const LastName = req.body.LastName ? req.body.LastName : result.LastName;
			const PhoneNo = req.body.PhoneNo ? req.body.PhoneNo : result.PhoneNo;
			const EmailID = req.body.EmailID ? req.body.EmailID : result.EmailID;
			let Password;
			if (req.body.Password) {
				const salt = await bcrypt.genSalt(10);
				Password = await bcrypt.hash(req.body.Password, salt);
			} else {
				Password = result.Password;
			}
			db.query(
				sql2,
				[FirstName, LastName, PhoneNo, EmailID, Password, UserID],
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
