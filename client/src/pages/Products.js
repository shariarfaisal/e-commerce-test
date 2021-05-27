import React from 'react'
import Layout from '../components/layout/Layout'
import ProductsComponent from '../components/products/Products'
import ProductContextProvider from '../contexts/ProductContext'


const Home = (props) => {
  return(
    <Layout>
      <ProductContextProvider>
        <ProductsComponent />
      </ProductContextProvider>
    </Layout>
  )
}
export default Home
