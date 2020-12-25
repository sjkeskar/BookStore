import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import bookRoute from "./routes/bookRoute.js";
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();
app.use(express.json());
db.connect(() => console.log(`connected to DB`));

app.use("/api/books", bookRoute);
app.use("/api/users", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} on Port ${PORT}`)
);
