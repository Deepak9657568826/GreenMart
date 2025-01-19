import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
// import logo from "../components/greenmartlogo.jpg"
import logo from "../assets/logo3.png"
import { useDispatch, useSelector } from "react-redux"
import {
    HiChartPie,
    HiClipboard,
    HiCollection,
    HiInformationCircle,
    HiLogin,
    HiPencil,
    HiSearch,
    HiShoppingBag,
    HiUsers,
} from "react-icons/hi";
import { DrawerFooter, useToast } from '@chakra-ui/react';
import { loginReducer } from '../redux/reducer';
import { logoutfunction } from '../redux/actionCreator';
import Toastnotification from '../utils/Toastnotification';
import { orderContext } from '../hook/SocketServer';
function Navbar() {
    // drawer
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const state = useSelector(state => state.auth)
    const role = state.role
    const isLogin = state.login
    const user = state.userDetails

    const dispatch = useDispatch()
    const email = state.email

    const cart = useSelector(state => state.cart.cart)
    const { socket } = useContext(orderContext)


    const toast = useToast()
    const navigate = useNavigate()
    const { showToast } = Toastnotification()

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleUserMenu = () => {
        // setIsUserMenuOpen(!isUserMenuOpen);
        setIsOpenDrawer(pre => pre == true ? false : true)
    };



    const handleClose = () => {
        setIsOpenDrawer(false);
    }

    const handleLogOut = () => {

        const token = localStorage.getItem("token")
        if (token) {
            dispatch(logoutfunction(navigate, toast, setIsOpenDrawer, showToast, socket));
        }

    }

    const handleClick = () => {
        setIsOpen(false);
    }

    // style={{backgroundColor : "#606470"}}
    return (
        <nav className="fixed top-0 left-0  right-0 w-11/12 z-10 border-gray-200 bg-lime-50 m-auto dark:bg-gray-900">
            <div className="flex flex-wrap h-20  items-center justify-between px-0">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img style={{ height: "45px", width: "65px" }} src={logo} className="h-40 w-20 rounded-md" alt="Greenmart Logo" />
                    {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
                </Link>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

                    <div>
                        <button
                            type="button"
                            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            id="user-menu-button"
                            aria-expanded="false"
                            onClick={toggleUserMenu} // Open/close user menu
                        >
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" alt="user photo" />
                        </button>



                        <button
                            data-collapse-toggle="navbar-user"
                            type="button"
                            className="inline-flex items-center bg-slate-600 p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-user"
                            aria-expanded={isOpen ? 'true' : 'false'}
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>

                    </div>


                </div>

                {/* drawer for navbar */}
                <Drawer

                    style={{  height: "400px" , marginTop : "60px"  }}
                    open={isOpenDrawer} onClose={handleClose} position="right">
                    <Drawer.Header title="USER DETAILS" titleIcon={() => <></>} />
                    <Drawer.Items>
                        <Sidebar
                            aria-label="Sidebar with multi-level dropdown example"
                            className="[&>div]:bg-transparent [&>div]:p-0 h-96"

                        >
                            <div className="flex  flex-col justify-between py-2">
                                <div>

                                    <Sidebar.Items className="flex flex-col  h-full justify-between ">
                                        <Sidebar.ItemGroup >
                                            <div className="flex flex-col  h-72 justify-between ">
                                                {isLogin &&
                                                    <div>
                                                        <Sidebar.Item href="/" icon={HiChartPie}>
                                                            Name : {user.name}
                                                        </Sidebar.Item>
                                                        <Sidebar.Item href="/" icon={HiChartPie}>
                                                            Email : {user.email}
                                                        </Sidebar.Item>
                                                        <Sidebar.Item href="/" icon={HiChartPie}>
                                                            Mobile   : {user.mobileNumber}
                                                        </Sidebar.Item>

                                                    </div>
                                                }

                                                <div className="grid grid-cols-2 gap-4 ">
                                                    {isLogin &&
                                                        <>
                                                            <button
                                                                onClick={handleClose}
                                                                className="rounded-lg border border-gray-200 bg-green-500 px-4 py-2 text-center text-white text-sm font-medium  hover:bg-gray-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                                                            >
                                                                Close
                                                            </button>


                                                            <button onClick={handleLogOut}
                                                                className=" items-center rounded-lg bg-red-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                                                            >
                                                                Log Out
                                                            </button>
                                                        </>

                                                    }

                                                </div>
                                            </div>

                                        </Sidebar.ItemGroup>
                                    </Sidebar.Items>
                                </div>
                            </div>
                        </Sidebar>
                    </Drawer.Items>
                </Drawer>


                {/* Navbar Links (Responsive) */}
                <div

                    className={`items-center z-10  justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`}
                    id="navbar-user"
                >


                    <ul className="flex flex-col z-10  font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li onClick={handleClick}>
                            <Link to="/" style={{ fontSize: "18px" }} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-lime-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</Link>
                        </li>
                        {role == "admin" &&
                            <>
                                <li onClick={handleClick}>
                                    <Link to="/addproduct" style={{ fontSize: "18px" }} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-lime-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Add Product</Link>
                                </li>
                                <li onClick={handleClick}>
                                    <Link to="/order" style={{ fontSize: "18px" }} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-lime-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Received Order</Link>
                                </li>
                            </>
                        }

                        <li onClick={handleClick}>
                            <Link to="/product" style={{ fontSize: "18px" }} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-lime-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Product</Link>
                        </li >

                        {isLogin &&
                            <li onClick={handleClick}>
                                <Link to="/particularOrder" style={{ fontSize: "18px" }} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My Order</Link>
                            </li>
                        }


                        {role == "admin" &&
                            <li className='flex flex-col lg:flex-row' onClick={handleClick}>
                                <Link to="/adminProduct" style={{ fontSize: "18px" }} className="block py-2 px-3 mr-10 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Admin Product  </Link>
                                <div className='flex flex-row'>

                                    <Link to="/cart" style={{ fontSize: "18px" }} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Cart  </Link>
                                    <Link to="/cart" className='flex flex-row'>
                                        <img src="https://cdn-icons-png.flaticon.com/128/9219/9219671.png" className="w-6 , h-6 , mt-1" alt="" />
                                        <p>{cart.length}</p>
                                    </Link>
                                </div>

                            </li>
                        }
                        {!isLogin &&
                            <li onClick={handleClick}>
                                <Link to="/login" style={{ fontSize: "18px" }} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-lime-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</Link>
                            </li>
                        }
                        {!isLogin &&
                            <li onClick={handleClick}>
                                <Link to="/signin" style={{ fontSize: "18px" }} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-lime-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Signup</Link>
                            </li >
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
