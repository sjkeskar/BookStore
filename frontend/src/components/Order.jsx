import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const Order = ({ order }) => {
	return (
		<Card>
			<LinkContainer to={`/order/${order.OrderID}`}>
				<Card.Header>Order placed On: {order.dateplaced}</Card.Header>
				{/* <Card.Title>{order.books.map((ele) => ele.Name)}</Card.Title> */}
				<Link to={`/order/${order.OrderID}`}>
					<Button>See Complete Order Details</Button>
				</Link>
				<Card.Footer>
					<p>
						Paid:{" "}
						{order.ispaid
							? `Order is Paid using: ${order.payment}`
							: `Not Paid`}
					</p>
					<p>
						Delivered:{" "}
						{order.datedelivered
							? order.datedelivered
							: `Order not yet Delivered`}
					</p>
				</Card.Footer>
			</LinkContainer>
		</Card>
	);
};

export default Order;
