import axios from "axios";
import {
	USER_ADDRESSES_FAIL,
	USER_ADDRESSES_REQUEST,
	USER_ADDRESSES_SUCCESS,
	USER_ADDRESS_FAIL,
	USER_ADDRESS_REQUEST,
	USER_ADDRESS_SUCCESS,
	USER_ADD_ADDRESS_FAIL,
	USER_ADD_ADDRESS_REQUEST,
	USER_ADD_ADDRESS_SUCCESS,
	USER_UPDATE_ADDRESS_FAIL,
	USER_UPDATE_ADDRESS_REQUEST,
	USER_UPDATE_ADDRESS_SUCCESS,
} from "../constants/addressConstants";

export const allAddress = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_ADDRESSES_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`/api/users/add`, config);
		dispatch({ type: USER_ADDRESSES_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_ADDRESSES_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const oneAddress = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_ADDRESS_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`/api/users/add/${id}`, config);
		console.log(data[0]);
		dispatch({ type: USER_ADDRESS_SUCCESS, payload: data[0] });
	} catch (error) {
		dispatch({
			type: USER_ADDRESS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const newAddress = (address) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_ADD_ADDRESS_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		// address:{Flatno,Building,Street,Landmark,Town,District,State,Country,PostalCode,Default}
		const { data } = await axios.post(`/api/users/add`, address, config);
		dispatch({ type: USER_ADD_ADDRESS_SUCCESS, payload: data });
	} catch (error) {
		console.log(error);
		dispatch({
			type: USER_ADD_ADDRESS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateAddress = (address) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_ADDRESS_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		await axios.put(`/api/users/add`, address, config);
		dispatch({ type: USER_UPDATE_ADDRESS_SUCCESS });
	} catch (error) {
		dispatch({ type: USER_UPDATE_ADDRESS_FAIL });
	}
};
