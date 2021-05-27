import React from 'react'
import './layout.scss'
import Sidebar from './Sidebar'


const Layout = ({ children }) => {
  return(
    <div className="layout">
      <div className="row mx-0 align-items-stretch" style={{minHeight: '100vh'}}>
        <Sidebar />
        <div className="content-wrapper">
          { children }
        </div>
      </div>
    </div>
  )
}
export default Layout
