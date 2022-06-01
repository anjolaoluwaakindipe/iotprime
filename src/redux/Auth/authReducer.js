import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
} from "./authTypes";

const userStorage = JSON.parse(localStorage.getItem("user"));
const tokenStorage = JSON.parse(localStorage.getItem("token"));

const initialLoggedState =
    userStorage || tokenStorage
        ? { isLogged: true, user: userStorage, token: tokenStorage?.token }
        : { isLogged: false, user: null, token: null };

export default function authReducer(state = initialLoggedState, action) {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLogged: true,
                user: action.payload.user,
            };
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                isLogged: false,
                user: null,
            };
        case LOGOUT_USER:
            return {
                ...state,
                isLogged: false,
                user: null,
            };

        default:
            return state;
    }
}
