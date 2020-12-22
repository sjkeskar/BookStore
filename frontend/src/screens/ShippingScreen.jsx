import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { allAddress } from "../actions/addressActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const ShippingScreen = ({ history }) => {
	const dispatch = useDispatch();
	const getAllAddress = useSelector((state) => state.getAllAddress);
	const { loading, addresses, error } = getAllAddress;
	const [AddID, setAddID] = useState(null);
	const [message, setMessage] = useState(null);
	useEffect(() => {
		dispatch(allAddress());
	}, [dispatch]);
	const SubmitHandler = (e) => {
		e.preventDefault();
		if (AddID) {
			history.push(`/payment?Add=${AddID}`);
		} else {
			setMessage("Please select an address to deliver the product.");
		}
	};
	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			{message && <Message variant="warning">{message}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : addresses.length === 0 ? (
				<Message variant="Warning">
					You have no addresses registered,{" "}
					<Link to="/newaddress">click here to add address</Link>{" "}
				</Message>
			) : (
				<Form onSubmit={SubmitHandler}>
					{addresses.map((add) => (
						<Form.Group controlId={add.AddID} key={add.AddID}>
							<Row>
								<Col md={1}>
									<Form.Check
										type="radio"
										onSelect={(e) => {
											console.log(e);
											setAddID(add.AddID);
											console.log(AddID);
										}}
									></Form.Check>
								</Col>
								<Col md={11}>
									<Form.Text as="h6">
										{add.Flatno},{add.Building},{add.Street},{add.Landmark},
										{add.Town},{add.District},{add.State},{add.Country},
										{add.PostalCode}
									</Form.Text>
								</Col>
							</Row>
						</Form.Group>
					))}
					<Button type="submit">Select</Button>
				</Form>
			)}
		</FormContainer>
	);
};

export default ShippingScreen;
