import asyncHandler from "express-async-handler";
import db from "../config/db.js";

//@desc     Get all orders
//@route    GET /api/order
//@access   Private
export const getOrders = asyncHandler(async (req, res) => {
	const { UserID } = req.user;

	const sql = `SELECT * FROM ordertable,orderinfo WHERE ordertable.OrderID=orderinfo.OrderID AND ordertable.UserID=${UserID}`;
	db.query(sql, (error, result) => {
		if (error) {
			res.status(500);
			throw new Error(error);
		} else {
			res.status(200);
			res.send(result);
		}
	});
});

//@desc     Add an order
//@route    POST /api/order
//@access   Private
export const addOrder = asyncHandler(async (req, res) => {
	const OrderID = Math.floor(Math.random() * 1000);
	const { AddID, PaymentMethod, TotalPrice, TaxPrice, ShipPrice } = req.body;
	const { UserID } = req.user;
	const sql = `INSERT INTO ordertable(OrderID,UserID,AddID,payment,totalprice,taxprice,shipprice) VALUES(${OrderID},${UserID},${AddID},'${PaymentMethod}',${TotalPrice},${TaxPrice},${ShipPrice});`;
	db.query(sql, async (error, result) => {
		if (error) {
			res.status(501);
			throw new Error(error);
		} else {
			await infoexch(OrderID, UserID);
			res.status(200);
			res.json({ OrderID });
		}
	});
});

//@desc     Function to delete cart item and add to orderinfo
export const infoexch = (OrderID, UserID) => {
	const sql = `SELECT * FROM cart WHERE UserID=?`;
	const sql2 = `INSERT INTO orderinfo VALUES(?,?,?,?)`;
	const sql3 = `DELETE FROM cart WHERE UserID=?`;
	let count = 0;
	db.query(sql, [UserID], (error, result) => {
		console.log("here");
		if (error) {
			console.log(error);
		} else {
			result.forEach((res) => {
				const InfoID = Math.floor(Math.random() * 1000);
				db.query(sql2, [InfoID, OrderID, res.PriceID, res.Qty], (err, rest) => {
					if (err) {
						console.log(err);
					} else {
						console.log(`order info updated`);
						count++;
					}
				});
			});
			db.query(sql3, [UserID], (err, rest) => {
				if (err) {
					console.log(err);
				}
			});
		}
	});
};
