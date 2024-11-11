import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Make sure to use this if you're using React Router for navigation
import "../Styles/SignIn.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Login successful!');
    }, 2000);
  };

  return (
    <div className="login-background">
      <form onSubmit={handleSubmit} className="logininform bg-violet-100 mx-auto p-6 bg-white shadow-lg rounded-md">
        <h3 className="text-xl font-extrabold p-6 text-center text-amber-950">Login</h3>
        <div className="space-y-4">
          <div className="flex flex-col items-start">
            <label htmlFor="email" className="text-sm font-medium text-gray-900 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full p-4 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              required
            />
          </div>

          <div className="flex flex-col items-start">
            <label htmlFor="password" className="text-sm font-medium text-gray-900 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-4 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-1/3 px-5 py-2.5 text-white text-sm font-medium rounded-lg focus:ring-4 focus:outline-none ${isSubmitting ? 'bg-gray-500' : 'bg-blue-700 hover:bg-blue-800'} focus:ring-blue-300`}
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

          {/* Link to Sign-Up Page */}
          <p className="mt-4 text-sm text-gray-600 ">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">Sign up first</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
