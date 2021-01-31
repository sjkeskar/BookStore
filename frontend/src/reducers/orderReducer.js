import {
	FAIL_MY_ORDERS,
	REQUEST_MY_ORDERS,
	SUCCESS_MY_ORDERS,
	REQUEST_ADD_ORDERS,
	SUCCESS_ADD_ORDERS,
	FAIL_ADD_ORDERS,
	REQUEST_ONE_ORDER,
	SUCCESS_ONE_ORDER,
	FAIL_ONE_ORDER,
	RESET_ONE_ORDER,
	REQUEST_ALL_ORDERS,
	SUCCESS_ALL_ORDERS,
	FAIL_ALL_ORDERS,
	REQUEST_ORDER_DELIVER,
	SUCCESS_ORDER_DELIVER,
	FAIL_ORDER_DELIVER,
	REQUEST_ORDER_PAY,
	SUCCESS_ORDER_PAY,
	FAIL_ORDER_PAY,
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

export const getMyOrdersReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case REQUEST_MY_ORDERS:
			return { loading: true };
		case SUCCESS_MY_ORDERS:
			return { loading: false, orders: action.payload };
		case FAIL_MY_ORDERS:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const getOneOrderReducer = (state = { order: [] }, action) => {
	switch (action.type) {
		case REQUEST_ONE_ORDER:
			return { loading: true };
		case SUCCESS_ONE_ORDER:
			return { loading: false, order: action.payload };
		case FAIL_ONE_ORDER:
			return { loading: false, error: action.payload };
		case RESET_ONE_ORDER:
			return { order: null };
		default:
			return state;
	}
};

export const getAllOrderReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case REQUEST_ALL_ORDERS:
			return { loading: true };
		case SUCCESS_ALL_ORDERS:
			return { loading: false, orders: action.payload };
		case FAIL_ALL_ORDERS:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const orderDeliverReducer = (state = {}, action) => {
	switch (action.type) {
		case REQUEST_ORDER_DELIVER:
			return { ...state, loading: true };
		case SUCCESS_ORDER_DELIVER:
			return { loading: false, success: true };
		case FAIL_ORDER_DELIVER:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case REQUEST_ORDER_PAY:
			return { ...state, loading: true };
		case SUCCESS_ORDER_PAY:
			return { loading: false, success: true };
		case FAIL_ORDER_PAY:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
