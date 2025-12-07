import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/auth/signup', { name, email, password })

            if (res.data.success) {
                navigate('/')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-200'>
            <div className='border shadow p-6 w-80 bg-white'>
                <h2 className='text-2xl font-bold mb-4'>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='text-base block text-gray-700' htmlFor="name">Name</label>
                        <input onChange={(e) => setName(e.target.value)} className='w-full px-3 py-2 border' type="text" placeholder='Enter Name' required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700' htmlFor="email">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} className='w-full px-3 py-2 border' type="email" placeholder='Enter Email' required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700' htmlFor="password">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} className='w-full px-3 py-2 border' type="password" placeholder='Enter Password' required />
                    </div>
                    <div className='mb-4'>
                        <button type='submit' className='w-full bg-teal-600 text-white py-2'>Signup</button>
                        <p>
                            Already have an account? <Link to='/login'>Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;