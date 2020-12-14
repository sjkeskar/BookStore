import db from "./config/db.js";
import mysql from "mysql";
import books from "./data/books.js";
import prices from "./data/price.js";
import fs from "fs";
import images from "./data/images.js";

db.connect(() => console.log(`connected to DB`));

const addBook = async () => {
	books.forEach((book) => {
		const sql = `INSERT INTO books VALUES( ${book.Bookid}, '${book.name}', '${book.desc}', '${book.author}', '${book.genre}' )`;
		db.query(sql, (error, result) => {
			if (error) {
				console.log(error);
			} else {
				console.log(`book added: ${result}`);
			}
		});
	});
};

const addPrice = async () => {
	prices.forEach((price) => {
		const sql = `INSERT INTO price VALUES( ${price.Priceid}, ${price.Bookid}, ${price.price}, ${price.stock}, '${price.edition}', '${price.publisher}', '${price.type}', TO_DATE('${price.printeddate}','DD-MM-YYYY'), ${price.discount})`;
		db.query(sql, (error, result) => {
			if (error) {
				console.log(error);
			} else {
				console.log(`Price added...`);
				console.log(result);
			}
		});
	});
};

const addImage = async () => {
	images.forEach((image) => {
		const qry = `INSERT INTO books (Image) VALUES('${fs.readFileSync(
			`C:\\${image.Bookid}.jpg`
		)}') WHERE BookID=${image.Bookid}`;
		db.query(qry, (error) => {
			if (error) {
				console.log(error);
			} else {
				console.log(`Success: ${image.Bookid}`);
			}
		});
	});
};

if (process.argv[2] === "-b") {
	addBook();
} else {
	addPrice();
}
