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
	const [AddID, setAddID] = useState(0);
	const [message, setMessage] = useState(null);
	const adds = localStorage.getItem("Address")
		? JSON.parse(localStorage.getItem("Address"))
		: { AddID: 0 };
	useEffect(() => {
		dispatch(allAddress());
		if (adds) {
			setAddID(Number(adds.AddID));
		}
	}, [dispatch]);
	const SubmitHandler = (e) => {
		e.preventDefault();
		if (AddID) {
			let addr = addresses.find((ad) => ad.AddID === AddID);
			localStorage.setItem("Address", JSON.stringify(addr));
			history.push(`/payment`);
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
					<Link to="/newaddress">
						<strong>click here to add address</strong>
					</Link>{" "}
				</Message>
			) : (
				<Form onSubmit={SubmitHandler}>
					{addresses.map((add) => (
						<Form.Group controlId={add.AddID} key={add.AddID}>
							<Row>
								<Col md={1}>
									<Form.Check
										type="radio"
										value={add.AddID}
										onChange={(e) => {
											setAddID(Number(e.target.value));
										}}
										checked={AddID === add.AddID ? true : false}
									></Form.Check>
								</Col>
								<Col md={11}>
									<Form.Text as="h5">
										{add.Flatno},{add.Building},{add.Strret},{add.Landmark},
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
