import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { bookDetailsReducer, bookListReducer } from "./reducers/bookReducer";
import {
	updateProfileReducer,
	userDetailsReducer,
	userLoginReducer,
	userRegisterReducer,
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
} from "./reducers/addressReducer";

const reducer = combineReducers({
	bookList: bookListReducer,
	bookDetails: bookDetailsReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	getCartBooks: getCartBooksReducer,
	updateQuantity: updateQuantityReducer,
	removeCartBook: removeCartBookReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: updateProfileReducer,
	getAllAddress: getAllAddressReducer,
	getOneAddress: getOneAddressReducer,
	addAddress: addAddressReducer,
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
