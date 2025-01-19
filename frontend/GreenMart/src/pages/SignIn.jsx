import React, { useState } from 'react';
import "../Styles/SignIn.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import { regitserUrl } from '../utils/Url';
import Toastnotification from '../utils/Toastnotification';


function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [role, setRole] = useState('user');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toast = useToast()

   const {showToast} = Toastnotification()

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const fromData = {
            name,
            email,
            password,
            mobileNumber,
        }
        const url = `https://greenmart-wyyp.onrender.com/register`

        const response = await axios.post(url, fromData)
        if (response.data.mes == `user already register with email ${email}`) {
            setIsSubmitting(false);
            showToast('Use another email' , `${response.data.mes}` , "error" )

        }
        // { mes: `user already register with mobile number ${mobileNumber}` }
       else if (response.data.mes == `user already register with mobile number ${mobileNumber}`) {
            setIsSubmitting(false);
            showToast('Use another mobile number' , `${response.data.mes}` , "error" )

        }

        else if (response.data.mes == 'user register successfully') {
            setIsSubmitting(false)
            showToast('User register successfull.' , 'User register successfull.' )

            setIsSubmitting(false);
            navigate("/login")
        }
        else {
            setIsSubmitting(false);
            showToast(`${response.data.mes}` , `${response.data.mes}`  , "error" )
        }


    };

    return (
        <div className='signin-background'>
            <form onSubmit={handleSubmit} className="signinform bg-violet-100 mx-auto   p-6 bg-white shadow-lg rounded-md">
                <h3 className='text-xl font-extrabold p-4 text-center  text-amber-950'>Sign up</h3>
                <div className="space-y-4">
                    <div className="flex flex-col items-start">
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-900 mb-1">Name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name"
                            className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                            required
                        />
                    </div>



                    <div className="flex flex-col items-start">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-900 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            placeholder="Enter mobileNumber"
                            className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                            required
                        />
                    </div>

                    <div className="flex flex-col items-start">
                        <label htmlFor="email" className="text-sm font-medium text-gray-900 mb-1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                            required
                        />
                    </div>

                    <div className="flex flex-col items-start">
                        <label htmlFor="password" className="text-sm font-medium text-gray-900 mb-1">Create Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create password"
                            className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                            required
                        />
                    </div>
                    {
                        true ? (
                            ""
                        ) : (
                            <div className="flex flex-col items-start">
                                <label htmlFor="role" className="text-sm font-medium text-gray-900 mb-1">Role</label>
                                <select
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                                    required
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                        )

                    }



                    <button
                        type="submit"
                        className={`w-1/3  px-5 py-2.5 text-white text-sm font-medium rounded-lg focus:ring-4 focus:outline-none ${isSubmitting ? 'bg-gray-500' : 'bg-blue-700 hover:bg-blue-800'} focus:ring-blue-300`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <span className="loader mr-2 border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></span>
                                Submitting...
                            </span>
                        ) : (
                            'Submit'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
