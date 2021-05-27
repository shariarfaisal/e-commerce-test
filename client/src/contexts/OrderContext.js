import React,{ createContext, useState } from 'react'
import axios from 'axios'


export const OrderContext = createContext({})


const OrderContextProvider = ({ children }) => {
  const [orders,setOrders] = useState([])
  const [filter,setFilter] = useState('pending')
  const [loading,setLoading] = useState(true)

  const getOrders = async () => {
    try{
      setLoading(true)
      const { data } = await axios.get(`/api/order/${filter? '?status='+filter: ''}`)
      if(data){
        setLoading(false)
        setOrders(data)
      }
    }catch(err){
      setLoading(false)
      console.log(err);
    }
  }

  const orderHandler = async ({
    _id,
    payloads,
    setLoading
  }) => {
    try{
      setLoading(true)
      const { data } = await axios.put(`/api/order/${_id}/status`,payloads)
      if(data){
        setLoading(false)
        const order = orders.find(i => i._id === _id)
        if(order){
          order.status = data.status
          setOrders([...orders])
        }
      }
    }catch(err){
      setLoading(false)
      console.log(err.response);
    }
  }


  return(
    <OrderContext.Provider value={{
      getOrders, orders, loading, orderHandler, filter, setFilter
    }}>
      { children }
    </OrderContext.Provider>
  )
}
export default OrderContextProvider
