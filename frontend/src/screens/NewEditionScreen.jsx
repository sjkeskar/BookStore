import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { newEdition } from "../actions/bookActions";

const NewEditionScreen = ({ match, history }) => {
	const dispatch = useDispatch();

	const [Price, setPrice] = useState(0);
	const [Stock, setStock] = useState(0);
	const [Discount, setDiscount] = useState(0);
	const [Edition, setEdition] = useState("");
	const [Publisher, setPublisher] = useState("");
	const [PrintedDate, setPrintedDate] = useState("");
	const [Type, setType] = useState("");

	const addEdition = useSelector((state) => state.addEdition);
	const { loading, error: errorAdd, success } = addEdition;

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			newEdition({
				BookID: match.params.id,
				Price,
				Stock,
				Edition,
				Publisher,
				Type,
				PrintedDate,
				Discount,
			})
		);
	};

	useEffect(() => {
		if (success) {
			setTimeout(() => {
				history.push(`/admin/editionlist/${match.params.id}`);
				window.location.reload(true);
			}, 1000);
		}
	}, [success, history, match.params.id]);

	return (
		<>
			<Link
				to={`/admin/editionlist/${match.params.id}`}
				className="btn btn-light my-3"
			>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edition</h1>
				{/* {loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>} */}
				{loading ? (
					<Loader />
				) : errorAdd ? (
					<Message variant="danger">{errorAdd}</Message>
				) : success ? (
					<Message variant="success">{`Book Added Successfully`}</Message>
				) : (
					""
				)}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="Price">
						<Form.Label>Price</Form.Label>
						<Form.Control
							type="number"
							placeholder="Enter Price"
							value={Price}
							onChange={(e) => setPrice(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="Stock">
						<Form.Label>Stock</Form.Label>
						<Form.Control
							type="number"
							placeholder="Enter Available Stock"
							value={Stock}
							onChange={(e) => setStock(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="Discount">
						<Form.Label>Discount</Form.Label>
						<Form.Control
							type="number"
							placeholder="Enter Available Stock"
							value={Discount}
							onChange={(e) => setDiscount(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="Edition">
						<Form.Label>Edition</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Edition"
							value={Edition}
							onChange={(e) => setEdition(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="Publisher">
						<Form.Label>Publisher</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Publisher Name"
							value={Publisher}
							onChange={(e) => setPublisher(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="Type">
						<Form.Label>Type</Form.Label>
						<Form.Control
							as="select"
							value={Type}
							onChange={(e) => setType(e.target.value)}
						>
							<option selected>Please select a type</option>
							<option value="hardcover">hardcover</option>
							<option value="paperback">paperback</option>
						</Form.Control>
					</Form.Group>

					<Form.Group controlId="PrintedDate">
						<Form.Label>Enter Printed Date</Form.Label>
						<Form.Control
							type="date"
							placeholder="Enter Printed Date"
							value={PrintedDate}
							onChange={(e) => setPrintedDate(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Button type="submit" variant="primary">
						SUBMIT
					</Button>
				</Form>
			</FormContainer>
		</>
	);
};

export default NewEditionScreen;
