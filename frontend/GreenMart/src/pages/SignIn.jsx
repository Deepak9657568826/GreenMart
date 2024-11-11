import React, { useState } from 'react';

function SignIn() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.firstName) validationErrors.firstName = 'First name is required';
    if (!formData.lastName) validationErrors.lastName = 'Last name is required';
    if (!formData.phone) validationErrors.phone = 'Phone number is required';
    if (!formData.email) validationErrors.email = 'Email address is required';
    if (!formData.password) validationErrors.password = 'Password is required';
    if (!formData.terms) validationErrors.terms = 'You must agree to the terms';
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Sign-up successful!');
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md">
      <div className="space-y-4">
        <div className="flex flex-col items-start">
          <label htmlFor="firstName" className="text-sm font-medium text-gray-900 mb-1">First Name</label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            className={`w-full p-2.5 text-sm rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50`}
            required
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="lastName" className="text-sm font-medium text-gray-900 mb-1">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            className={`w-full p-2.5 text-sm rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50`}
            required
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="phone" className="text-sm font-medium text-gray-900 mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="123-45-678"
            className={`w-full p-2.5 text-sm rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50`}
            required
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="email" className="text-sm font-medium text-gray-900 mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@company.com"
            className={`w-full p-2.5 text-sm rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50`}
            required
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="password" className="text-sm font-medium text-gray-900 mb-1">Create Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="•••••••••"
            className={`w-full p-2.5 text-sm rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50`}
            required
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>

        <div className="flex items-start">
          <input
            id="terms"
            type="checkbox"
            checked={formData.terms}
            onChange={handleChange}
            className="w-4 h-4 mr-2 border-gray-300 rounded focus:ring-blue-500"
            required
          />
          <label htmlFor="terms" className="text-sm font-medium text-gray-900">
            I agree with the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>.
          </label>
        </div>
        {errors.terms && <p className="mt-1 text-sm text-red-500">{errors.terms}</p>}

        <button
          type="submit"
          className={`w-full px-5 py-2.5 text-white text-sm font-medium rounded-lg focus:ring-4 focus:outline-none ${isSubmitting ? 'bg-gray-500' : 'bg-blue-700 hover:bg-blue-800'} focus:ring-blue-300`}
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
  );
}

export default SignIn;
