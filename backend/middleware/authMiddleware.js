import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import db from "../config/db.js";

const protect = asyncHandler(async (req, res, next) => {
	let token = req.headers.authorization;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_TOKEN);
			const sql = `SELECT UserID,FirstName,LastName,EmailID,PhoneNo,isAdmin FROM user WHERE UserID='${decoded.id}'`;
			db.query(sql, (error, result) => {
				if (error) {
					res.status(401);
					throw new Error("Please Re-login and try again.");
				} else if (result) {
					result = JSON.parse(JSON.stringify(result))[0];
					if (result.UserID === decoded.id) {
						req.user = result;
						next();
					} else {
						console.log("Multiple accounts login detected");
						res.status(401);
						throw new Error("Not Authorized, token failed");
					}
				}
			});
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error("Not Authorized, token failed");
		}
	}
	if (!token) {
		res.status(401);
		throw new Error("Not Authorized to access the page");
	}
});

const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin === "true") {
		next();
	} else {
		res.status(401).send("Not Authorised as an Admin.");
	}
};

export { protect, admin };
