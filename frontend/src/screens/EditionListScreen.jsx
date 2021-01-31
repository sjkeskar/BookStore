import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listBookDetails, removeEdition } from "../actions/bookActions";

const EditionListScreen = ({ history, match }) => {
	const dispatch = useDispatch();

	const bookDetails = useSelector((state) => state.bookDetails);
	const { loading, error, book } = bookDetails;

	const deleteEdition = useSelector((state) => state.deleteEdition);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = deleteEdition;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (!userInfo || userInfo.isAdmin !== "true") {
			history.push("/login");
		} else if (book && book.length === 0) {
			dispatch(listBookDetails(match.params.id));
		} else {
			dispatch(listBookDetails(match.params.id));
		}
	}, [dispatch, history, userInfo, successDelete]);
	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(removeEdition(id));
		}
	};

	const createProductHandler = () => {
		history.push(`/admin/edition/new/${match.params.id}`);
	};
	return (
		<>
			<Row className="align-items-center">
				<Col>
					<LinkContainer to={`/admin/booklist`}>
						<Button className="my-3">GO BACK</Button>
					</LinkContainer>
				</Col>
				<Col>
					<h1>EDITIONS</h1>
				</Col>
				<Col className="text-right">
					<Button className="my-3">
						<i className="fas fa-edit"></i> EDIT BOOK
					</Button>
					{"  "}
					<Button className="my-3" onClick={createProductHandler}>
						<i className="fas fa-plus"></i> Add New Edition
					</Button>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant="danger">{errorDelete}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>NAME</th>
								<th>TYPE</th>
								<th>EDITION</th>
								<th>PUBLISHER</th>
								<th>PRICE</th>
								<th>STOCK</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{book.map((product) => (
								<tr key={product.PriceID}>
									<td>{product.Name}</td>
									<td>{product.Type}</td>
									<td>{product.Edition}</td>
									<td>{product.Publisher}</td>
									<td>{product.Price}</td>
									<td>{product.Stock}</td>
									<th>
										<LinkContainer
											to={`/admin/editionlist/${product.PriceID}/edit`}
										>
											<Button variant="dark" className="btn-sm">
												<i className="fas fa-edit"></i>EDIT
											</Button>
										</LinkContainer>
									</th>
									<td>
										{/* <LinkContainer to={`/admin/product/${product._id}/edit`}>
											<Button variant="light" className="btn-sm">
												<i className="fas fa-edit"></i>
											</Button>
										</LinkContainer> */}
										<Button
											variant="danger"
											className="btn-sm"
											onClick={() => deleteHandler(product.PriceID)}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			)}
		</>
	);
};

export default EditionListScreen;
