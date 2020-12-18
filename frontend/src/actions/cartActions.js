import axios from "axios";
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

export const addToCart = (PriceID, Qty) => async (dispatch, getState) => {
	try {
		dispatch({ type: CART_ADD_BOOK_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const UserID = userInfo.UserID;
		const { data } = await axios.post("/api/cart", { UserID, PriceID, Qty }, config);
		dispatch({ type: CART_ADD_BOOK_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: CART_ADD_BOOK_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getCartItems = () => async (dispatch, getState) => {
	try {
		dispatch({ type: CART_GET_BOOK_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get("/api/cart", config);
		dispatch({ type: CART_GET_BOOK_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: CART_GET_BOOK_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateQty = (CartID, Qty) => async (dispatch, getState) =>{
	try{
		dispatch({type: CART_UPDATE_BOOK_REQUEST})
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		await axios.put("/api/cart", {Qty, CartID}, config)
		dispatch({type: CART_UPDATE_BOOK_SUCCESS})
		const { data } = await axios.get("/api/cart", config);
		dispatch({ type: CART_GET_BOOK_SUCCESS, payload: data });
	}catch(error){
		dispatch({
			type: CART_UPDATE_BOOK_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
}

export const removeFromCart = (CartID) => async (dispatch, getState) =>{
	try{
		dispatch({type: CART_REMOVE_BOOK_REQUEST})
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		await axios.post("/api/cart/del",{CartID}, config)
		dispatch({type: CART_REMOVE_BOOK_SUCCESS})
		const { data } = await axios.get("/api/cart", config);
		dispatch({ type: CART_GET_BOOK_SUCCESS, payload: data });
	}catch(error){
		dispatch({
			type: CART_REMOVE_BOOK_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
}