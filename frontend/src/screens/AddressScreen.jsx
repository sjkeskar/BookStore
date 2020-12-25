import React, { useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Address from "../components/Address";
import { allAddress } from "../actions/addressActions";
import { Link } from "react-router-dom";

const AddressScreen = () => {
	const dispatch = useDispatch();
	const getAllAddress = useSelector((state) => state.getAllAddress);
	const { loading, addresses, error } = getAllAddress;
	useEffect(() => {
		dispatch(allAddress());
	}, [dispatch]);
	return (
		<>
			<h1>Your Addresses</h1>
			<p> </p>
			<Link to={`/`}>
				<Button>Go Back</Button>
			</Link>
			<Link to="/newaddress">
				<Button block className="my-2 p-3" variant="outline-primary">
					Add New Address
				</Button>
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						{addresses.map((add) => (
							<Col key={add.AddID} md={12} xs={12}>
								<Address address={add} key={add.AddID} />
							</Col>
						))}
					</Row>
				</>
			)}
		</>
	);
};

export default AddressScreen;
