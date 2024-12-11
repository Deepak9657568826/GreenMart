import { ADDTOCARTFAILURE, ADDTOCARTLOADING, ADDTOCARTSUCCESS, LOGINFAILURE, LOGINLOADING, LOGINSUCCESS } from "./actionType"

const initialLoginState = {
    loading: false,
    error: false,
    login: false,
    data: "",
    role: ""
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
        default:
            return state
    }

}


const addtoCartInital = {
    loading: false,
    error: "",
    message: "",
    cart: []
}

export const addtoCartReducer = (state = addtoCartInital, action) => {
    switch (action.type) {
        case ADDTOCARTLOADING:
            return {
                ...state, loading: true
            }

        case ADDTOCARTSUCCESS:
            return {
                ...state, loading: false, message: action.payload.msg, cart: action.payload.allProduct,
            }

        case ADDTOCARTFAILURE:
            return {
                ...state, loading: false, error: action.payload
            }

        default:
            return state
    }
}

