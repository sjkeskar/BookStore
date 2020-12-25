import asyncHandler from "express-async-handler";
import db from "../config/db.js";

//@desc     Get all orders
//@route    GET /api/order
//@access   Private
export const getOrders = asyncHandler((req, res) => {
	const { UserID } = req.user;
	const sql1 = `SELECT * FROM ordertable WHERE UserID=?`;
	const sql2 = `SELECT orderinfo.Qty,price.Price,price.Edition,price.Type,books.Name,books.Author,books.Genre,books.Image FROM orderinfo,price,books WHERE orderinfo.PriceID=price.PriceID AND books.BookID=price.BookID AND orderinfo.OrderID=?`;
	db.query(sql1, [UserID], (error, result) => {
		if (error) {
			res.status(500);
			throw new Error(error);
		} else {
			result = JSON.parse(JSON.stringify(result));
			result.forEach((re, index) => {
				db.query(sql2, [re.OrderID], (err, rest) => {
					if (err) {
						res.status(500);
						throw new Error(error);
					} else {
						rest = JSON.parse(JSON.stringify(rest));
						re.books = rest;
						if (index === result.length - 1) {
							res.status(200);
							res.send(result);
						}
					}
				});
			});
		}
	});
});

//@desc     Add an order
//@route    POST /api/order
//@access   Private
export const addOrder = asyncHandler(async (req, res) => {
	const OrderID = Math.floor(Math.random() * 1000);
	const {
		AddID,
		PaymentMethod,
		TotalPrice,
		TaxPrice,
		ShipPrice,
		placeDate,
	} = req.body;
	const { UserID } = req.user;
	const sql = `INSERT INTO ordertable(OrderID,UserID,AddID,payment,totalprice,taxprice,shipprice,dateplaced) VALUES(${OrderID},${UserID},${AddID},'${PaymentMethod}',${TotalPrice},${TaxPrice},${ShipPrice},${placeDate});`;
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
