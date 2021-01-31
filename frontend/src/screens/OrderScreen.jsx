// import React, { useEffect } from "react";
// import { Col, Row, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import Message from "../components/Message";
// import Loader from "../components/Loader";
// import { Link } from "react-router-dom";
// import { myOrder } from "../actions/orderAction";
// import Order from "../components/Order";

// const OrderScreen = () => {
// 	const dispatch = useDispatch();
// 	const getMyOrders = useSelector((state) => state.getMyOrders);
// 	const { loading, orders, error } = getMyOrders;
// 	useEffect(() => {
// 		dispatch(myOrder());
// 		if (orders.length > 0) {
// 			console.log(orders);
// 		}
// 	}, [dispatch, orders]);
// 	return (
// 		<>
// 			<h1>Your Orders</h1>
// 			<p> </p>
// 			<Link to={`/`}>
// 				<Button>Go Back</Button>
// 			</Link>
// 			{loading ? (
// 				<Loader />
// 			) : error ? (
// 				<Message variant="danger">{error}</Message>
// 			) : (
// 				<>
// 					<Row>
// 						{console.log(orders)}
// 						{orders.length > 1 &&
// 							orders.data.map((od) => (
// 								<Col key={od.OrderID} md={12} xs={12}>
// 									<Order order={od} key={od.OrderID} />
// 								</Col>
// 							))}
// 					</Row>
// 				</>
// 			)}
// 		</>
// 	);
// };

// export default OrderScreen;

import React, { useEffect } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { myOrder } from "../actions/orderAction";

const OrderScreen = ({ history }) => {
	const dispatch = useDispatch();

	const getMyOrders = useSelector((state) => state.getMyOrders);
	const { loading, orders, error } = getMyOrders;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (userInfo) {
			dispatch(myOrder());
		} else {
			history.push("/login");
		}
	}, [dispatch, history, userInfo]);

	return (
		<>
			<Row className="my-3">
				<Col md={5}>
					<Link className="btn btn-light" to="/">
						Go Back
					</Link>
				</Col>
				<Col md={7}>
					<h1>Orders</h1>
				</Col>
			</Row>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order.OrderID}>
								<td>{order.OrderID}</td>
								<td>{order.FirstName + " " + order.LastName}</td>
								<td>{order.dateplaced.substring(0, 10)}</td>
								<td>₹{order.totalprice}</td>
								<td>
									{order.ispaid === "true" ? (
										<i class="fas fa-check" style={{ color: "green" }}></i>
									) : (
										<i className="fas fa-times" style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									{order.datedelivered ? (
										order.datedelivered.substring(0, 10)
									) : (
										<i className="fas fa-times" style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/order/${order.OrderID}`}>
										<Button variant="light" className="btn-sm">
											Details
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default OrderScreen;
