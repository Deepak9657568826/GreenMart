import { ADDTOCARTFAILURE, ADDTOCARTLOADING, ADDTOCARTSUCCESS, LOGINFAILURE, LOGINLOADING, LOGINSUCCESS, LOGOUTFAILURE, LOGOUTLOADING, LOGOUTSUCCESS } from "./actionType"

const initialLoginState = {
    loading: false,
    error: false,
    login: false,
    data: "",
    role: "", 
    email : ""
}

export const loginReducer = (state = initialLoginState, action) => {
    switch (action.type) {
        case LOGINLOADING:
            return {
                ...state, loading: true
            }
        case LOGINSUCCESS:
            return {
                ...state, loading: false, login: true,  role: action.payload.role , email : action.payload.email
            }
        case LOGINFAILURE:
            return {
                ...state, email :"" ,loading: false, login: false, error: action.payload ,  data: action.payload
            }
            case LOGOUTLOADING:
                return {
                    ...state, loading: true
                };
            case LOGOUTSUCCESS:
                return {
                    ...state, email : "" , login: false, loading: false,  data: action.payload , role:""
                };
            case LOGOUTFAILURE:
                return {
                    ...state, loading: false, error: action.payload 
                };
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

