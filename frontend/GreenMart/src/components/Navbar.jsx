import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
// import logo from "../components/greenmartlogo.jpg"
import logo from "../assets/logo2.png"
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
import { useToast } from '@chakra-ui/react';
import { loginReducer } from '../redux/reducer';
import { logoutfunction } from '../redux/actionCreator';
function Navbar() {
    // drawer
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const state = useSelector(state => state.auth)
    const role = state.role
    const isLogin = state.login
   
    console.log(state.login);
    const dispatch = useDispatch()
      const email = state.email
      console.log(email);
      
    console.log("role hai kya yaha", state.role);
    const cart = useSelector(state => state.cart.cart)
    // console.log(cart.length);
    const toast = useToast()
    const navigate = useNavigate()


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
        console.log("logout");
        const token = localStorage.getItem("token")
        if (token) {
            dispatch(logoutfunction(navigate, toast , setIsOpenDrawer));
        }

    }

    return (
        <nav style={{ backgroundColor: "rgb(221, 223, 246)", position: "fixed", top: "0px", right: "0px", left: "0px" }} className=" z-10 border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap items-center justify-between px-3">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="h-20 w-20 rounded-md" alt="Greenmart Logo" />
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
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                <Drawer open={isOpenDrawer} onClose={handleClose} position="right">
                    <Drawer.Header title="MENU" titleIcon={() => <></>} />
                    <Drawer.Items>
                        <Sidebar
                            aria-label="Sidebar with multi-level dropdown example"
                            className="[&>div]:bg-transparent [&>div]:p-0"
                        >
                            <div className="flex h-full flex-col justify-between py-2">
                                <div>
                                    <form className="pb-3 md:hidden">
                                        <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
                                    </form>
                                    <Sidebar.Items>
                                        <Sidebar.ItemGroup>
                                            {email  && 
                                            <Sidebar.Item href="/" icon={HiChartPie}>
                                                login as  : {email}
                                            </Sidebar.Item>
                                              } 
                                            {/* <Sidebar.Item href="/e-commerce/products" icon={HiShoppingBag}>
                                                Products
                                            </Sidebar.Item> */}
                                            {/* <Sidebar.Item href="/users/list" icon={HiUsers}>
                                                Users list
                                            </Sidebar.Item> */}
                                            {isLogin && 
                                            <Sidebar.Item onClick={handleLogOut} icon={HiLogin}>
                                                Log out
                                            </Sidebar.Item>
                                            }
                                            {/* <Sidebar.Item href="/authentication/sign-up" icon={HiPencil}>
                                                Sign up
                                            </Sidebar.Item> */}
                                        </Sidebar.ItemGroup>
                                    </Sidebar.Items>
                                </div>
                            </div>
                        </Sidebar>
                    </Drawer.Items>
                </Drawer>


                {/* Navbar Links (Responsive) */}
                <div
                    // style={{ backgroundColor: "rgb(221, 223, 246)" }}
                    className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`}
                    id="navbar-user"
                >


                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link to="/" style={{ fontSize: "18px" }} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</Link>
                        </li>
                        <li>
                            <Link to="/about" style={{ fontSize: "18px" }} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</Link>
                        </li>
                        {role == "admin" &&
                            <>
                                <li>
                                    <Link to="/addproduct" style={{ fontSize: "18px" }} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Add Product</Link>
                                </li>
                                <li>
                                    <Link to="/order" style={{ fontSize: "18px" }} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Received Order</Link>
                                </li>
                            </>
                        }

                        <li>
                            <Link to="/product" style={{ fontSize: "18px" }} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Product</Link>
                        </li>
                       
                       {isLogin && 
                        <li>
                            <Link to="/particularOrder" style={{ fontSize: "18px" }} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Previous Order</Link>
                        </li>
                        }


                        {role == "admin" &&
                        <li className='flex'>
                            <Link to="/cart" style={{ fontSize: "18px" }} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Cart  </Link>
                            <Link to="/cart">
                                <img src="https://cdn-icons-png.flaticon.com/128/9219/9219671.png" className="w-6 , h-6 , mt-1" alt="" />
                                <strong>{cart.length}</strong>
                            </Link>
                        </li>
                       }
                       {!isLogin  && 
                        <li>
                            <Link to="/login" style={{ fontSize: "18px" }} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</Link>
                        </li>
                       }
                       {!isLogin  && 
                        <li>
                            <Link to="/signin" style={{ fontSize: "18px" }} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Signup</Link>
                        </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
