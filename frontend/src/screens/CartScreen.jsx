import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Card,
	Form,
	Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { getCartItems, removeFromCart, updateQty } from "../actions/cartActions";
import Loader from "../components/Loader";

const CartScreen = ({ match, location, history }) => {
	const dispatch = useDispatch();
	const getCartBooks = useSelector((state) => state.getCartBooks);
	const { loading, cartItems, error } = getCartBooks;
	useEffect(() => {
		dispatch(getCartItems());
	}, [dispatch]);
	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};
	const checkoutHandler = () => {
		history.push("/login?redirect=shipping");
	};
	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<Col md={8}>
						<h1>Shopping Cart</h1>
						{cartItems.length === 0 ? (
							<Message>
								Your Cart is empty.
								<Link to="/">
									<strong>Go Back</strong>
								</Link>{" "}
							</Message>
						) : (
							<ListGroup variant="flush">
								{cartItems.map((item) => (
									<ListGroup.Item key={item.CartID}>
										<Row>
											<Col md={2}>
												<Image src={item.Image} alt={item.Name} fluid rounded />
											</Col>
											<Col md={3}>
												<Link to={`/product/${item.BookID}`}>{item.Name}</Link>
											</Col>
											<Col md={2}>{item.Price}</Col>
											<Col md={2}>
												<Form.Control
													as="select"
													value={item.Qty}
													onChange={(e) =>
														dispatch(
															updateQty(item.CartID, Number(e.target.value))
														)
													}
												>
													{[...Array(3).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
											<Col md={2}>
												<Button
													type="button"
													variant="light"
													onClick={() => {
														removeFromCartHandler(item.CartID);
													}}
												>
													<i className="fas fa-trash"></i>{" "}
												</Button>
											</Col>
										</Row>
									</ListGroup.Item>
								))}
							</ListGroup>
						)}
					</Col>
					<Col md={4}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h2>
										Subtotal (
										{cartItems.reduce((acc, item) => acc + item.Qty, 0)}) items
									</h2>

									{cartItems
										.reduce((acc, item) => acc + item.Qty * item.Price, 0)
										.toFixed(2)}
								</ListGroup.Item>
								<ListGroup.Item>
									<Button
										type="button"
										className="btn-block"
										disabled={cartItems.length === 0}
										onClick={checkoutHandler}
									>
										CHECKOUT
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default CartScreen;
