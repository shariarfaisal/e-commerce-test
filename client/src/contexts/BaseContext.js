import React,{ createContext,useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


export const BaseContext = createContext()


const BaseContextProvider = ({ children }) => {
  const [admin,setAdmin] = useState(null)
  const header = 'x-admin-token'
  const history = useHistory()



  // Get Admin Login ...
  const getLogin = async ({
    payloads,
    setSuccess,
    setErrors,
    setLoading
  }) => {
    try{
      const signin = await axios.post('/api/admin/signin',payloads)
      if(signin.data){
        setLoading(false)
        setErrors('')
        setSuccess('Login successful.')
        localStorage.setItem(header,'Bearer '+signin.data.accessToken)
        setTimeout(() => {
          window.location = '/'
        },1000)
      }
    }catch(err){
      setLoading(false)
      if(err.response && err.response.status === 400){
        setErrors(err.response.data)
      }
    }
  }


  //Get Signup ...
  const getSignup = async ({ payloads, setLoading, setError, setSuccess, clearForm }) => {
    setLoading(true);
    try{
      const signup = await axios.post('/api/admin/signup',payloads)
      if(signup.data){
        setLoading(false);
        setError('')
        setSuccess('Signup Successfull!')
        clearForm();
      }
    }catch(err){
      setLoading(false);
      if(err.response && err.response.status === 400){
        setError(err.response.data)
      }
    }
  }

  // Get Admin profile ...
  const getAdmin = async () => {
    try{
      const admin = await axios.get('/api/admin/profile')
      if(admin.data){
        setAdmin(admin.data)
      }
    }catch(err){
      if(err.response.status === 401){
        localStorage.removeItem(header)
        history.push('/login')
      }
    }
  }

  const getLogout = (e) => {
    localStorage.removeItem(header)
    window.location = '/login'
  }


  useEffect(() => {
    if(localStorage.getItem(header)){
      getAdmin()
    }else{
      // history.push('/')
    }
  },[])


  return(
    <BaseContext.Provider value={{
      getLogin, admin, header, getLogout, getSignup
    }}>
      { children }
    </BaseContext.Provider>
  )
}
export default BaseContextProvider
