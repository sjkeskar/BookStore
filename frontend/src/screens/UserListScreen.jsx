import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser, makeAdmin } from "../actions/userActions";

const UserListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const listAllUser = useSelector((state) => state.listAllUser);
	const { loading, error, users } = listAllUser;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const deleteProfile = useSelector((state) => state.deleteProfile);
	const { success: successDelete, error: errorDelete } = deleteProfile;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin === "true") {
			dispatch(listUsers());
		} else {
			history.push("/login");
		}
	}, [dispatch, history, successDelete, userInfo]);

	const deleteHandler = (UserID) => {
		console.log(UserID);
		if (window.confirm("Are you sure")) {
			dispatch(deleteUser(UserID));
		}
	};

	const admin = (isAdmin, UserID) => {
		let val = isAdmin === "true" ? "false" : "true";
		dispatch(makeAdmin(UserID, val));
		dispatch(listUsers());
	};

	return (
		<>
			<h1>Users</h1>
			{errorDelete && <Message variant="danger">{errorDelete}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th>EDIT</th>
							<th>DELETE</th>
							<th>MAKE ADMIN</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.UserID}>
								<td>{user.UserID}</td>
								<td>{`${user.FirstName} ${user.LastName}`}</td>
								<td>
									<a href={`mailto:${user.EmailID}`}>{user.EmailID}</a>
								</td>
								<td>
									{user.isAdmin === "true" ? (
										<i className="fas fa-check" style={{ color: "green" }}></i>
									) : (
										<i className="fas fa-times" style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/admin/user/${user.UserID}/edit`}>
										<Button variant="light" className="btn-sm">
											<i className="fas fa-edit"></i>
										</Button>
									</LinkContainer>
								</td>
								<td>
									<Button
										variant="danger"
										className="btn-sm"
										onClick={() => deleteHandler(user.UserID)}
									>
										<i className="fas fa-trash"></i>
									</Button>
								</td>
								<td>
									{userInfo.UserID !== user.UserID && (
										<Button
											variant="warning"
											className="btn-sm"
											onClick={() => admin(user.isAdmin, user.UserID)}
										>
											{user.isAdmin === "true" ? "Remove" : "Set"}
										</Button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default UserListScreen;
