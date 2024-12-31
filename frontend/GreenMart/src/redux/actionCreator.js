
import axios from "axios"
import { ADDTOCARTFAILURE, ADDTOCARTLOADING, ADDTOCARTSUCCESS, LOGINFAILURE, LOGINLOADING, LOGINSUCCESS, LOGOUTFAILURE, LOGOUTLOADING, LOGOUTSUCCESS  } from "./actionType"
import { authorizationToken } from "../utils/Token"
import { cartProductUrl, loginUrl } from "../utils/Url"
import { useContext } from "react"
import { orderContext } from "../hook/SocketServer"
import { io } from "socket.io-client"

//login creator


export const loginFunction = (fromData, toast, navigate, setIsSubmitting, setEmail, setPassword , showToast , socket , setSocket) => {
    return async (dispatch) => {
        dispatch({ type: LOGINLOADING })
        try {
            const response = await axios.post(loginUrl, fromData)
              if (response.data.msg == 'please register first or please check email') {
                setIsSubmitting(false);
                showToast('please register first', `${response.data.msg}` , "error" )
                dispatch({ type: LOGINFAILURE, payload: response.data })
            }

            else if (response.data.msg == 'user login successfully') {
                console.log("Enter in success phase");
                
                 const token = response.data.token
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data.user))
                setIsSubmitting(false);
                socket = io("https://greenmart-wyyp.onrender.com", {
                    transports: ["websocket"],
                    query: { token }, // Pass the token as a query
                });
                setSocket(socket)
                socket.on("connectOne", (msg) => {
                    console.log(msg);
                });
                socket.emit("login" , "user login successfull")
                showToast('Login successfull.', "User login successfull.")
                setEmail("")
                setPassword("")
                navigate("/")
                dispatch({ type: LOGINSUCCESS, payload: response.data.user })
            }

            else if (response.data.msg == 'please check password') {
                setIsSubmitting(false);
                showToast('Check password.',  "please check password." , "error")
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
                showToast(`${response.data.mes}`, `${response.data.mes}` , "error")
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


export function logoutfunction(navigate , toast , setIsOpenDrawer ,showToast , socket) {

    return async (dispatch) => {
        dispatch({ type: LOGOUTLOADING })
        try {
                dispatch({ type: LOGOUTSUCCESS,  })
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                // localStorage.removeItem('user');
                 

                showToast(`Logout successfully` , "Logout successfully"  )
                if(socket){
                    socket.disconnect(); // Properly disconnect the socket
                }
                socket.emit("logout" , "user logout successfull")
                // alert("user logout successfully")
                setIsOpenDrawer(false)
                navigate("/login")
        
        } catch (error) {
            dispatch({ type: LOGOUTFAILURE, payload: error.message })
            showToast(`${error.message}` ,`${error.message}` , "error" )

        }
    }
}
