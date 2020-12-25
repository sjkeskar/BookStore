import {
	BOOK_DETAILS_FAIL,
	BOOK_DETAILS_ONE_FAIL,
	BOOK_DETAILS_ONE_REQUEST,
	BOOK_DETAILS_ONE_SUCCESS,
	BOOK_DETAILS_REQUEST,
	BOOK_DETAILS_SUCCESS,
	BOOK_LIST_FAIL,
	BOOK_LIST_REQUEST,
	BOOK_LIST_SUCCESS,
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
