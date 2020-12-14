import { ADD_BOOK_FAIL, ADD_BOOK_SUCCESS } from "../constants/cartConstants";

export const addBookCartReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_BOOK_REQUEST:
			return { loading: true };
		case ADD_BOOK_SUCCESS:
			return { loading: false, success: true, cartItems: action.payload };
		case ADD_BOOK_FAIL:
			return { loading: false, success: false, error: action.payload };
		default:
			return state;
	}
};
