import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { login } = useAuth()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/auth/login', { email, password })

                // Successfully login
            if (res.data.success) {
                login(res.data.user)
                localStorage.setItem('token', res.data.token)
                navigate('/')
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-200'>
            <div className='border shadow p-6 w-80 bg-white'>
                <h2 className='text-2xl font-bold mb-4'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700' htmlFor="email">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} className='w-full px-3 py-2 border' type="email" placeholder='Enter Email' required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700' htmlFor="password">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} className='w-full px-3 py-2 border' type="password" placeholder='Enter Password' required />
                    </div>
                    <div className='mb-4'>
                        <button type='submit' className='w-full bg-teal-600 text-white py-2'>Login</button>
                        <p>
                            Don't have an account? <Link to='/signup'>Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;