import express from "express";
import path from "path";
import dotenv from "dotenv";
import db from "./config/db.js";
import bookRoute from "./routes/bookRoute.js";
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import salesRoute from "./routes/salesRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();
app.use(express.json());

db.connect(() => console.log(`connected to DB`));

app.use("/api/books", bookRoute);
app.use("/api/users", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/sales", salesRoute);
app.use("/api/upload", uploadRoute);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
	});
} else {
	app.get("/", (req, res) => {
		res.send(`api is running....`);
	});
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || localhost;
app.listen(
	PORT,
	HOST,
	console.log(
		`Server running in ${process.env.NODE_ENV} on Port ${PORT} on HOST ${HOST}`
	)
);
