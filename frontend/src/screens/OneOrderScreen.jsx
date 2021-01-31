import React, { useEffect, useState } from "react";
import { Button, Card, Col, ListGroup, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { OneOrder, payOrder, setDelivered } from "../actions/orderAction";
import { RESET_ONE_ORDER } from "../constants/orderConstants";
// import {
// 	ORDER_PAY_RESET,
// 	ORDER_DELIVER_RESET,
// } from "../constants/orderConstants";

const OrderScreen = ({ match, history, location }) => {
	const orderId = match.params.id;

	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [datedelivered, setDateDelivered] = useState("");
	const [payment, setPayment] = useState("");
	const [ispaid, setispaid] = useState("");
	const [totalprice, settotalprice] = useState(0);
	const [taxprice, settaxprice] = useState(0);
	const [shipprice, setshipprice] = useState(0);
	const [OrderID, setOrderID] = useState(0);

	const dispatch = useDispatch();

	const getOneOrder = useSelector((state) => state.getOneOrder);
	const { order, loading, error } = getOneOrder;

	const orderDeliver = useSelector((state) => state.orderDeliver);
	const {
		loading: loadingDeliver,
		success,
		error: errorDeliver,
	} = orderDeliver;

	const orderPay = useSelector((state) => state.orderPay);
	const {
		loading: loadingPay,
		success: successPay,
		error: errorPay,
	} = orderPay;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (order === undefined || order.length === 0 || successPay || success) {
			dispatch(OneOrder(orderId));
		}
	}, [orderId, order, dispatch, OrderID, successPay, success]);
	if (order) {
		order.forEach((item) => {
			if (address === "") {
				setAddress(
					`${item.Flatno},${item.Building},${item.Strret},${item.Landmark},${item.Town},${item.State},${item.Country}`
				);
				setEmail(item.EmailID);
				setName(`${item.FirstName} ${item.LastName}`);
				setDateDelivered(item.datedelivered);
				setPayment(item.payment);
				setispaid(item.ispaid);
				settaxprice(item.taxprice);
				settotalprice(item.totalprice);
				setshipprice(item.shipprice);
				setOrderID(item.OrderID);
			}
		});
	}

	const successPaymentHandler = () => {
		dispatch(payOrder(OrderID));
		console.log("Paid");
	};

	const deliverHandler = () => {
		const x = new Date();
		const datedelivered = x.toISOString().slice(0, 10);
		dispatch(setDelivered(OrderID, datedelivered));
	};

	const back = () => {
		if (location.search) {
			history.push("/admin/orderlist");
			setAddress("");
		} else {
			history.push("/order");
			setAddress("");
		}
	};

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
			{errorDeliver && <Message variant="danger">{errorDeliver}</Message>}
			{errorPay && <Message variant="danger">{errorPay}</Message>}
			{success && (
				<Message variant="success">{`The Order has been marked Delivered`}</Message>
			)}
			{successPay && (
				<Message variant="success">{`The Order has been marked Paid`}</Message>
			)}
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<Button type="submit" onClick={back}>
								Go Back
							</Button>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Name: </strong> {name}
							</p>
							<p>
								<strong>Email ID: </strong>
								<a href={`mailto:${email}`}>{email}</a>
							</p>
							<p>
								<strong>Address:</strong> {address}.
							</p>
							{datedelivered ? (
								<Message variant="success">
									Delivered On {datedelivered}
								</Message>
							) : (
								<Message variant="danger">Not Delivered</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{payment}
							</p>
							{ispaid === "true" ? (
								<Message variant="success">Paid </Message>
							) : (
								<Message variant="danger">Not Paid</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{order.length === 0 ? (
								<Message>
									Looks like there is some error, please try after some time.
								</Message>
							) : (
								<ListGroup variant="flush">
									{order.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.Image}
														alt={item.Name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.PriceID}`}>
														{item.Name}
													</Link>
												</Col>
												<Col>{item.Type}</Col>
												<Col md={4}>
													{item.Qty} x {item.Price} = {item.Qty * item.Price}₹
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
						<ListGroup.Item></ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>₹{totalprice - (taxprice + shipprice)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>₹{shipprice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>₹{taxprice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>₹{totalprice}</Col>
								</Row>
							</ListGroup.Item>
							{ispaid === "false" && (
								<ListGroup.Item>
									<Button
										type="button"
										variant="primary"
										className="btn btn-block"
										onClick={successPaymentHandler}
									>
										Mark as Paid
									</Button>
								</ListGroup.Item>
							)}
							{userInfo && userInfo.isAdmin === "true" && ispaid === "true" && (
								<ListGroup.Item>
									<Button
										type="button"
										className="btn btn-block"
										onClick={deliverHandler}
									>
										Mark As Delivered
									</Button>
								</ListGroup.Item>
							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
