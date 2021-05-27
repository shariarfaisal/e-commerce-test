import React,{ createContext,useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


export const PromoCodeContext = createContext()


const PromoCodeContextProvider = ({ children }) => {
  const [filter,setFilter] = useState('')
  const [promoCodes,setPromoCodes] = useState([])
  const history = useHistory()

  const getPromoCode = async ({
    id,
    setData,
    setError
  }) => {
    try{
      const { data } = await axios.get(`/api/promo/${id}`)
      if(data){
        setData(data)
      }
    }catch(err){
      if(err.response && err.response.status === 401){
        history.push('/login')
      }else if(err.response && err.response.status === 404){
        setError("Not found")
      }else if(err.response && err.response.status === 400){
        setError(err.response.data.message)
      }else{
        setError("Something wrong!")
      }
    }
  }

  const getPromoCodes = async ({
    setLoading
  }) => {
    setLoading(true)
    try{
      const { data } = await axios.get(`/api/promo${filter? '?active='+filter : ''}`)
      if(data){
        setLoading(false)
        setPromoCodes(data)
      }
    }catch(err){
      setLoading(false)
      if(err.response && err.response.status === 401){
        history.push('/login')
      }
    }
  }

  const createPromoCode = async ({
    setError,
    setLoading,
    setSuccess,
    payloads
  }) => {
    try{
      setLoading(true)
      const { data } = await axios.post('/api/promo/create',payloads)
      if(data){
        setLoading(false)
        promoCodes.push(data)
        setPromoCodes([...promoCodes])
        setSuccess('Promo code created successfully.')
        return true
      }
    }catch(err){
      setLoading(false)
      if(err.response && err.response.status === 400){
        setError(err.response.data)
      }
      return false
    }
  }

  const updatePromoCode = async ({
    _id,
    setError,
    setLoading,
    setSuccess,
    payloads,
    setData
  }) => {
    try{
      setLoading(true)
      const { data } = await axios.put(`/api/promo/${_id}/update`,payloads)
      if(data){
        setLoading(false)
        let get = promoCodes.find(i => i._id === _id)
        if(get){
          const { code, discount, deadline, maxUse, active } = data
          get.code = code
          get.discount = discount
          get.deadline = deadline
          get.maxUse = maxUse
          get.active = active
          setData({...data})
        }
        setPromoCodes([...promoCodes])
        setSuccess('Promo code updated successfully.')
        setTimeout(() => {
          setSuccess('')
        },5000)
      }
    }catch(err){
      setLoading(false)
      if(err.response && err.response.status === 400){
        setError(err.response.data)
      }
    }
  }


  return(
    <PromoCodeContext.Provider value={{
      createPromoCode, getPromoCodes, promoCodes, updatePromoCode, getPromoCode, filter, setFilter
    }}>
      { children }
    </PromoCodeContext.Provider>
  )
}
export default PromoCodeContextProvider
