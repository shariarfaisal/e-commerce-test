import React,{ useContext, useEffect } from 'react'
import './style.scss'
import { ProductContext } from '../../contexts/ProductContext'
import ProductsItem from './ProductsItem'
import CreateProduct from './CreateProduct'

const Products = (props) => {
  const { getProducts, products, loading, deleteProduct } = useContext(ProductContext)

  useEffect(() => {
    getProducts()
  },[])

  return(
    <div className="row mx-0 justify-content-center">
      <CreateProduct />
      <div className="col-lg-11">
        {loading && <div className="text-muted text-center my-3">loading...</div>}
        <div className="list-group admin-projects mb-5">

          {products && products.map((product,i) => <ProductsItem key={i} {...product} deleteProduct={deleteProduct}/> )}


        </div>
      </div>
    </div>
  )
}
export default Products
