import axios from "axios";
import {
	FAIL_ADD_ORDERS,
	REQUEST_ADD_ORDERS,
	SUCCESS_ADD_ORDERS,
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
		console.log(order);
		const { data } = await axios.post(`/api/order`, order, config);
		console.log(data);
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
