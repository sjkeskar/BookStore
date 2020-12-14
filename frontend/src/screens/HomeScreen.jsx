import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { listBooks } from "../actions/bookActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Book from "../components/Book";

const HomeScreen = () => {
	const dispatch = useDispatch();
	const bookList = useSelector((state) => state.bookList);
	const { loading, error, books } = bookList;
	useEffect(() => {
		dispatch(listBooks());
	}, [dispatch]);
	return (
		<>
			<h1>Latest Books</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					{books.map((book) => (
						<Col sm={12} md={6} lg={4} xl={3} key={book.BookID}>
							<Book key={book.BookID} book={book} />
						</Col>
					))}
				</Row>
			)}
		</>
	);
};

export default HomeScreen;
