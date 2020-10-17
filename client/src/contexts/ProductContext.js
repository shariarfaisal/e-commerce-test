import React,{ createContext, useState, useContext } from 'react'
import axios from 'axios'
import localCart from './LocalCart'
import { BaseContext } from './BaseContext'

export const ProductContext = createContext({})

const ProductContextProvider = ({ children }) => {
  const { setLogin, user } = useContext(BaseContext)
  const [products,setProducts] = useState([])
  const [loading,setLoading] = useState(false)
  const [promo,setPromo] = useState(null)
  const [cartItems,setCartItems] = useState(localCart.getItems())

  const addCartItem = async ({ _id, quantity }) => {
    const exists = cartItems.find(i => i._id === _id)
    if(!exists){
      const item = products.find(i => i._id === _id)
      if(item){
        item.quantity = quantity
        cartItems.unshift(item)
        setCartItems([...cartItems])
        localCart.addItem(item)
      }else{
        try{
          const { data } = await axios.get(`/api/product/${_id}`)
          if(data){
            data.quantity = quantity
            cartItems.unshift(data)
            setCartItems([...cartItems])
            localCart.addItem(data)
          }
        }catch(err){
          console.log(err.response);
        }
      }
    }
  }

  const getTotalPrice = () => {
    const total = cartItems.reduce((a,b) => {
      a += b.price * b.quantity
      return a
    },0)
    return total
  }

  const isProductExists = (id) => {
    const item = cartItems.find(i => i._id === id)
    return item ? true : false
  }

  const increaseQuantity = (id) => {
    const item = cartItems.find(i => i._id === id)
    item.quantity += 1
    setCartItems([...cartItems])
  }

  const decreaseQuantity = (id) => {
    const item = cartItems.find(i => i._id === id)
    if(item.quantity !== 1){
      item.quantity -= 1
      setCartItems([...cartItems])
    }
  }

  const deleteCartItem = (id) => {
    const index = cartItems.findIndex(i => i._id === id)
    if(index !== -1){
      cartItems.splice(index,1)
      setCartItems([...cartItems])
      localCart.deleteItem(id)
    }
  }

  const getProducts = async () => {
    try{
      setLoading(true)
      const { data } = await axios.get('/api/product')
      if(data){
        setLoading(false)
        setProducts(data)
      }
    }catch(err){
      setLoading(false)
      console.log(err.response.data);
    }
  }

  const promoCodeApply = async ({
    payloads,
    setError,
    setLoading
  }) => {
    if(!user){
      setLogin(true)
    }else{
      try{
        setLoading(true)
        const { data } = await axios.post('/api/promo/apply',payloads)
        if(data){
          setError('')
          setLoading(false)
          setPromo(data)
        }
      }catch(err){
        setLoading(false)
        if(err.response && err.response.status === 400){
          setError(err.response.data)
        }else{
          console.log(err.response);
        }
      }
    }

  }

  const getCheckout = async ({
    setError,
    setLoading
  }) => {
    if(!user){
      setLogin(true)
    }else{
      try{
        setLoading(true)
        const { data } = await axios.post('/api/order/',{ price: getTotalPrice(), promoCode: promo ? promo.code: null })
        if(data){
          setLoading(false)
          setCartItems([])
          localCart.clearItems()
        }
      }catch(err){
        setLoading(false)
        if(err.response && err.response.status === 400){
          setError(err.response.data)
        }else{
          console.log(err.response);
        }
      }
    }
  }

  return(
    <ProductContext.Provider value={{
      getProducts, isProductExists, products, loading, cartItems, addCartItem, increaseQuantity, decreaseQuantity, deleteCartItem, totalPrice: getTotalPrice(),promoCodeApply, promo, getCheckout
    }}>
      { children }
    </ProductContext.Provider>
  )
}
export default ProductContextProvider
