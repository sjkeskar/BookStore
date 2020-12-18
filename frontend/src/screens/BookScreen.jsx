import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	Card,
	Col,
	Image,
	ListGroup,
	Row,
	Button,
	Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listBookDetails } from "../actions/bookActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";

const BookScreen = ({ history, match }) => {
	const [Qty, setQty] = useState(1);
	const [PriceID, setId] = useState(0);
	const dispatch = useDispatch();
	const [type, setType] = useState("");
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);
	const [publisher, setPublisher] = useState("");
	const [edition, setEdition] = useState("");
	const [image, setImage] = useState("");
	const [Name, setName] = useState("");
	const [author, setAuthor] = useState("");
	const [desc, setDesc] = useState("");
	const [message, setMessage] = useState(null);
	const bookDetails = useSelector((state) => state.bookDetails);
	const { loading, error, book } = bookDetails;
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	useEffect(() => {
		dispatch(listBookDetails(match.params.id));
	}, [match, dispatch]);
	useEffect(() => {
		if (type && book) {
			book.forEach((bk, index) => {
				if (bk.Type === type) {
					setPrice(bk.Price);
					setStock(bk.Stock);
					setPublisher(bk.Publisher);
					setEdition(bk.Edition);
					setAuthor(bk.Author);
					setDesc(bk.Desciption);
					setName(bk.Name);
					setImage(bk.Image);
					setId(bk.PriceID);
				}
			});
		} else if (book) {
			console.log(book);
			let str = "paperback";
			setType(str);
			book.forEach((bk) => {
				if (bk.Type === type) {
					setPrice(bk.Price);
					setStock(bk.Stock);
					setPublisher(bk.Publisher);
					setEdition(bk.Edition);
				}
			});
		}
	}, [type, setType, book]);
	const addToCartHandler = () => {
		if (userInfo) {
			dispatch(addToCart(PriceID, Qty));
			history.push(`/cart`);
		} else {
			setMessage("You need to LogIn First.");
		}
	};
	return (
		<>
			<Link className="btn btn-dark my-3" to="/">
				Go Back
			</Link>
			{message && <Message variant="danger">{message}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<Col md={5}>
						<Image src={image} alt={Name} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>{Name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>Author: {author}</ListGroup.Item>
							<ListGroup.Item>Publisher: {publisher}</ListGroup.Item>
							<ListGroup.Item>Edition: {edition}</ListGroup.Item>
							<ListGroup.Item>Description: {desc}</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={4}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>
											<b>Price</b>
										</Col>
										<Col>
											<strong>{price} Rupees</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status</Col>
										<Col>{stock > 0 ? "In Stock" : "Out Of Stock"}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Quantity</Col>
										<Col>
											<Form.Control
												as="select"
												value={type}
												onChange={(e) => {
													setType(e.target.value);
													console.log(`value is ${e.target.value}`);
												}}
											>
												{book.map((x) => (
													<option key={x.PriceID} value={x.Type}>
														{x.Type}
													</option>
												))}
											</Form.Control>
										</Col>
									</Row>
								</ListGroup.Item>
								{stock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Quantity</Col>
											<Col>
												<Form.Control
													as="select"
													value={Qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{[...Array(3).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item>
									<Button
										onClick={addToCartHandler}
										className="btn-black"
										type="button"
										disabled={stock === 0}
									>
										Add to Bag
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

export default BookScreen;
