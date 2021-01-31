import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	addBookReducer,
	addEditionReducer,
	bookDetailsReducer,
	bookListReducer,
	deleteBookReducer,
	deleteEditionReducer,
	oneBookReducer,
} from "./reducers/bookReducer";
import {
	deleteProfileReducer,
	updateProfileReducer,
	userDetailsReducer,
	userLoginReducer,
	userRegisterReducer,
	listAllUserReducer,
	userDetailsAdminReducer,
} from "./reducers/userReducer";
import {
	getCartBooksReducer,
	removeCartBookReducer,
	updateQuantityReducer,
} from "./reducers/cartReducer";
import {
	addAddressReducer,
	getAllAddressReducer,
	getOneAddressReducer,
	updateUserAddressReducer,
} from "./reducers/addressReducer";
import {
	getAllOrderReducer,
	getMyOrdersReducer,
	getOneOrderReducer,
	newOrderReducer,
	orderDeliverReducer,
	orderPayReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
	bookList: bookListReducer,
	bookDetails: bookDetailsReducer,
	oneBook: oneBookReducer,
	deleteBook: deleteBookReducer,
	addBook: addBookReducer,
	addEdition: addEditionReducer,
	deleteEdition: deleteEditionReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	deleteProfile: deleteProfileReducer,
	listAllUser: listAllUserReducer,
	userDetailsAdmin: userDetailsAdminReducer,
	getCartBooks: getCartBooksReducer,
	updateQuantity: updateQuantityReducer,
	removeCartBook: removeCartBookReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: updateProfileReducer,
	getAllAddress: getAllAddressReducer,
	getOneAddress: getOneAddressReducer,
	addAddress: addAddressReducer,
	updateUserAddress: updateUserAddressReducer,
	newOrder: newOrderReducer,
	getMyOrders: getMyOrdersReducer,
	getOneOrder: getOneOrderReducer,
	getAllOrder: getAllOrderReducer,
	orderDeliver: orderDeliverReducer,
	orderPay: orderPayReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
	getCartBooks: { cartItems: [] },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
