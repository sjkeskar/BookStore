import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { detailOne, updateUserAdmin } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = ({ match, history }) => {
	const userId = match.params.id;

	const [FirstName, setFName] = useState("");
	const [LastName, setLName] = useState("");
	const [EmailID, setEmail] = useState("");
	const [PhoneNo, setPhoneno] = useState(0);

	const dispatch = useDispatch();

	const userDetailsAdmin = useSelector((state) => state.userDetailsAdmin);
	const { loading, error, user } = userDetailsAdmin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdateProfile;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			history.push("/admin/userlist");
		} else {
			if (!user) {
				dispatch(detailOne(userId));
			} else if (user.UserID !== userId) {
				dispatch({ type: USER_UPDATE_RESET });
				dispatch(detailOne(userId));
			} else {
				setFName(user.FirstName);
				setLName(user.LastName);
				setEmail(user.EmailID);
				setPhoneno(user.PhoneNo);
			}
		}
	}, [dispatch, history, userId, user, successUpdate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateUserAdmin({ UserID: userId, FirstName, LastName, EmailID, PhoneNo })
		);
	};

	return (
		<>
			<Link to="/admin/userlist" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="FirstName">
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type="name"
								placeholder="Enter First name"
								value={FirstName}
								onChange={(e) => setFName(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="LastName">
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type="name"
								placeholder="Enter name"
								value={LastName}
								onChange={(e) => setLName(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="email">
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={EmailID}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="phonenumber">
							<Form.Label>Phone Number</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter Phone Number"
								value={PhoneNo}
								onChange={(e) => setPhoneno(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Button type="submit" variant="primary">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
