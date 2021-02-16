import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { addOneBook } from "../actions/bookActions";

const NewBookScreen = ({ match, history }) => {
	const dispatch = useDispatch();

	const [Name, setName] = useState("");
	const [Image, setImage] = useState("");
	const [Genre, setGenre] = useState("");
	const [Author, setAuthor] = useState("");
	const [Description, setDescription] = useState("");
	const [uploading, setUploading] = useState(false);

	const addBook = useSelector((state) => state.addBook);
	const { loading, error: errorAdd, success } = addBook;

	useEffect(() => {
		if (success) {
			setTimeout(() => {
				history.push(`/admin/edition/new/${match.params.id}`);
				window.location.reload(true);
			}, 1000);
		}
	}, [success, history, match]);

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("image", file);
		setUploading(true);

		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			const { data } = await axios.post("/api/upload", formData, config);

			setImage(data);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(addOneBook({ Name, Description, Author, Genre, Image }));
	};

	return (
		<>
			<Link to="/admin/booklist" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Book</h1>
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
					<Form.Group controlId="Name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="name"
							placeholder="Enter Name"
							value={Name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="Image">
						<Form.Label>Image</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter image url"
							value={Image}
							onChange={(e) => setImage(e.target.value)}
						></Form.Control>
						<Form.File
							id="image-file"
							label="Choose File"
							custom
							onChange={uploadFileHandler}
						></Form.File>
						{uploading && <Loader />}
					</Form.Group>

					<Form.Group controlId="Genre">
						<Form.Label>Genre</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Genre"
							value={Genre}
							onChange={(e) => setGenre(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="Author">
						<Form.Label>Author</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Author Name"
							value={Author}
							onChange={(e) => setAuthor(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="Description">
						<Form.Label>Description</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Description"
							value={Description}
							onChange={(e) => setDescription(e.target.value)}
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

export default NewBookScreen;
