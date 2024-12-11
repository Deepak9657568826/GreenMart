import { ADDTOCARTFAILURE, ADDTOCARTLOADING, ADDTOCARTSUCCESS, LOGINFAILURE, LOGINLOADING, LOGINSUCCESS } from "./actionType"

const initialLoginState = {
    loading: false,
    error: false,
    login: false,
    data: "",
    role: "",
    cart: []
}

export const loginReducer = (state = initialLoginState, action) => {
    switch (action.type) {
        case LOGINLOADING:
            return {
                ...state, loading: true
            }
        case LOGINSUCCESS:
            return {
                ...state, loading: false, login: true, data: action.payload.msg, role: action.payload.user.role
            }
        case LOGINFAILURE:
            return {
                ...state, loading: false, login: false, error: action.payload
            }
        case ADDTOCARTLOADING:
            return {
                ...state
            }
        case ADDTOCARTSUCCESS:
            return {
                ...state, cart: [...state.cart , action.payload]
            }
        case ADDTOCARTFAILURE:
            return {
                ...state,
            }
        default:
            return state
    }

}

