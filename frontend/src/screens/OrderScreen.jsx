import React, { useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { myOrder } from "../actions/orderAction";
import Order from "../components/Order";

const OrderScreen = () => {
	const dispatch = useDispatch();
	const getMyOrders = useSelector((state) => state.getMyOrders);
	const { loading, orders, error } = getMyOrders;
	useEffect(() => {
		dispatch(myOrder());
		if (orders.length > 0) {
			console.log(orders);
		}
	}, [dispatch, orders]);
	return (
		<>
			<h1>Your Orders</h1>
			<p> </p>
			<Link to={`/`}>
				<Button>Go Back</Button>
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						{console.log(orders)}
						{orders.length > 1 &&
							orders.data.map((od) => (
								<Col key={od.OrderID} md={12} xs={12}>
									<Order order={od} key={od.OrderID} />
								</Col>
							))}
					</Row>
				</>
			)}
		</>
	);
};

export default OrderScreen;
