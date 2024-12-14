
import axios from "axios"
import { ADDTOCARTFAILURE, ADDTOCARTLOADING, ADDTOCARTSUCCESS, LOGINFAILURE, LOGINLOADING, LOGINSUCCESS, LOGOUTFAILURE, LOGOUTLOADING, LOGOUTSUCCESS  } from "./actionType"
import { authorizationToken } from "../utils/Token"
import { cartProductUrl, loginUrl } from "../utils/Url"

//login creator

export const loginFunction = (fromData, toast, navigate, setIsSubmitting, setEmail, setPassword) => {
    return async (dispatch) => {
        dispatch({ type: LOGINLOADING })
        try {
            const response = await axios.post(loginUrl, fromData)
              if (response.data.msg == 'please register first or please check email') {
                setIsSubmitting(false);
                toast({
                    title: 'please register first ',
                    description: `${response.data.msg}`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                })
                dispatch({ type: LOGINFAILURE, payload: response.data })
            }

            else if (response.data.msg == 'user login successfully') {

                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data.user))
                setIsSubmitting(false);
                toast({
                    title: 'Login successfull.',
                    description: "User login successfull.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                })
                setEmail("")
                setPassword("")
                navigate("/")
                dispatch({ type: LOGINSUCCESS, payload: response.data.user })
            }

            else if (response.data.msg == 'please check password') {
                setIsSubmitting(false);
                toast({
                    title: 'Check password.',
                    description: "please check password.",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                })
                dispatch({ type: LOGINFAILURE, payload: response.data.msg })
            }

            else {
                setIsSubmitting(false);
                toast({
                    title: `${response.data.mes}`,
                    description: `${response.data.mes}`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                })
                dispatch({ type: LOGINFAILURE, payload: response.data.msg })
            }


        } catch (error) {
            dispatch({ type: LOGINFAILURE, payload: error.message })
        }
    }
}



// add to cart creator



export const addToCartProduct = (toast) => {
    return async (dispatch) => {
        dispatch({ type: ADDTOCARTLOADING})
        try {
            const response = await axios.get(cartProductUrl, authorizationToken)

            if(response.data.msg == "All Cart Poduct"){

                dispatch({ type: ADDTOCARTSUCCESS, payload: response.data }) 
            }
            else{

                toast({
                    title: `${response.data.msg}`,
                    description: `${response.data.msg}`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                })
                dispatch({ type: ADDTOCARTFAILURE, payload:  response.data.msg })
            }


        } catch (error) {

            toast({
                title: `${error.message}`,
                description: `Somethings went wrong`,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            })
            dispatch({ type: ADDTOCARTFAILURE, payload: error.message })

        }
    }
}


export function logoutfunction(navigate , toast , setIsOpenDrawer) {

    return async (dispatch) => {
        dispatch({ type: LOGOUTLOADING })
        try {
                dispatch({ type: LOGOUTSUCCESS,  })
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                // localStorage.removeItem('user');
                toast({
                    title: `Logout successfully`,
                    description: `तुमचे लॉगआउट यशस्वीपणे झाले आहे!`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                });
                // alert("user logout successfully")
                setIsOpenDrawer(false)
                navigate("/login")
        
        } catch (error) {
            dispatch({ type: LOGOUTFAILURE, payload: error.message })
            toast({
                title: `${error.message}`,
                description: `तुमचे लॉगिन अयशस्वी झाले आहे. कृपया पुन्हा प्रयत्न करा.`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });

        }
    }
}
