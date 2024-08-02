import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoadingDotStream from '../../../components/common/Loading'
import { validateLogin } from '../../../utils/validation'
import authService from '../../../services/authService'
import { dispalyToastAlert } from '../../../utils/displayToastAlert'

const InstructorLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState('')
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault()

    const {isValid, errors} = validateLogin({
      email,
      password
    })

    if (isValid) {
      setLoading(true)
      console.log('from submited');

      try {
        const data = await authService.login(email,password)
        if(data.role==='instructor'){

          navigate('/instructor')
          dispalyToastAlert(200,'Welcome back instructor')
        }else{
          dispalyToastAlert(400, 'Not a instructor')
        }
      } catch (error) {
        console.log(error);
        
      }finally{
        setLoading(false)
      }
    }else{
      setErrors(errors)
      dispalyToastAlert(400,'Please fix the validation errors')
    }

  }
  return (
    <div className="flex h-screen items-center justify-center bg-blue-100">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 bg-blue-200 flex items-center justify-center">
          <div className="text-center p-10">
            <img
              src="/instructor-login.jpg"
              alt="Illustration"
              className="mb-4 max-w-xs max-h-100 object-contain mx-auto"
            />
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome Back!
            </h2>
            <p className="text-white">
              Log in to access your account and continue learning.
            </p>
          </div>
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Enter your password"
              />
            </div>
            {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
            <div className="mb-4 flex items-center justify-between">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
              disabled={loading}
            >
              {loading ? <LoadingDotStream /> : 'Log In'}
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to='/instructor/register' >
            <a className="text-blue-600 hover:underline">
              Sign Up
            </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default InstructorLogin