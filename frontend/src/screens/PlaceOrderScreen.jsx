import React, { useEffect } from "react";
import { Button, Card, Col, ListGroup, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { createOrder } from "../actions/orderAction";

const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch();
	const { loading, cartItems, error } = useSelector(
		(state) => state.getCartBooks
	);
	const userInfo = JSON.parse(localStorage.getItem("userInfo"));
	const address = JSON.parse(localStorage.getItem("Address"));
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};
	cartItems.itemsPrice = addDecimals(
		cartItems.reduce((acc, item) => acc + item.Price * item.Qty, 0)
	);
	cartItems.shippingPrice = addDecimals(cartItems.itemsPrice > 100 ? 0 : 10);
	cartItems.taxPrice = addDecimals(
		Number((0.15 * cartItems.itemsPrice).toFixed(2))
	);
	cartItems.totalPrice = (
		Number(cartItems.itemsPrice) +
		Number(cartItems.shippingPrice) +
		Number(cartItems.taxPrice)
	).toFixed(2);
	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				AddID: address.AddID,
				PaymentMethod: localStorage.getItem("payment"),
				TotalPrice: cartItems.totalPrice,
				TaxPrice: cartItems.taxPrice,
				ShipPrice: cartItems.shippingPrice,
			})
		);
	};
	const newOrder = useSelector((state) => state.newOrder);
	const { OrderID, success } = newOrder;
	useEffect(() => {
		if (success) {
			history.push(`/order/${OrderID}`);
		} else {
			console.log(`Failed to place order`);
		}
	}, [history, dispatch, OrderID, success]);
	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong> {address.Flatno},{address.Building},
								{address.Town},{address.District},{address.State},
								{address.Country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<strong>Method: </strong>
							{localStorage.getItem("payment")}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{loading ? (
								<Loader />
							) : cartItems.length === 0 ? (
								<Message>Your Cart is Empty</Message>
							) : (
								<ListGroup variant="flush">
									{cartItems.map((item, index) => (
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
													<Link to={`/product/${item.BookID}`}>
														{item.Name}
													</Link>
												</Col>
												<Col md={4}>
													{item.Qty} x {item.Price} = {item.Qty * item.Price}
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
									<Col>{cartItems.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>{cartItems.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>{cartItems.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>{cartItems.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{error && <Message variant="danger">{error}</Message>}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									disabled={cartItems.length === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
