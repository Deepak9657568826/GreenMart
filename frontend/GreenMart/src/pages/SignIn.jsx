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
            mobileNumber
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
        <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="w-[90%] md:w-[80%] flex flex-col md:flex-row bg-gray-100 shadow-lg rounded-lg overflow-hidden">
          
          {/* Image Section - 55% */}
          <div className="login-background w-full md:w-[55%] h-[400px] md:h-auto bg-cover bg-center" >
          </div>
      
          {/* Form Section - 45% */}
          <div className="w-full md:w-[45%] flex items-center justify-center p-8">
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Create an account</h3>
              <p className="text-sm text-gray-600 mb-6">Enter your details below</p>
      
              {/* Input Fields */}
              <div className="space-y-4">
  {["Name", "Email or Phone Number", "Password"].map((placeholder, index) => (
    <React.Fragment key={index}>
      <input
        type={placeholder === "Password" ? "password" : "text"}
        placeholder={placeholder}
        className="w-full py-2 border-none bg-gray-100 focus:border-gray-800 focus:outline-none text-sm"
        required
      />
      <hr className="border-gray-600" />
    </React.Fragment>
  ))}
</div>
      
              {/* Buttons */}
              <div className="flex items-center justify-between mt-6">
                <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md">
                  Create Account
                </button>
                <a href="#" className="text-red-500 text-sm hover:underline">Forgot Password?</a>
              </div>
      
              {/* Google Sign-Up */}
              <button className="w-full mt-4 flex items-center justify-center border border-gray-300 py-2 rounded-md">
                <img src="/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
                <span className="text-sm">Sign up with Google</span>
              </button>
      
              {/* Already have an account? */}
              <p className="text-sm text-gray-600 text-center mt-4">
                Already have an account? <a href="#" className="text-black font-semibold hover:underline">Log in</a>
              </p>
            </form>
          </div>
        </div>
      </div>
      
    );
}

export default SignUp;
