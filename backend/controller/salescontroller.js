import db from "../config/db.js";

//@desc     Get Sales
//@route    GET /api/admin
//@access   Private
export const getSales = (req, res) => {
	const { filter } = req.body;
	const sql1 = `SELECT * from ordertable`;
	const sql2 = `SELECT * from ordertable WHERE datepaid=?`;
	const sql3 = `SELECT * from ordertable WHERE datepaid>=? AND datepaid<=?`;
	if (filter === "all") {
		db.query(sql1, (error, result) => {
			if (error) {
				res.send(error);
			} else {
				res.send(result);
			}
		});
	} else if (filter === "date") {
		db.query(sql2, [req.body.date], (error, result) => {
			if (error) {
				res.send(error);
			} else {
				res.send(result);
			}
		});
	} else if (filter === "year") {
		db.query(
			sql3,
			[`${req.body.year}-01-01`, `${req.body.year}-12-31`],
			(error, result) => {
				if (error) {
					res.send(error);
				} else {
					res.send(result);
				}
			}
		);
	} else if (filter === "month") {
		db.query(
			sql3,
			[
				`${req.body.year}-${req.body.month}-01`,
				`${req.body.year}-${req.body.month}-31`,
			],
			(error, result) => {
				if (error) {
					res.send(error);
				} else {
					res.send(result);
				}
			}
		);
	}
};
