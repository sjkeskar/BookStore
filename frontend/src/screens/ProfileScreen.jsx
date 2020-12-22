import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { details, updateUser } from "../actions/userActions";

const ProfileScreen = ({ history }) => {
	const [EmailID, setEmail] = useState("");
	const [Password, setPassword] = useState("");
	const [FirstName, setFName] = useState("");
	const [LastName, setLName] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [PhoneNo, setPhone] = useState("");
	const [message, setMessage] = useState(null);
	const dispatch = useDispatch();
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;
	useEffect(() => {
		if (!userInfo) {
			history.push("/login");
		} else {
			if(!user || success){
				dispatch(details());
			}else{
				setFName(user.FirstName);
				setLName(user.LastName);
				setPhone(user.PhoneNo);
				setEmail(user.EmailID);
			}
		}
	}, [history, userInfo, dispatch, user, success]);
	const submitHandler = (e) => {
		e.preventDefault();
		if (Password !== confirmPassword) {
			setMessage("Passwords do not match");
		} else {
			dispatch(updateUser({ FirstName, LastName, EmailID, PhoneNo, Password }));
		}
	};
	return (
		<FormContainer>
			<h1>User Profile</h1>
			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}
			{success && <Message variant="success">Profile Updated</Message>}
			{loading ? (
				<Loader />
			) : (
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="first-name">
						<Form.Label>First Name</Form.Label>
						<Form.Control
							type="name"
							placeholder="Enter First Name"
							value={FirstName}
							onChange={(e) => setFName(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="last-name">
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							type="name"
							placeholder="Enter Last Name"
							value={LastName}
							onChange={(e) => setLName(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="email">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter E-Mail"
							value={EmailID}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="phone">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Phone Number"
							value={PhoneNo}
							onChange={(e) => setPhone(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter New Password"
							value={Password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm New Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Button type="submit" variant="primary">
						Update
					</Button>
				</Form>
			)}
			{/* <Col md={9}>
				<h1>My Orders</h1>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant="danger">{errorOrders}</Message>
				) : (
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>Date</th>
								<th>Total</th>
								<th>Paid</th>
								<th>Delivered</th>
								<th>Something</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((ordr) => (
								<tr key={ordr._id}>
									<td>{ordr._id}</td>
									<td>{ordr.createdAt.substring(0, 10)}</td>
									<td>{ordr.totalPrice}</td>
									<td>
										{ordr.isPaid ? (
											ordr.paidAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</td>
									<td>
										{ordr.isDelivered ? (
											ordr.deliveredAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${ordr._id}`}>
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
			</Col> */}
		</FormContainer>
	);
};

export default ProfileScreen;
