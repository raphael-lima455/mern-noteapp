import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import { useEffect } from 'react'
import axios from 'axios'


const authContext = createContext()


const ContextProvider = ({ children }) => {

  const [user, setUser] = useState(null)


  const login = (user) => {
    setUser(user)
  }


  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get('api/auth/verify', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (res.data.success) {
          setUser(res.data.user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.log(error)
      }
    }

    verifyUser()
  }, [])

  return (
    <authContext.Provider value={{ user, login, handleLogout }}>
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext)

export default ContextProvider