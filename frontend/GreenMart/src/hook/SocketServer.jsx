import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const orderContext = createContext();

export const ContextProvider = ({ children }) => {
    const [allOrder, setAllOrder] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("http://localhost:4500", {
            transports: ["websocket"]
        });
        setSocket(newSocket);
        newSocket.on("start", (message) => {
            console.log(message);
        });
        newSocket.emit("first", "Hi from frontend");
         
        newSocket.on("allorder" , (order)=>{
            setAllOrder(order)
        })

        newSocket.on("order" , (order)=>{
            setAllOrder(pre => [...pre , order])
        })

        return () => {
            if (newSocket) {
                newSocket.off("start");
                newSocket.disconnect();
            }
        };
    }, []);

    const value = {
        allOrder,
        socket
    };

    return (
        <orderContext.Provider value={value}>
            {children}
        </orderContext.Provider>
    );
};
