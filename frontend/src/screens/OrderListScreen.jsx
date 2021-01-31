import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { allOrders } from "../actions/orderAction";

const OrderListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const getAllOrder = useSelector((state) => state.getAllOrder);
	const { loading, error, orders } = getAllOrder;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin === "true") {
			dispatch(allOrders());
		} else {
			history.push("/login");
		}
	}, [dispatch, history, userInfo]);

	if (orders) {
		console.log(orders);
	}
	return (
		<>
			<h1>Orders</h1>
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
								<td>{`${order.FirstName} ${order.LastName}`}</td>
								<td>{order.dateplaced}</td>
								<td>₹{order.totalprice}</td>
								<td>
									{order.ispaid === "true" ? (
										<i className="fas fa-check" style={{ color: "green" }}></i>
									) : (
										<i className="fas fa-times" style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									{order.datedelivered ? (
										order.datedelivered
									) : (
										<i className="fas fa-times" style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/order/${order.OrderID}?ol`}>
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

export default OrderListScreen;
