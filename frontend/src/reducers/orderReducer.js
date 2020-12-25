import {
	FAIL_MY_ORDERS,
	REQUEST_MY_ORDERS,
	SUCCESS_MY_ORDERS,
	REQUEST_ADD_ORDERS,
	SUCCESS_ADD_ORDERS,
	FAIL_ADD_ORDERS,
} from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
	switch (action.type) {
		case REQUEST_ADD_ORDERS:
			return { loading: true };
		case SUCCESS_ADD_ORDERS:
			return { loading: false, success: true, OrderID: action.payload };
		case FAIL_ADD_ORDERS:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const getMyOrdersReducer = (state = { addresses: [] }, action) => {
	switch (action.type) {
		case REQUEST_MY_ORDERS:
			return { loading: true };
		case SUCCESS_MY_ORDERS:
			return { loading: false, addresses: action.payload };
		case FAIL_MY_ORDERS:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
