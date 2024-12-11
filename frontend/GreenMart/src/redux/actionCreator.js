
import axios from "axios"
import { ADDTOCARTFAILURE, ADDTOCARTLOADING, ADDTOCARTSUCCESS, LOGINFAILURE, LOGINLOADING, LOGINSUCCESS } from "./actionType"

//login creator
const loginUrl = `http://localhost:4500/login`
export const loginFunction = (fromData , toast , navigate , setIsSubmitting , setEmail , setPassword) => {
    return async (dispatch) => {
        dispatch({ type: LOGINLOADING })
        try {
            const response = await axios.post(loginUrl, fromData)
           console.log(response.data.user.role);
           

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
                dispatch({ type: LOGINSUCCESS, payload: response.data })
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

export const addToCartProduct = (product)=>{
    return async(dispatch)=>{
        dispatch({type:ADDTOCARTLOADING})
        try {
            dispatch({type:ADDTOCARTSUCCESS , payload : product})
            
         
        } catch (error) {
            dispatch({type:ADDTOCARTFAILURE , payload:error.message})
            
        }
    }
}
