import React,{ createContext,useState, useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { BaseContext } from './BaseContext'


export const ProductContext = createContext()


const ProductContextProvider = ({ children }) => {
  const { header } = useContext(BaseContext)
  const [products,setProducts] = useState([])
  const [loading,setLoading] = useState(false)
  const history = useHistory()



  // Get Products ...
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
      if(err.response.status === 401){
        localStorage.removeItem(header)
        history.push('/login')
      }
    }
  }

  const createProduct = async ({
    payloads,
    setError,
    setLoading
  }) => {
    try{
      setLoading(true)
      const { data } = await axios.post('/api/product',payloads)
      if(data){
        setLoading(false)
        products.unshift(data)
        setProducts([...products])
        return true
      }
    }catch(err){
      setLoading(false)
      if(err.response && err.response.status === 401){
        localStorage.removeItem(header)
        history.push('/login')
      }else if(err.response && err.response.status === 400){
        setError(err.response.data)
      }else{
        setError({ message: "Something wrong!"})
      }
      return false
    }
  }

  const deleteProduct = async (_id) => {
    try{
      const { data } = await axios.delete(`/api/product/${_id}`)
      if(data){
        const index = products.findIndex(i => i._id === _id)
        if(index !== -1){
          products.splice(index,1)
          setProducts([...products])
        }
      }
    }catch(err){
      console.log(err.response);
    }
  }


  return(
    <ProductContext.Provider value={{
      products, getProducts, loading, createProduct, deleteProduct
    }}>
      { children }
    </ProductContext.Provider>
  )
}
export default ProductContextProvider
