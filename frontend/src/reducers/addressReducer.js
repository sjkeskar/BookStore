import {
	USER_ADDRESSES_FAIL,
	USER_ADDRESSES_REQUEST,
	USER_ADDRESSES_SUCCESS,
	USER_ADDRESS_FAIL,
	USER_ADDRESS_REQUEST,
	USER_ADDRESS_SUCCESS,
	USER_ADD_ADDRESS_REQUEST,
	USER_ADD_ADDRESS_SUCCESS,
	USER_ADD_ADDRESS_FAIL,
} from "../constants/addressConstants";

export const getAllAddressReducer = (state = { addresses: [] }, action) => {
	switch (action.type) {
		case USER_ADDRESSES_REQUEST:
			return { loading: true };
		case USER_ADDRESSES_SUCCESS:
			return { loading: false, addresses: action.payload };
		case USER_ADDRESSES_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const getOneAddressReducer = (state = { address: {} }, action) => {
	switch (action.type) {
		case USER_ADDRESS_REQUEST:
			return { loading: true };
		case USER_ADDRESS_SUCCESS:
			return { loading: false, address: action.payload };
		case USER_ADDRESS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const addAddressReducer = (
	state = { address: {}, success: false },
	action
) => {
	switch (action.type) {
		case USER_ADD_ADDRESS_REQUEST:
			return { loading: true };
		case USER_ADD_ADDRESS_SUCCESS:
			return { loading: false, success: true };
		case USER_ADD_ADDRESS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
