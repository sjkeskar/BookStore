import React from "react";
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const Address = ({ address }) => {
	address.default = address.default === "true" ? true : false;
	return (
		<Card className="my-3 p-3 ">
			<Card.Body>
				<LinkContainer to={`/newaddress?id=${address.AddID}`}>
					<Card.Text as="p">
						{" "}
						{address.Flatno},{address.Building},{address.Street},
						{address.Landmark},{address.Town},{address.District},{address.State}
						,{address.Country}.{"  "}
						PostalCode: {address.PostalCode}
					</Card.Text>
				</LinkContainer>
				{address.default ? <h4>Default Address</h4> : ""}
				<Link to={`/newaddress?id=${address.AddID}`}>
					<Button variant="outline-primary">Edit Address</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};

export default Address;
