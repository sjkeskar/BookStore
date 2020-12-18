import {
	CART_ADD_BOOK_FAIL,
	CART_ADD_BOOK_REQUEST,
	CART_ADD_BOOK_SUCCESS,
	CART_GET_BOOK_FAIL,
	CART_GET_BOOK_REQUEST,
	CART_GET_BOOK_SUCCESS,
	CART_REMOVE_BOOK_FAIL,
	CART_REMOVE_BOOK_REQUEST,
	CART_REMOVE_BOOK_SUCCESS,
	CART_UPDATE_BOOK_FAIL,
	CART_UPDATE_BOOK_REQUEST,
	CART_UPDATE_BOOK_SUCCESS,
} from "../constants/cartConstants";

export const addBookCartReducer = (state = {}, action) => {
	switch (action.type) {
		case CART_ADD_BOOK_REQUEST:
			return { loading: true };
		case CART_ADD_BOOK_SUCCESS:
			return { loading: false, success: true, cartItems: action.payload };
		case CART_ADD_BOOK_FAIL:
			return { loading: false, success: false, error: action.payload };
		default:
			return state;
	}
};

export const getCartBooksReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case CART_GET_BOOK_REQUEST:
			return { loading: true };
		case CART_GET_BOOK_SUCCESS:
			return { loading: false, cartItems: action.payload };
		case CART_GET_BOOK_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const updateQuantityReducer = (state={}, action) =>{
	switch(action.type){
		case CART_UPDATE_BOOK_REQUEST:
			return {loading: true}
		case CART_UPDATE_BOOK_SUCCESS:
			return {loading: true, success: true}
		case CART_UPDATE_BOOK_FAIL:
			return {loading: true, success: false}
		default:
			return {}
	}
}

export const removeCartBookReducer = (state = {}, action)=>{
	switch(action.type){
		case CART_REMOVE_BOOK_REQUEST:
			return {loading: true}
		case CART_REMOVE_BOOK_SUCCESS:
			return {loading: false, success: true}
		case CART_REMOVE_BOOK_FAIL:
			return {loading: false, success: false}
		default:
			return {}
	}
}
