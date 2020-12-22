import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { oneAddress, newAddress } from "../actions/addressActions";

const NewAddressScreen = ({ location }) => {
	const dispatch = useDispatch();
	const getOneAddress = useSelector((state) => state.getOneAddress);
	const { loading: loadingone, address, error: errorone } = getOneAddress;
	const addAddress = useSelector((state) => state.addAddress);
	const { loading: loadingadd, success, error: erroradd } = addAddress;
	const id = location.search ? Number(location.search.split("=")[1]) : null;
	const [Building, setBuilding] = useState("");
	const [Street, setStreet] = useState("");
	const [Landmark, setLandmark] = useState("");
	const [Town, setTown] = useState("");
	const [District, setDistrict] = useState("");
	const [State, setstate] = useState("");
	const [Country, setCountry] = useState("");
	const [Default, setdefault] = useState(false);
	const [Flatno, setFlat] = useState(0);
	const [PostalCode, setPostalCode] = useState(0);
	useEffect(() => {
		if (id) {
			if (!address) {
				dispatch(oneAddress(id));
			}
			if (address) {
				setBuilding(address.Building);
				setStreet(address.Street);
				setLandmark(address.Landmark);
				setTown(address.Town);
				setDistrict(address.District);
				setstate(address.State);
				setCountry(address.Country);
				setdefault(address.default);
				setFlat(address.Flatno);
				setPostalCode(address.PostalCode);
			}
		}
	}, [id, dispatch, address]);

	const formController = (e) => {
		e.preventDefault();
		dispatch(
			newAddress({
				Flatno,
				Building,
				Street,
				Landmark,
				Town,
				District,
				State,
				Country,
				PostalCode,
				Default,
			})
		);
	};
	return (
		<FormContainer>
			{/* {message && <Message variant="danger">{message}</Message>} */}
			{erroradd && <Message variant="danger">{erroradd}</Message>}
			{success && <Message variant="success">Address Addedd</Message>}
			{loadingone || loadingadd ? (
				<Loader />
			) : errorone ? (
				<Message variant="danger">{errorone}</Message>
			) : (
				<Form onSubmit={formController}>
					<Form.Group controlId="Flatno">
						<Form.Label>Flat Number</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Your Flat Number"
							value={Flatno}
							onChange={(e) => setFlat(Number(e.target.value))}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="Building">
						<Form.Label>Building</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Building Name"
							value={Building}
							onChange={(e) => setBuilding(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="Street">
						<Form.Label>Street</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Street Name"
							value={Street}
							onChange={(e) => setStreet(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="Landmark">
						<Form.Label>Landmark</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Landmark Name"
							value={Landmark}
							onChange={(e) => setLandmark(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="Town">
						<Form.Label>Town</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Town Name"
							value={Town}
							onChange={(e) => setTown(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="District">
						<Form.Label>District</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter District Name"
							value={District}
							onChange={(e) => setDistrict(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="State">
						<Form.Label>State</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter State Name"
							value={State}
							onChange={(e) => setstate(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="Country">
						<Form.Label>Country</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Country Name"
							value={Country}
							onChange={(e) => setCountry(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="PostalCode">
						<Form.Label>PostalCode</Form.Label>
						<Form.Control
							type="number"
							placeholder="Enter PostalCode"
							value={PostalCode}
							onChange={(e) => setPostalCode(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="default">
						<Form.Check
							type="checkbox"
							label="Set as Default"
							checked={Default ? true : false}
							onChange={(e) => setdefault(!Default)}
						></Form.Check>
					</Form.Group>
					<Button type="submit">Save Address</Button>
				</Form>
			)}
		</FormContainer>
	);
};

export default NewAddressScreen;
