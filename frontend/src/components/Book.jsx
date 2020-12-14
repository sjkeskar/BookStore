import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ book }) => {
	return (
		<Card className="my-3 p-3 rounded">
			<Link to={`/book/${book.BookID}`}>
				<Card.Img src={book.Image} variant="top" />
			</Link>
			<Card.Body>
				<Link to={`/book/${book.BookID}`}>
					<Card.Title as="div">
						{" "}
						<strong>{book.Name}</strong>{" "}
                        <strong>by {book.Author}</strong>
					</Card.Title>
				</Link>
			</Card.Body>
		</Card>
	);
};

export default Product;
