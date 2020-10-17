import React from 'react'
import Navbar from './Navbar'
import './layout.scss'
import ProductContextProvider from '../../contexts/ProductContext'

const Layout = ({ children }) => {
  return(
    <ProductContextProvider>
      <div className="layout">
        <Navbar />
        <div className="content-wrapper">
          <div className="container">
            { children }
          </div>
        </div>
      </div>
    </ProductContextProvider>
  )
}
export default Layout
