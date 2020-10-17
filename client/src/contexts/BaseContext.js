import React,{ createContext, useState, useEffect } from 'react'
import axios from 'axios'


export const BaseContext = createContext()

const BaseContextProvider = ({ children }) => {
  const header = 'x-user-token'
  const [loading,setLoading] = useState(true)
  const [login,setLogin] = useState(false)
  const [signup,setSignup] = useState(false)
  const [cart,setCart] = useState(false)
  const [user,setUser] = useState(null)
  const [token,setToken] = useState(localStorage.getItem(header))

  const getLogin = async ({
    payloads,
    setError,
    setLoading
  }) => {
    try{
      setLoading(true)
      const { data } = await axios.post('/api/user/login',payloads)
      if(data){
        setError('')
        setLoading(false)
        localStorage.setItem(header,'Bearer '+data.accessToken)
        axios.defaults.headers['Authorization'] = 'Bearer '+data.accessToken
        setToken('Bearer '+data.accessToken)
        setLogin(false)
      }
    }catch(err){
      setLoading(false)
      if(err.response && err.response.status === 400){
        setError(err.response.data)
      }else{
        setError({message: "Something wrong!"})
      }
    }
  }

  const getSignup = async ({
    payloads,
    setError,
    setLoading,
    setSuccess
  }) => {
    try{
      setLoading(true)
      const { data } = await axios.post('/api/user/signup',payloads)
      if(data){
        setError('')
        setLoading(false)
        setSuccess('Account created successfully.')
        return true
      }
    }catch(err){
      setLoading(false)
      if(err.response && err.response.status === 400){
        setError(err.response.data)
      }else{
        setError({message: "Something wrong!"})
      }
      return false
    }
  }


  const getUser = async () => {
    try{
      const { data } = await axios.get('/api/user/profile')
      if(data){
        setLoading(false)
        setUser(data)
        setLogin(false)
      }
    }catch(err){
      setLoading(false)
      setUser(null)
      setLogin(true)
    }
  }

  useEffect(() => {
    if(token){
      getUser()
    }else{
      setLoading(false)
    }
  },[token])

  return(
    <BaseContext.Provider value={{
      user, header, login, setLogin, getSignup, cart, setCart, getLogin, loading, signup, setSignup
    }}>
      { children }
    </BaseContext.Provider>
  )
}
export default BaseContextProvider
