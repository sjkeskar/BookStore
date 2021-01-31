import {
	BOOK_ADD_FAIL,
	BOOK_ADD_REQUEST,
	BOOK_ADD_SUCCESS,
	BOOK_DELETE_FAIL,
	BOOK_DELETE_REQUEST,
	BOOK_DELETE_SUCCESS,
	BOOK_DETAILS_FAIL,
	BOOK_DETAILS_ONE_FAIL,
	BOOK_DETAILS_ONE_REQUEST,
	BOOK_DETAILS_ONE_SUCCESS,
	BOOK_DETAILS_REQUEST,
	BOOK_DETAILS_SUCCESS,
	BOOK_LIST_FAIL,
	BOOK_LIST_REQUEST,
	BOOK_LIST_SUCCESS,
	EDITION_ADD_FAIL,
	EDITION_ADD_REQUEST,
	EDITION_ADD_SUCCESS,
	EDITION_DELETE_FAIL,
	EDITION_DELETE_REQUEST,
	EDITION_DELETE_SUCCESS,
} from "../constants/bookConstants";

import axios from "axios";

export const listBooks = () => async (dispatch) => {
	try {
		dispatch({ type: BOOK_LIST_REQUEST });
		const { data } = await axios.get(`/api/books`);
		dispatch({ type: BOOK_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: BOOK_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listBookDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: BOOK_DETAILS_REQUEST });
		const { data } = await axios.get(`/api/books/${id}`);
		dispatch({ type: BOOK_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: BOOK_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getoneBook = (id) => async (dispatch) => {
	try {
		dispatch({ type: BOOK_DETAILS_ONE_REQUEST });
		const { data } = await axios.get(`/api/books/price/${id}`);
		dispatch({ type: BOOK_DETAILS_ONE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: BOOK_DETAILS_ONE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteOneBook = (BookID) => async (dispatch, getState) => {
	try {
		dispatch({ type: BOOK_DELETE_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.put(`/api/books/admin`, { BookID }, config);
		dispatch({ type: BOOK_DELETE_SUCCESS });
	} catch (error) {
		console.log(`failed...`);
		console.log(error);
		dispatch({
			type: BOOK_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const addOneBook = (book) => async (dispatch, getState) => {
	try {
		dispatch({ type: BOOK_ADD_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.post(`/api/books/admin`, book, config);
		dispatch({ type: BOOK_ADD_SUCCESS });
	} catch (error) {
		dispatch({
			type: BOOK_ADD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const newEdition = (edition) => async (dispatch, getState) => {
	try {
		dispatch({ type: EDITION_ADD_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		await axios.post(`/api/books/admin/price`, edition, config);
		dispatch({ type: EDITION_ADD_SUCCESS });
	} catch (error) {
		dispatch({
			type: EDITION_ADD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const removeEdition = (PriceID) => async (dispatch, getState) => {
	try {
		dispatch({ type: EDITION_DELETE_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		await axios.put(`/api/books/admin/price`, { PriceID }, config);
		dispatch({ type: EDITION_DELETE_SUCCESS });
	} catch (error) {
		dispatch({
			type: EDITION_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
