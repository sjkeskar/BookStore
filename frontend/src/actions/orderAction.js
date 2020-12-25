import axios from "axios";
import {
	FAIL_ADD_ORDERS,
	FAIL_MY_ORDERS,
	REQUEST_ADD_ORDERS,
	REQUEST_MY_ORDERS,
	SUCCESS_ADD_ORDERS,
	SUCCESS_MY_ORDERS,
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
		const { data } = await axios.post(`/api/order`, order, config);
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
		data = { data };
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
