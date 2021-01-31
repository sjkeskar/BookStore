import axios from "axios";
import {
	FAIL_ADD_ORDERS,
	FAIL_ALL_ORDERS,
	FAIL_MY_ORDERS,
	FAIL_ONE_ORDER,
	FAIL_ORDER_DELIVER,
	FAIL_ORDER_PAY,
	REQUEST_ADD_ORDERS,
	REQUEST_ALL_ORDERS,
	REQUEST_MY_ORDERS,
	REQUEST_ONE_ORDER,
	REQUEST_ORDER_DELIVER,
	REQUEST_ORDER_PAY,
	SUCCESS_ADD_ORDERS,
	SUCCESS_ALL_ORDERS,
	SUCCESS_MY_ORDERS,
	SUCCESS_ONE_ORDER,
	SUCCESS_ORDER_DELIVER,
	SUCCESS_ORDER_PAY,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: REQUEST_ADD_ORDERS });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.post(`/api/order/add`, order, config);
		dispatch({ type: SUCCESS_ADD_ORDERS, payload: data });
	} catch (error) {
		dispatch({
			type: FAIL_ADD_ORDERS,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const myOrder = () => async (dispatch, getState) => {
	try {
		dispatch({ type: REQUEST_MY_ORDERS });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		let { data } = await axios.get(`/api/order`, config);
		dispatch({ type: SUCCESS_MY_ORDERS, payload: data });
	} catch (error) {
		dispatch({
			type: FAIL_MY_ORDERS,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const OneOrder = (OrderID) => async (dispatch, getState) => {
	try {
		dispatch({ type: REQUEST_ONE_ORDER });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		let { data } = await axios.post(`/api/order`, { OrderID }, config);
		dispatch({ type: SUCCESS_ONE_ORDER, payload: data });
	} catch (error) {
		dispatch({
			type: FAIL_ONE_ORDER,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const allOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: REQUEST_ALL_ORDERS });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`/api/order/admin`, config);
		dispatch({ type: SUCCESS_ALL_ORDERS, payload: data });
	} catch (error) {
		dispatch({
			type: FAIL_ALL_ORDERS,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const setDelivered = (OrderID, datedelivered) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: REQUEST_ORDER_DELIVER });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = axios.post(
			`/api/order/admin`,
			{ OrderID, datedelivered },
			config
		);
		dispatch({ type: SUCCESS_ORDER_DELIVER });
	} catch (error) {
		dispatch({
			type: FAIL_ORDER_DELIVER,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const payOrder = (OrderID) => async (dispatch, getState) => {
	try {
		dispatch({ type: REQUEST_ORDER_PAY });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		console.log(`paying...`);
		await axios.put(`/api/order/admin`, { OrderID: OrderID }, config);
		dispatch({ type: SUCCESS_ORDER_PAY });
	} catch (error) {
		console.log(`failed...`);
		dispatch({
			type: FAIL_ORDER_PAY,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
