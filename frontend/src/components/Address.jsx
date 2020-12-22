import React from "react";
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const Address = ({ address }) => {
	console.log(address.Default);
	return (
		<Card className="my-3 p-3 ">
			<Card.Body>
				<Link to={`/newaddress?id=${address.AddID}`}>
					<Card.Text as="p">
						{" "}
						{address.Flatno},{address.Building},{address.Street},
						{address.Landmark},{address.Town},{address.District},{address.State}
						,{address.Country}.{"  "}
						PostalCode: {address.PostalCode}
					</Card.Text>
				</Link>
				{address.default ? <h4>Default Address</h4> : ""}
				<LinkContainer to={`/newaddress?id=${address.AddID}`}>
					<Button variant="outline-primary">Edit Address</Button>
				</LinkContainer>
			</Card.Body>
		</Card>
	);
};

export default Address;
