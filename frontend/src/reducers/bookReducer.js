import {
	BOOK_ADD_FAIL,
	BOOK_ADD_REQUEST,
	BOOK_ADD_SUCCESS,
	BOOK_ADD_RESET,
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
	EDITION_ADD_REQUEST,
	EDITION_ADD_FAIL,
	EDITION_ADD_SUCCESS,
	EDITION_DELETE_FAIL,
	EDITION_DELETE_SUCCESS,
	EDITION_DELETE_REQUEST,
} from "../constants/bookConstants";

export const bookListReducer = (state = { books: [] }, action) => {
	switch (action.type) {
		case BOOK_LIST_REQUEST:
			return { loading: true, books: [] };
		case BOOK_LIST_SUCCESS:
			return { loading: false, books: action.payload };
		case BOOK_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const bookDetailsReducer = (state = { book: [] }, action) => {
	switch (action.type) {
		case BOOK_DETAILS_REQUEST:
			return { loading: true, ...state };
		case BOOK_DETAILS_SUCCESS:
			return { loading: false, book: action.payload };
		case BOOK_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const oneBookReducer = (state = { onebook: {} }, action) => {
	switch (action.type) {
		case BOOK_DETAILS_ONE_REQUEST:
			return { loading: true };
		case BOOK_DETAILS_ONE_SUCCESS:
			return { loading: false, onebook: action.payload };
		case BOOK_DETAILS_ONE_FAIL:
			return { loading: false, error: action.paload };
		default:
			return state;
	}
};

export const deleteBookReducer = (state = {}, action) => {
	switch (action.type) {
		case BOOK_DELETE_REQUEST:
			return { loading: true };
		case BOOK_DELETE_SUCCESS:
			return { loading: false, success: true };
		case BOOK_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const addBookReducer = (state = {}, action) => {
	switch (action.type) {
		case BOOK_ADD_REQUEST:
			return { loading: true };
		case BOOK_ADD_SUCCESS:
			return { loading: false, success: true };
		case BOOK_ADD_FAIL:
			return { loading: false, error: action.payload };
		case BOOK_ADD_RESET:
			return {};
		default:
			return state;
	}
};

export const addEditionReducer = (state = {}, action) => {
	switch (action.type) {
		case EDITION_ADD_REQUEST:
			return { loading: true };
		case EDITION_ADD_FAIL:
			return { loading: false, error: action.paload };
		case EDITION_ADD_SUCCESS:
			return { loading: false, success: true };
		default:
			return state;
	}
};

export const deleteEditionReducer = (state = {}, action) => {
	switch (action.type) {
		case EDITION_DELETE_FAIL:
			return { loading: false, error: action.paload };
		case EDITION_DELETE_SUCCESS:
			return { loading: false, success: true };
		case EDITION_DELETE_REQUEST:
			return { loading: true };
		default:
			return state;
	}
};
