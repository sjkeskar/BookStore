import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { deleteOneBook, listBooks } from "../actions/bookActions";

const BookListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const bookList = useSelector((state) => state.bookList);
	const { loading, error, books } = bookList;

	const deleteBook = useSelector((state) => state.deleteBook);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = deleteBook;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (!userInfo || userInfo.isAdmin !== "true") {
			history.push("/login");
		} else {
			dispatch(listBooks());
		}
	}, [dispatch, history, userInfo, successDelete]);

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteOneBook(id));
		}
	};

	const createProductHandler = () => {
		history.push(`/admin/booklist/new`);
	};

	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>BOOKS</h1>
				</Col>
				<Col className="text-right">
					<Button className="my-3" onClick={createProductHandler}>
						<i className="fas fa-plus"></i> Create Book
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
								<th>IMAGE</th>
								<th>NAME</th>
								<th>AUTHOR</th>
								<th>GENRE</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{books.map((product) => (
								<tr key={product.BookID}>
									<td>
										{" "}
										<img
											src={product.Image}
											alt={product.Image}
											className="img-fluid img-thumbnail"
										/>
									</td>
									<td>{product.Name}</td>
									<td>{product.Author}</td>
									<td>{product.Genre}</td>
									<th>
										<LinkContainer to={`/admin/editionlist/${product.BookID}`}>
											<Button variant="dark" className="btn-sm">
												DETAILS
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
											onClick={() => deleteHandler(product.BookID)}
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

export default BookListScreen;
