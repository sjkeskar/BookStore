import mysql from "mysql";

const db = mysql.createConnection({
	host: "localhost",
	user: "SJK",
	password: "SJK@vit",
	database: "bookstore",
});

export default db;
