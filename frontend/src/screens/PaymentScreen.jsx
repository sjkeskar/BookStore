import React, { useState, useEffect } from "react";
import { Button, Form, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = ({ history }) => {
	const [paymentMethod, setPaymentMethod] = useState("");
	const submitHandler = (e) => {
		e.preventDefault();
		localStorage.setItem("payment", `${paymentMethod}`);
		history.push("/placeorder");
	};
	useEffect(() => {
		if (!localStorage.getItem("Address")) {
			history.push("/shipping");
		}
		if (localStorage.getItem("payment")) {
			setPaymentMethod(localStorage.getItem("payment"));
		}
	}, [history]);
	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend">Select Method</Form.Label>
					<Col>
						<Form.Check
							type="radio"
							label="Cash or Card on Delivery"
							id="Pay on Delivery"
							name="paymentmethod"
							value="Pay on Delivery"
							checked={paymentMethod === "Pay on Delivery" ? true : false}
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
						<Form.Check
							type="radio"
							label="Pay using UPI"
							id="UPI"
							name="paymentmethod"
							value="UPI"
							checked={paymentMethod === "UPI" ? true : false}
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>
				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
