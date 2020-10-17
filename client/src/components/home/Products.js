import React,{ useContext, useEffect } from 'react'
import ProductsItem from './ProductsItem'
import { ProductContext } from '../../contexts/ProductContext'

const Products = (props) => {
  const { getProducts, loading, products, addCartItem, isProductExists } = useContext(ProductContext)

  useEffect(() => {
    getProducts()
  },[])

  return(
    <div className="row mx-0 images">
      {loading && <div className="text-center my-2 text-muted">loading...</div>}
      {products && products.map(
        (product,i) => <ProductsItem
          key={i}
          {...product}
          addCartItem={addCartItem}
          cartExists={isProductExists(product._id)}
        />
      )}
    </div>
  )
}
export default Products
