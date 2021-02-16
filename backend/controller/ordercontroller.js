import asyncHandler from "express-async-handler";
import db from "../config/db.js";

//@desc     Get all orders
//@route    GET /api/order
//@access   Private
export const getOrders = asyncHandler((req, res) => {
	const { UserID } = req.user;
	const sql1 = `SELECT ordertable.*,user.FirstName,user.LastName FROM ordertable,user WHERE ordertable.UserID=? AND user.UserID=ordertable.UserID`;
	const sql2 = `SELECT orderinfo.Qty,price.Price,price.Edition,price.Type,books.Name,books.Author,books.Genre,books.Image FROM orderinfo,price,books WHERE orderinfo.PriceID=price.PriceID AND books.BookID=price.BookID AND orderinfo.OrderID=?`;
	db.query(sql1, [UserID], (error, result) => {
		if (error) {
			res.status(500).send(error);
		} else {
			result = JSON.parse(JSON.stringify(result));
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
	const {
		AddID,
		PaymentMethod,
		TotalPrice,
		TaxPrice,
		ShipPrice,
		placeDate,
	} = req.body;
	const { UserID } = req.user;
	const sql = `INSERT INTO ordertable(OrderID,UserID,AddID,payment,totalprice,taxprice,shipprice,dateplaced) VALUES(?,?,?,?,?,?,?,?);`;
	db.query(
		sql,
		[
			OrderID,
			UserID,
			AddID,
			PaymentMethod,
			TotalPrice,
			TaxPrice,
			ShipPrice,
			placeDate,
		],
		async (error, result) => {
			if (error) {
				res.status(501).send(error);
			} else {
				await infoexch(OrderID, UserID);
				res.status(200);
				res.json({ OrderID });
			}
		}
	);
});

//@desc     Function to delete cart item and add to orderinfo
export const infoexch = (OrderID, UserID) => {
	const sql = `SELECT * FROM cart WHERE UserID=?`;
	const sql2 = `INSERT INTO orderinfo VALUES(?,?,?,?)`;
	const sql3 = `DELETE FROM cart WHERE UserID=?`;
	const sql4 = `SELECT Stock from price WHERE price.PriceID=?`;
	const sql5 = `UPDATE price SET Stock=? WHERE PriceID=?`;
	let count = 0;
	db.query(sql, [UserID], (error, result) => {
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
				db.query(sql4, [res.PriceID], (err, rest) => {
					if (err) {
						console.log(`sql4 in exchange`);
						console.log(err);
					} else {
						rest = JSON.parse(JSON.stringify(rest))[0];
						let x = Number(rest.Stock) - Number(res.Qty);
						db.query(sql5, [x, res.PriceID], (er, rt) => {
							if (er) {
								console.log(`sql5 in exchange`);
								console.log(er);
							}
						});
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

export const getOneOrder = async (req, res) => {
	const { OrderID } = req.body;
	const sql = `SELECT ordertable.*,orderinfo.Qty,address.*,price.Price,price.Edition,price.Type,price.Publisher,books.Name,books.Author,books.Author,books.Image,user.FirstName,user.LastName,user.EmailID from ordertable,orderinfo,address,price,books,user WHERE ordertable.OrderID=? AND orderinfo.OrderID=? AND ordertable.AddID=address.AddID AND orderinfo.PriceID=price.PriceID AND books.BookID=price.BookID AND ordertable.UserID=user.UserID`;
	db.query(await sql, [OrderID, OrderID], (error, result) => {
		if (result.length == 0) {
			res.status(204).send("No order Availabe");
		} else {
			res.status(200).send(result);
		}
	});
};

export const getAllOrders = async (req, res) => {
	const sql = `SELECT ordertable.*,user.FirstName,user.LastName FROM ordertable,user WHERE ordertable.UserID=user.UserID`;
	db.query(sql, (error, result) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.status(200).send(result);
		}
	});
};

export const setDeliveredDate = async (req, res) => {
	const sql = `UPDATE ordertable SET datedelivered=? WHERE OrderID=?`;
	const { datedelivered, OrderID } = req.body;
	db.query(sql, [datedelivered, OrderID], (error, result) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.status(200).send(result);
		}
	});
};

export const setPaid = async (req, res) => {
	const sql = `UPDATE ordertable SET ispaid='true' WHERE OrderID=?`;
	db.query(sql, [req.body.OrderID], (error, result) => {
		if (error) {
			console.log(error);
			res.status(500).send(error);
		} else {
			console.log(result);
			res.status(400).send(result);
		}
	});
};
