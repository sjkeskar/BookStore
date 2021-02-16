import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

// const Picker = () =>{
// 	return(

// 	)
// }

const SalesScreen = () => {
	const [type, setType] = useState("");
	const [date, setDate] = useState("");
	return (
		<>
			<Form>
				<Form.Group as={Row} controlId="SelectType">
					<Form.Label column sm="2">
						Filter By
					</Form.Label>
					<Col sm="10">
						<Form.Control
							as="select"
							value={type}
							onChange={(e) => setType(e.target.value)}
						>
							<option selected>Pick an option</option>
							<option value="Date">Date</option>
							<option value="Month">Month</option>
							<option value="Year">Year</option>
							<option value="All">All</option>
						</Form.Control>
					</Col>
				</Form.Group>
			</Form>
			{type === "Date" && (
				<Form>
					<Form.Group as={Row} controlId="SelectType">
						<Form.Label column sm="4">
							Choose Year
						</Form.Label>
						<Col sm="8">
							<input
								type="date"
								name="date"
								id="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
							/>
						</Col>
					</Form.Group>
				</Form>
			)}
		</>
	);
};

export default SalesScreen;
