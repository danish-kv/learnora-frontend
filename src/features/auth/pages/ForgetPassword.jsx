import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


import Swal from 'sweetalert2'
import LoadingDotStream from '../../../components/common/Loading';
import api from '../../../services/api';
import { useDispatch } from 'react-redux';
import { toggleOtpAccess } from '../../../redux/slices/authSlice';
import { displayToastAlert } from '@/utils/displayToastAlert';


const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const dispath = useDispatch()

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)

        if(!email.trim()){
            setError('Email is required')
            setLoading(false)
            return
        }

        try {
            const res = await api.post('/forget-password/', {email})
            console.log(res);
            console.log(res.data.role);
            
            console.log('hi');
            if(res.status === 200){
                displayToastAlert(200, "Please check your email for OTP")
                dispath(toggleOtpAccess(true))
                navigate('/otp', {state : {email : email, is_forget : true, is_tutor : res.data.role === 'tutor'}})
            }else {
                displayToastAlert(400, 'Email not found')
            }

        } catch (error) {
            console.log('error in forget pass===> ',error);
            setLoading(false)
            await Swal.fire({
                icon : 'error',
                title : 'Error',
                text : error?.response?.data?.error || 'An error occurred. Please try again'
            })
            
        }
    }
    
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Forgot Your Password?</h2>
        <p className="text-gray-600 mb-6 text-center">Enter your email to receive an OTP for password reset.
        .</p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
              placeholder="Enter your email address"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
            disabled={loading}
          >
            {loading ? <LoadingDotStream /> : 'Send OTP'}
          </button>
        </form>
        <div className="mt-6 text-center">
            <Link to='/login'>
          <p  className="text-indigo-600 hover:underline">Back to Login</p>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword