import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import BookScreen from "./screens/BookScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AddressScreen from "./screens/AddressScreen";
import NewAddressScreen from "./screens/NewAddressScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OneOrderScreen from "./screens/OneOrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import BookListScreen from "./screens/BookListScreen";
import EditionListScreen from "./screens/EditionListScreen";
import NewBookScreen from "./screens/NewBookScreen";
import NewEditionScreen from "./screens/NewEditionScreen";

function App() {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route path="/" component={HomeScreen} exact />
					<Route path="/login" component={LoginScreen} />
					<Route path="/profile" component={ProfileScreen} />
					<Route path="/admin/userlist" component={UserListScreen} />
					<Route path="/admin/user/:id/edit" component={UserEditScreen} />
					<Route path="/order/:id" component={OneOrderScreen} />
					<Route path="/order" component={OrderScreen} exact />
					<Route path="/admin/orderlist" component={OrderListScreen} />
					<Route path="/shipping" component={ShippingScreen} />
					<Route path="/payment" component={PaymentScreen} />
					<Route path="/placeorder" component={PlaceOrderScreen} />
					<Route path="/myaddress" component={AddressScreen} />
					<Route path="/newaddress" component={NewAddressScreen} />
					<Route path="/register" component={RegisterScreen} />
					<Route path="/cart" component={CartScreen} />
					{/* <Route path="/admin/sales" component={SalesScreen} /> */}
					<Route path="/admin/booklist" component={BookListScreen} exact />
					<Route path="/admin/booklist/new" component={NewBookScreen} exact />
					<Route
						path="/admin/booklist/edit/:id"
						component={NewBookScreen}
						exact
					/>
					<Route
						path="/admin/editionlist/:id"
						component={EditionListScreen}
						exact
					/>
					<Route
						path="/admin/edition/new/:id"
						component={NewEditionScreen}
						exact
					/>
					<Route
						path="/admin/edition/edit/:id"
						component={NewEditionScreen}
						exact
					/>
					<Route path="/book/:id" component={BookScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
